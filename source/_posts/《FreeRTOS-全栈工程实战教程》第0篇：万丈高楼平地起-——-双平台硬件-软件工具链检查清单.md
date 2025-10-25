title: 《FreeRTOS 全栈工程实战教程》第0篇：万丈高楼平地起 —— 双平台硬件/软件工具链检查清单
author: 连思鑫
tags:
  - STM32
  - FreeRTOS
  - ESP32
  - 环境搭建
  - CubeMX
  - ESP-IDF
  - Keil
  - VSCode
categories:
  - FreeRTOS 全栈工程实战教程
date: 2025-10-25 15:34:00
---
# 《FreeRTOS 全栈工程实战教程》第0篇：万丈高楼平地起 —— 双平台硬件/软件工具链检查清单



⭐ **难度等级：★☆☆ 基础**

**标签**：`FreeRTOS`, `STM32`, `ESP32`, `环境搭建`, `CubeMX`, `ESP-IDF`, `Keil`, `VSCode`



## 📍 实战问题场景



欢迎来到《FreeRTOS 全栈工程实战教程》！这是一个旨在带你**从 0 到量产**，用一年时间真正“吃透” FreeRTOS 的系列。

在开始编写任何代码之前，我们必须面对一个残酷的现实：**90% 的初学者放弃，都倒在了环境搭建的第一步。**

你是否也遇到过这些问题？

- “我想学 FreeRTOS，到底该买哪块 STM32 板子？F103、F407 还是 F767？”
- “ESP32 型号太乱了，WROOM、S2、S3、C3 到底有何区别？我该用哪一个？”
- “为什么我下载了官方代码，一编译就是几百个错误？”
- “Keil MDK 和 VSCode + ESP-IDF 的开发体验完全不同，我能在两个平台间无缝切换吗？”
- “驱动安装失败、工具链找不到、下载器无法连接……”

**工欲善其事，必先利其器。**

本篇（第0篇）作为整个系列的基石，将为你提供一个**标准化的、经过验证的“物料清单”（BOM）**。本系列的所有代码都将基于这个清单进行开发和测试。告别环境配置的“玄学”，让我们所有人站在同一起跑线上。



## 🎯 本篇能力目标



读完本篇，你将完成以下准备工作，达到 **“环境清晰，随时上手”** 的状态：

1. ✅ **明确硬件清单**：获取本系列教程所需的最小化、标准化的 STM32 和 ESP32 硬件。
2. ✅ **备齐软件工具**：下载并安装两大平台所需的所有 IDE、编译器、配置工具和驱动。
3. ✅ **理解工具链差异**：初步理解为何 STM32（Keil+CubeMX）和 ESP32（VSCode+ESP-IDF）在工具链上存在根本差异。
4. ✅ **准备就绪**：为下一篇《第1篇：什么是 FreeRTOS？》和《第2篇：环境搭建实战》扫清所有障碍。



## 🧠 理论简析：为何选择“STM32 + ESP32”双平台？



本教程的核心特色之一就是**双平台**。这并非画蛇添足，而是有意为之，旨在构建你完整的嵌入式知识体系：

1. **STM32 (以 F4 为例) + Keil MDK + CubeMX**
   - **代表领域**：传统的、资源相对受限的 MCU 市场。工业控制、汽车电子、传统消费电子等。
   - **学习重点**：学习 FreeRTOS **内核的精髓**、资源管理、中断处理、低功耗优化。你需要精打细算每一KB的 RAM 和 Flash。
   - **工具链**：Keil 是老牌的嵌入式 IDE，其调试功能强大；CubeMX 则是 ST 官方的代码生成器，极大简化了外设配置。
2. **ESP32 (以 WROOM-32 为例) + VSCode + ESP-IDF**
   - **代表领域**：现代的、高性能的、高度集成的 IoT 市场。智能家居、可穿戴设备、边缘计算等。
   - **学习重点**：学习 FreeRTOS 在**复杂系统中的应用**。ESP-IDF 本身就是基于 FreeRTOS 构建的，你将学习如何将 RTOS 与 Wi-Fi、Bluetooth、TCP/IP 协议栈、文件系统等复杂组件协同工作。
   - **工具链**：VSCode 是现代软件开发的标杆，ESP-IDF 则是功能极其完善的 SDK（软件开发工具包），它本身就为你处理好了 FreeRTOS 的移植和大量驱动。

学习二者的协同效应：

你将掌握“精细控制”（STM32）和“快速集成”（ESP32）两种能力。FreeRTOS 则是贯穿二者的“操作系统灵魂”。这使你既能胜任对成本和功耗敏感的传统项目，也能驾驭复杂的物联网（IoT）应用。

------



## 🛠️ 实操步骤：你的开发工具“BOM 清单”



请严格按照此清单准备你的工具。



### 第1部分：硬件工具清单 (Hardware Checklist)



