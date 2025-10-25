title: 《FreeRTOS 全栈工程实战教程》第2.1篇：STM32 环境搭建 (CubeMX + Keil) 与工程烧录全流程
author: 连思鑫
tags:
  - FreeRTOS
  - STM32
  - 环境搭建
  - CubeMX
  - Keil
  - HAL
  - ST-Link
categories:
  - FreeRTOS 全栈工程实战教程
date: 2025-10-25 16:17:00
---
# 《FreeRTOS 全栈工程实战教程》第2.1篇：STM32 环境搭建 (CubeMX + Keil) 与工程烧录全流程



⭐ **难度等级：★☆☆ 基础**

**标签**：`FreeRTOS`, `STM32`, `CubeMX`, `Keil`, `HAL`, `环境搭建`, `ST-Link`



## 📍 实战问题场景



在第0篇中，我们准备好了所有的“原材料”（硬件板卡、软件工具）。现在，我们面临着第一个“工程”问题：

- “我如何将这些独立的工具（CubeMX, Keil, ST-Link）组合起来，形成一个完整的开发工作流？”
- “CubeMX 生成的几百个文件，到底是什么关系？我应该在哪里写代码？”
- “为什么我点击‘下载’，Keil 总是提示‘No ST-Link detected’或‘Flash Download failed’？”
- “在 STM32 上启用 FreeRTOS，最关键的步骤是什么？”

本篇将手把手带你**从 0 开始**，建立一个**标准、可复现、稳定**的 STM32 FreeRTOS 项目模板。我们将打通“配置-编译-烧录-运行”的完整闭环。这是你后续所有 STM32 实验的基石。



## 🎯 本篇能力目标



1. ✅ **掌握 CubeMX**：学会使用 CubeMX 完成 MCU 的核心配置（时钟、调试、GPIO）。

2. ✅ **打通工具链**：跑通一个**裸机 (Bare-Metal) LED 闪烁程序**，验证 CubeMX → Keil → ST-Link → 硬件的全链路。

3. ✅ 集成 RTOS：学会

   在 CubeMX 中正确启用 FreeRTOS (CMSIS-RTOS V1)。

4. ✅ **解决关键冲突**：理解并解决 FreeRTOS 与 HAL 库之间最著名的 **SysTick 时钟基准冲突**。

5. ✅ **最终成果**：成功编译一个**已包含 FreeRTOS 内核**的工程，并启动调度器，为第3篇添加任务做好万全准备。



## 🧠 理论简析：STM32 开发“三剑客”



对于初学者，理解 CubeMX, Keil, HAL 库三者的关系至关重要：

1. **STM32CubeMX (配置器 & 代码生成器)**
   - **作用**：一个图形化工具，帮你“点菜”。
   - **你做什么**：在图形界面上点击，选择你要启用哪个外设（如 GPIO、UART）、配置时钟树、选择中间件（如 FreeRTOS）。
   - **它做什么**：为你生成所有繁琐的**初始化 C 代码**（如 `MX_GPIO_Init()`）和 Keil MDK 工程文件。
2. **Keil MDK (IDE / 编译器 / 调试器)**
   - **作用**：“厨房和厨师”。
   - **你做什么**：在 Keil 中编写**核心应用逻辑**（例如 `while(1)` 里的闪灯代码，或 FreeRTOS 的任务函数）。
   - **它做什么**：编译你的代码和 CubeMX 生成的代码，将它们链接成一个 `.hex` 或 `.axf` 文件，并通过 ST-Link 烧录到芯片中，并提供调试功能。
3. **HAL 库 (硬件抽象层)**
   - **作用**：“标准菜谱”。
   - **它是什么**：ST 官方提供的驱动库。CubeMX 生成的代码**依赖**于它。
   - **它做什么**：它提供了统一的 API，让你摆脱繁琐的寄存器操作。
     - 裸机寄存器操作：`GPIOA->BSRR = (1 << 5);` (晦涩难懂)
     - HAL 库操作：`HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);` (清晰易懂)