| **平台**  | **类别**     | **推荐型号/规格**                                      | **备注 (为何选它？)**                                        |
| --------- | ------------ | ------------------------------------------------------ | ------------------------------------------------------------ |
| **STM32** | **核心板**   | **STM32F407VET6 核心板** (小黑板)                      | 性价比高，资源丰富 (FPU, 512KB Flash, 192KB RAM)，社区资料多。 |
|           | **调试器**   | **ST-Link V2** (金属外壳版)                            | 必备的下载/调试工具。                                        |
|           | **备选板**   | NUCLEO-F401RE / NUCLEO-F411RE                          | [可选] ST 官方开发板，自带 ST-Link，免去额外购买调试器。     |
| **ESP32** | **核心板**   | **ESP32-DevKitC V4** (搭载 ESP32-WROOM-32 模组)        | 乐鑫官方开发板，最标准、最稳定，资料最全，板载 USB-TTL。     |
|           | **备选板**   | ESP32-S3-DevKitC-1                                     | [可选] S3 性能更强，支持 AI 指令，如你希望兼顾 AIoT 可选此项。 |
| **通用**  | **串口工具** | **USB to TTL (CH340G / CP2102)**                       | 必备。虽然开发板自带，但独立串口工具是调试的万能钥匙。       |
|           | **外设**     | 面包板、杜邦线 (公对公/公对母)、LED、电阻 (220Ω / 1KΩ) | 基础实验必备。                                               |
|           | **项目外设** | DHT11/BME280 (温湿度/气压)、光敏电阻、OLED (I2C)       | [可选] 后续综合项目会用到，可提前准备。                      |
|           | **调试辅助** | 逻辑分析仪 (8通道, 如 Saleae 仿制版)                   | [强烈推荐] 调试时序、协议问题的神器。                        |

------



### 第2部分：软件工具链清单 (Software Checklist)



| **平台**  | **类别**       | **软件名称**              | **版本 (建议)**  | **官方下载/说明**                                            |
| --------- | -------------- | ------------------------- | ---------------- | ------------------------------------------------------------ |
| **STM32** | **IDE**        | **Keil MDK-ARM**          | V5.36 或更高     | [https://www.keil.com/demo/eval/arm.htm](https://www.google.com/search?q=https://www.keil.com/demo/eval/arm.htm) (注意32KB代码限制，或者你找破解版，这里我就不提供了) |
|           | **配置器**     | **STM32CubeMX**           | V6.6.1 或更高    | https://www.st.com/stm32cubemx                               |
|           | **固件库**     | **F4 Series FW Pack**     | V1.27.0 或更高   | 在 CubeMX 内部下载 (Help -> Manage embedded...)              |
|           | **驱动**       | **ST-Link Driver**        | V2.0.2 或更高    | [https://www.st.com/st-link-driver](https://www.google.com/search?q=https://www.st.com/st-link-driver) |
| **ESP32** | **IDE**        | **Visual Studio Code**    | 最新版           | https://code.visualstudio.com/                               |
|           | **核心扩展**   | **Espressif IDF**         | 最新版 (V1.6.x)  | 在 VSCode 扩展商店搜索 "Espressif IDF"                       |
|           | **SDK/工具链** | **ESP-IDF**               | V4.4.x 或 V5.0.x | **强烈建议**：通过 VSCode 扩展自动安装 (推荐) 或使用 [ESP-IDF Tools Installer](https://github.com/espressif/idf-installer) |
|           | **驱动**       | **CP210x / CH340 Driver** | 最新版           | 根据你的 ESP32 板载芯片型号下载 (DevKitC V4 为 CP210x)       |
| **通用**  | **版本控制**   | **Git**                   | 最新版           | https://git-scm.com/downloads                                |
|           | **串口终端**   | **MobaXterm** / PuTTY     | 最新版           | https://mobaxterm.mobatek.net/ (MobaXterm 功能更全，看个人喜好，我比较推荐这个) |



## ✅ 全部代码 (本篇主要是环境搭建)



本篇为环境准备篇，不涉及平台业务代码。

但你必须执行一个关键操作：**克隆 (Clone) 本系列的代码仓**。

打开你的 Git 终端（或 MobaXterm），执行：

Bash

```
# 这里是我创建的仓库
git clone https://github.com/JinBiLianShao/FreeRTOS-Tutorial.git
cd FreeRTOS-Tutorial
```


克隆后，你将看到大纲中描述的统一目录结构：

```
FreeRTOS-Tutorial/
 ├── docs/         # 博客原稿
 ├── stm32/        # STM32 工程
 ├── esp32/        # ESP32 工程
 ├── common/       # 平台无关代码
 └── README.md     # 教程设计大纲
```



## 🔍 环境验证与调试技巧



如何确保你的环境已“准备就绪”？

1. **STM32 环境验证**：
   - 将 ST-Link V2 插入电脑。
   - 打开 **设备管理器**，检查“通用串行总线控制器”下是否无感叹号地识别出 "STMicroelectronics STLink dongle"。
   - 打开 **Keil MDK**，点击菜单 `Project -> Open Project`，尝试打开代码仓中 `stm32/` 目录下的任意一个工程（如果已有）。
   - 点击 `Project -> Build Target` (F7)，如果能编译通过（0 Errors），说明 Keil MDK 和 Pack 已基本就绪。
2. **ESP32 环境验证**：
   - 将 ESP32-DevKitC V4 开发板插入电脑。
   - 打开 **设备管理器**，检查“端口 (COM & LPT)”下是否识别出 "Silicon Labs CP210x USB to UART Bridge (COMx)"。
   - 打开 **VSCode**，按 `F1` 键，输入并选择 "ESP-IDF: Show Examples Projects"。
   - 选择 `hello_world` 示例，选择使用你安装的 ESP-IDF。
   - 等待 VSCode 自动配置完成（底部栏会显示工具链状态）。
   - 点击 VSCode 底部状态栏的 **"Build"** 按钮（小圆柱图标）。如果输出窗口显示 `Project build complete`，说明 ESP-IDF 工具链已完美配置。
   - （进阶）点击 "Flash" 和 "Monitor" 按钮，如果你能在终端看到 "Hello world!" 打印，恭喜你，已打通全流程！



## ⚠️ 常见错误与修复



1. **[STM32] 错误：Keil MDK 无法检测到 ST-Link。**
   - **原因**：ST-Link 驱动未安装或安装失败。
   - **修复**：重新从 ST 官网下载并以管理员身份安装驱动，重启电脑。检查 USB 线或换一个 USB 口。
2. **[STM32] 错误：Keil MDK 编译提示 `Error: L6218E: Undefined symbol...`**
   - **原因**：最常见于使用 CubeMX 生成代码后，未将 `Core/src` 目录下的 `.c` 文件添加到 Keil 工程中。
   - **修复**：在 Keil 的 Project 窗口中右键点击 `Application/User/Core` -> `Add Existing Files...`，添加所有 `.c` 文件。（我们将在第2.1篇中详解）
3. **[ESP32] 错误：终端提示 `idf.py` 不是内部或外部命令。**
   - **原因**：ESP-IDF 的环境变量未正确加载。
   - **修复**：如果你是手动安装的 IDF，请确保在**当前终端**中运行了 `export.bat` (Win) 或 `source export.sh` (Linux/macOS)。如果你使用 VSCode 扩展，尝试按 `F1` -> `ESP-IDF: Configure ESP-IDF extension` 重新配置路径。
4. **[ESP32] 错误：烧录时提示 "A fatal error occurred: Failed to connect to ESP32: ... Access is denied."**
   - **原因1**：COM 端口被占用。你是否打开了 MobaXterm 或其他串口助手？关掉它。
   - **原因2**：串口驱动 (CP210x / CH340) 未安装。
   - **原因3**：(旧款板子) 你在烧录时没有按住 `BOOT` 按钮。
   - **修复**：逐一排查上述原因。
5. **[通用] 错误：`git clone` 失败，提示 "repository not found" 或 "SSL certificate problem"。**
   - **原因**：网络问题或 Git 配置问题。
   - **修复**：检查仓库 URL 是否拼写正确。如果是 SSL 问题，可尝试配置 `git config --global http.sslVerify false` (不推荐，但可临时解决网络代理问题)。



## 🎯 练习挑战



1. **[基础] 动手实践**：
   - (1) 采购清单中 **STM32** 和 **ESP32** 的核心板及调试器。
   - (2) 安装清单中 **所有** 必需的软件工具。
2. **[进阶] 环境验证**：
   - (1) 按照 **“🔍 环境验证与调试技巧”** 章节，确保你的 STM32 和 ESP32 工具链均可正常编译（例如编译一个 `hello_world`）。
   - (2) 成功 `git clone` 本系列的代码仓。
3. **[挑战] 社群打卡**：
   - 在我博客的评论区中，**截图**并分享以下两个界面，完成“第0篇”打卡：
     1. 你的 ESP-IDF 编译 `hello_world` 成功通过的 VSCode 界面。
     2. 你的 Keil MDK “About MDK” 窗口，显示你的 MDK-ARM 版本。



## 📎 附录：资源链接



1. **STM32CubeMX**: https://www.st.com/en/development-tools/stm32cubemx.html
2. **Keil MDK-ARM**: [https://www.keil.com/demo/eval/arm.htm](https://www.google.com/search?q=https://www.keil.com/demo/eval/arm.htm)
3. **VSCode**: https://code.visualstudio.com/
4. **ESP-IDF (乐鑫官方文档)**: https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32/get-started/index.html
5. **Git**: https://git-scm.com/downloads

------

恭喜你完成了第0步！不要小看这一步，一个干净、标准化的环境是你后续高效学习和调试的**最强保障**。

下一篇，我们将正式进入理论学习：**《第1篇：什么是 FreeRTOS？适用场景与架构总览》**，并紧接着在第2.1和2.2篇中，手把手带你搭建这两个平台。准备好了吗？Let's Go!