我们的工作流：

在 CubeMX 中配置 → 生成代码 → 在 Keil 中编写业务逻辑 → 在 Keil 中编译和烧录 → （调试） → （有新需求？） → 回到 CubeMX 修改配置 → ...

------



## 🛠️ 实操步骤



本教程以第0篇推荐的 **STM32F407VET6 (小黑板)** 和 **ST-Link V2** 为例。



### 第1部分：裸机 LED 闪烁 (验证工具链)



在集成 RTOS 之前，我们必须先保证裸机能跑通。



#### 1. CubeMX: 创建工程与配置



1. 打开 `STM32CubeMX`。
2. 点击 `File` → `New Project` (或 `ACCESS TO MCU SELECTOR`)。
3. 在 `MCU/MPU Selector` 搜索框中输入 `STM32F407VET6`。
4. 在下方列表中选中它，点击 `Start Project`。
5. **[关键] 配置调试接口**：
   - 在左侧 `System Core` 中选择 `SYS`。
   - 在 `Debug` 下拉框中，选择 `Serial Wire`。
   - *(这是新手最容易忘的一步！如果不选，芯片烧录一次后可能就再也无法连接了)*
6. **[关键] 配置时钟源**：
   - `System Core` → `RCC`。
   - 在 `High Speed Clock (HSE)` 下拉框中，选择 `Crystal/Ceramic Resonator` (晶体/陶瓷谐振器)。
7. **配置 LED 对应的 GPIO**：
   - (F407VET6 小黑板的 LED 通常在 `PA0` 或 `PA1`，请根据你的板子确认)。
   - 假设为 `PA0`。在右侧芯片引脚图上找到 `PA0`，单击它，选择 `GPIO_Output`。
   - *(可选)*：在 `System Core` → `GPIO` 中选中 `PA0`，在 `User Label` 栏输入 `LED_D1`，方便记忆。



#### 2. CubeMX: 配置时钟树



1. 切换到 `Clock Configuration` 标签页。
2. `Input frequency (HSE)` 处应为 `8` MHz (F407 小黑板通常外接 8MHz 晶振)。
3. `PLL Source Mux` 选择 `HSE`。
4. 在 `HCLK (MHz)` 输入框中，直接输入 `168` (F407 的最高主频)，然后按回车。
5. CubeMX 会自动解算出所有 PLL 分频系数。弹窗提示时，点击 `OK`。时钟树会自动变蓝。



#### 3. CubeMX: 生成 Keil 工程



1. 切换到 `Project Manager` 标签页。
2. `Project Name`: `STM32_P2_BareMetal_Blink`
3. `Project Location`: 选择你代码仓中的 `stm32/` 目录。
4. `Toolchain / IDE`: 选择 `MDK-ARM V5`。
5. 点击右上角的 `GENERATE CODE`。



#### 4. Keil: 编写、编译与烧录



1. 生成完毕后，点击 `Open Project`，自动打开 Keil MDK5。

2. 在 Keil 左侧 `Project` 窗口，展开 `Application/User/Core`，双击打开 `main.c`。

3. 找到 `/* USER CODE BEGIN WHILE */` 和 `/* USER CODE END WHILE */` 之间的 `while(1)` 循环。

4. 添加我们的闪灯代码 (这是**裸机**代码)：

   

   ```c
   /* USER CODE BEGIN WHILE */
   while (1)
   {
     /* USER CODE END WHILE */
   
     /* USER CODE BEGIN 3 */
     // (注意: 如果你的 Label 叫 LED_D1)
     HAL_GPIO_TogglePin(LED_D1_GPIO_Port, LED_D1_Pin);
     // (如果没设置 Label，默认为 PA0)
     // HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_0); 
   
     // 裸机阻塞式延时
     HAL_Delay(500); // 延时 500ms
   }
   /* USER CODE END 3 */
   ```

5. **[关键] 配置 ST-Link 调试器**：

   - 点击菜单栏的 `Options for Target...` (魔术棒图标 🪄)。
   - 切换到 `Debug` 标签页。
   - 在右上方的下拉框中，选择 `ST-Link Debugger`。
   - 点击旁边的 `Settings` 按钮。
   - 在 `Port:` 下拉框中选择 `SW` (Serial Wire)。
   - 切换到 `Flash Download` 标签页。
   - 勾选 `Reset and Run` (确保烧录后芯片自动重启运行)。
   - 点击 `OK` 保存设置。

6. **编译和烧录**：

   - 插上你的 ST-Link 和 STM32 开发板。
   - 点击 `Build` (F7 或工具栏的 🏗️ 图标)。等待编译... 看到 `0 Error(s), 0 Warning(s)`。
   - 点击 `Download` (F8 或工具栏的 📥 图标)。
   - Keil 的 `Build Output` 窗口提示 `Download... Done.`

7. **验证**：查看你的开发板，**LED 正在以 1 秒 1 次的频率闪烁！** 恭喜，你已打通裸机开发全链路！

------



### 第2部分：集成 FreeRTOS (准备 RTOS 环境)



现在，我们在上一步的基础上，引入 FreeRTOS。



#### 1. CubeMX: 启用 FreeRTOS



1. 回到 CubeMX，打开刚才的 `.ioc` 工程文件。

2. 在左侧 `Middleware` 中，点击 `FREERTOS`。

3. 在 Interface 下拉框中，选择 CMSIS_V1。

   (注：CMSIS-RTOS V1 是 Keil MDK5 配合 HAL 库最经典、兼容性最好的 FreeRTOS 封装层)

4. (可选) `Config parameters` 中可以配置堆栈大小、时钟频率等，暂时保持默认（`TICK_RATE_HZ` 为 1000）。



#### 2. CubeMX: [最关键] 解决 SysTick 冲突



1. **问题**：
   - 裸机中，`HAL_Delay()` 默认使用 `SysTick` 定时器。
   - FreeRTOS 启动后，也**需要** `SysTick` 定时器来产生**系统时钟节拍 (Tick)**，用于任务调度和 `vTaskDelay()`。
   - 两者**冲突**！SysTick 只能被一个组件主导。
2. **解决方案**：将 HAL 库的 `Timebase Source` (时基源) 从 `SysTick` 改为另一个**通用定时器** (如 `TIM6`, `TIM7`...)。
3. **操作**：
   - 在 `System Core` 中选择 `SYS`。
   - 在 `Timebase Source` 下拉框中，选择一个**不冲突**的定时器，例如 `TIM6`。
   - (CubeMX 可能会自动弹出警告提示你修改，选择 `TIM6` 即可)



#### 3. CubeMX: 重新生成代码



1. 回到 `Project Manager` 标签页。
2. 再次点击 `GENERATE CODE`。
3. Keil MDK 会提示 `File '...' has been modified outside the editor.`，选择 `Reload All` (全部重新加载)。



#### 4. Keil: 验证 RTOS 环境



1. **清理裸机代码**：回到 `main.c`，**删除**你在 `while(1)` 中添加的 `HAL_GPIO_TogglePin` 和 `HAL_Delay` 代码。让 `while(1)` 保持**空置**。
2. **检查 RTOS 启动**：
   - 查看 `main()` 函数，你会发现 CubeMX 自动添加了 `MX_FREERTOS_Init();`。
   - 在 `main.c` 的最后，`vTaskStartScheduler();` 函数被调用了（它可能在 `main` 中，也可能在 `freertos.c` 的 `MX_FREERTOS_Init` 中被调用，取决于 CubeMX 版本）。
   - **`vTaskStartScheduler();` 是 RTOS 启动的标志。** 一旦它运行，调度器将接管 CPU，`main()` 函数中的 `while(1)` 循环将**永远不会被执行**。
3. **编译和烧录**：
   - 点击 `Build` (F7)。
   - 点击 `Download` (F8)。
4. **验证**：
   - 查看你的开发板，**LED 停止闪烁了（保持熄灭或长亮）**。
   - **这是正确的！** 为什么？因为我们启动了 FreeRTOS 调度器，但我们**没有创建任何任务** (Task) 去闪烁 LED。CPU 此时正在空闲任务 (`vTaskIdle`) 和定时器任务中循环，而我们之前在 `while(1)` 写的裸机代码已经被 RTOS 绕过。



## ✅ 全部代码



本篇的核心成果是工程配置，而非具体代码。但我们提供了关键的 `main.c` 代码片段。



#### 代码 1: 裸机闪灯 (Part 1 最终 `main.c` 的 `while(1)`)





```c
/* stm32/STM32_P2_BareMetal_Blink/Core/Src/main.c */

/* USER CODE BEGIN WHILE */
while (1)
{
  /* USER CODE END WHILE */

  /* USER CODE BEGIN 3 */
  
  // 验证工具链的裸机闪灯代码
  HAL_GPIO_TogglePin(LED_D1_GPIO_Port, LED_D1_Pin);
  
  // 裸机阻塞式延时
  HAL_Delay(500); 
}
/* USER CODE END 3 */
```



#### 代码 2: 启用 RTOS 后 (Part 2 最终 `main.c` 的 `main()`)





```c
/* stm32/STM32_P2_RTOS_Ready/Core/Src/main.c */

int main(void)
{
  /* ... (HAL_Init, SystemClock_Config, MX_GPIO_Init, MX_TIM6_Init) ... */
  
  /* [关键] CubeMX 自动添加了 RTOS 初始化 */
  MX_FREERTOS_Init();

  /* [关键] 启动 FreeRTOS 调度器. */
  /* Code below this line will NOT be executed unless scheduler fails to start */
  vTaskStartScheduler();

  /* We should never get here as control is now taken by the scheduler */
  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */
    /* [注意] 这里的代码永远不会被执行！ */
    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}
```



## 🔍 调试技巧：Keil 调试器入门



1. **Error: Flash Download failed**：这是初学者遇到**第一高频**的错误。请看下一节。
2. **如何进入调试？**
   - 在烧录 (F8) 成功后，点击 `Start/Stop Debug Session` (Ctrl+F5 或工具栏的 🎯 图标)。
   - Keil 会切换到调试界面。点击 `Run` (F5) 全速运行。
   - 点击 `Stop` (红色 X) 停止运行并退出调试。
3. **System Viewer (系统查看器)**：
   - 在调试会话中 (Ctrl+F5)，点击菜单 `View` → `System Viewer`。
   - 在弹出的窗口中，展开 `GPIO` → `GPIOA`。
   - 你可以实时看到 `ODR` (Output Data Register) 寄存器的值在 0 和 1 之间变化（对应裸机闪灯），验证程序是否在跑，即使你的 LED 硬件接错了。



## ⚠️ 常见错误与修复



1. **[最常见] 错误: "Flash Download failed - 'Cortex-M4'" 或 "No ST-Link detected"**
   - **原因 1 (驱动)**: ST-Link 驱动未安装 (见第0篇)。
   - **原因 2 (Keil 配置)**: Keil 的 `Options for Target -> Debug` 中**未选择** `ST-Link Debugger`。
   - **原因 3 (硬件连接)**: USB 线松动；ST-Link 与开发板的 SWD 线 (SWCLK, SWDIO, GND) 接错或虚焊。
   - **原因 4 (芯片被锁)**: CubeMX 中 `SYS -> Debug` **误选了 `Disable`**，导致 SWD 引脚被复用为普通 IO。
   - **修复 4**: 需要进入 DFU 或 Bootloader 模式，通过 "ST-Link Utility" 或 "CubeProgrammer" 软件执行“全片擦除” (Erase Full Chip)，才能解锁。
2. **[最关键] 错误: FreeRTOS 启动后，`vTaskDelay()` 和 `HAL_Delay()` 都不准或卡死**
   - **原因**: SysTick 冲突。你忘记了**第2部分-步骤2**，没有将 HAL Timebase Source 改为 `TIM6`。FreeRTOS 抢占了 SysTick，导致 `HAL_Delay()` 永远等待一个不会到来的中断。
   - **修复**: 严格按照教程，将 `SYS -> Timebase Source` 改为 `TIM6` (或其它通用定时器)。
3. **错误: Keil 编译提示 `Error: L6218E: Undefined symbol ...` (例如 `HAL_GPIO_TogglePin`)**
   - **原因**: CubeMX 生成了代码，但对应的 `.c` 文件（如 `stm32f4xx_hal_gpio.c`）没有被添加到 Keil 工程树中。
   - **修复**: 重新生成代码 (`GENERATE CODE`)。如果仍不行，在 `Project Manager -> Code Generator` 勾选 `Generate peripheral initialization as a pair of '.c/.h' files per peripheral`。
4. **现象: 裸机闪灯，LED 闪烁速度明显不对 (过快或过慢)**
   - **原因**: `Clock Configuration` (时钟树) 配置错误。
   - **修复**: 检查 HSE (晶振) 频率是否与你的板子一致 (通常是 8MHz 或 25MHz)。检查 HCLK 是否为你设定的 168MHz。`HAL_Delay()` 依赖于 HCLK。



## 🎯 练习挑战



1. **[基础] 裸机打卡**：
   - 严格按照 **Part 1**，完整复现“裸机 LED 闪烁”程序。
   - 在评论区或社群打卡，附上你的 LED 闪烁 GIF。
2. **[进阶] RTOS 环境就绪**：
   - 在基础练习之上，严格按照 **Part 2**，集成 FreeRTOS 并解决 SysTick 冲突。
   - 下载程序，确认 LED **停止闪烁** (证明调度器已接管 CPU)。
3. **[挑战] 验证时钟与延时**：
   - 回到 **Part 1** 的裸机工程。
   - 在 CubeMX 中，将 `Clock Configuration` 里的 `HCLK (MHz)` 从 `168` 修改为 `84`。
   - 重新生成代码，下载到开发板。
   - **观察 LED 闪烁速度**，它变快了还是变慢了？为什么？(提示: `HAL_Delay()` 的时基变了)。



## 📎 附录：CubeMX, Keil, HAL 关系图



```
[你 (开发者)]
    |
    | 1. "我需要 GPIO, 时钟 168M, FreeRTOS"
    v
[STM32CubeMX] --(生成)--> [MDK-ARM Project File (.uvprojx)]
    |                     |
    | (生成)              |--> [HAL Init Code (mx_gpio.c)]
    |                     |
    | (生成)              |--> [FreeRTOS Config (freertos.c)]
    |                     |
    | (生成)              |--> [main.c (包含 USER CODE 占位符)]
    |
    v
[Keil MDK (IDE)] <--(打开 .uvprojx)
    |
    | 2. "我在 main.c 的 while(1) 中添加 HAL_GPIO_TogglePin()"
    |
    | 3. "编译 (F7)"
    v
[ARMCC 编译器/链接器] --(链接)--> [你的代码]
    |                          |
    |                          + [HAL 库驱动 (stm32f4xx_hal.c)]
    |                          |
    |                          + [FreeRTOS 源码 (tasks.c, list.c)]
    v
[可执行文件 (.axf / .hex)]
    |
    | 4. "下载 (F8)"
    v
[ST-Link V2] --(SWD)--> [STM32F407 芯片]
```

------

下一篇预告：

环境终于搭好了！在下一篇《第2.2篇 ESP32 环境搭建：ESP-IDF + VSCode 完整指南》中，我们将转向另一个强大的 IoT 平台。如果你只关心 STM32，也可以直接跳到《第3篇 第一个 FreeRTOS 工程：LED 闪烁多任务》。