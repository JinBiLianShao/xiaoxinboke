title: 使用STM32F407 GPIO模拟SMI时序对PHY设备进行读写配置
author: 连思鑫
tags:
  - STM32
  - GPIO
  - SMI
categories:
  - STM32
  - SMI
date: 2024-06-30 18:16:00
---
## 使用STM32F407 GPIO模拟SMI时序对PHY设备进行读写配置

在嵌入式系统中，常常需要通过SMI（Serial Management Interface）来配置PHY（Physical Layer Device）设备。SMI协议包括MDIO（Management Data Input/Output）和MDC（Management Data Clock）信号，通过这两个信号与PHY设备进行通信。本文将详细介绍如何使用STM32F407通过GPIO模拟SMI时序对七个PHY设备进行读写配置。

### 1. SMI时序介绍

SMI协议用于通过MDIO和MDC信号来配置PHY设备的寄存器。SMI包括两种操作：读操作和写操作。下面我们分别介绍其时序要求。

#### 写操作时序

1. **起始帧**：32个连续的1位。
2. **起始码**：01。
3. **操作码**：10表示读，01表示写。
4. **PHY地址**：5位。
5. **寄存器地址**：5位。
6. **周转位**：写操作为10。
7. **数据**：16位。

#### 读操作时序

1. **起始帧**：32个连续的1位。
2. **起始码**：01。
3. **操作码**：10表示读。
4. **PHY地址**：5位。
5. **寄存器地址**：5位。
6. **周转位**：Z0（高阻态，随后读取0）。
7. **数据**：16位。

### 2. 硬件介绍

我们的硬件平台是STM32F407，七个PHY设备的MDIO连接在同一个GPIO引脚上，MDC分别连接在七个不同的GPIO引脚上。

#### STM32引脚配置

使用STM32CubeMX进行引脚配置：
- **MDIO**：使用GPIOF的第5引脚（PF5）。
- **MDC**：使用GPIOF的第6到12引脚（PF6到PF12）。

### 3. GPIO模拟SMI实现

#### DWT（Data Watchpoint and Trace）延时实现

为了满足SMI时序要求，我们使用DWT进行精确的延时操作。以下是DWT初始化和纳秒延时函数的实现。

**dwt_delay.h**

```c
#ifndef DWT_DELAY_H
#define DWT_DELAY_H

#include "stm32f4xx_hal.h"

void DWT_Init(void);
void DWT_Delay(uint32_t ns);

#endif // DWT_DELAY_H
```

**dwt_delay.c**

```c
#include "dwt_delay.h"

void DWT_Init(void) {
    CoreDebug->DEMCR |= CoreDebug_DEMCR_TRCENA_Msk;
    DWT->CYCCNT = 0;
    DWT->CTRL |= DWT_CTRL_CYCCNTENA_Msk;
}

void DWT_Delay(uint32_t ns) {
    uint32_t ns_count_tick =  ns * (HAL_RCC_GetHCLKFreq() / 1000000000);
    uint32_t start_tick = DWT->CYCCNT;
    while ((DWT->CYCCNT - start_tick) < ns_count_tick);
}
```

#### PHY读写操作函数实现

**phy_smi.h**

```c
#ifndef PHY_SMI_H
#define PHY_SMI_H

#include "stm32f4xx_hal.h"

// 定义7个PHY设备的MDIO和MDC GPIO端口和引脚
#define MDIO_PORT       GPIOF
#define MDIO_PIN        GPIO_PIN_5

#define MDC_PORT_1      GPIOF
#define MDC_PIN_1       GPIO_PIN_6
#define MDC_PORT_2      GPIOF
#define MDC_PIN_2       GPIO_PIN_7
#define MDC_PORT_3      GPIOF
#define MDC_PIN_3       GPIO_PIN_8
#define MDC_PORT_4      GPIOF
#define MDC_PIN_4       GPIO_PIN_9
#define MDC_PORT_5      GPIOF
#define MDC_PIN_5       GPIO_PIN_10
#define MDC_PORT_6      GPIOF
#define MDC_PIN_6       GPIO_PIN_11
#define MDC_PORT_7      GPIOF
#define MDC_PIN_7       GPIO_PIN_12

// 定义时序常量
#define MDC_DELAY_NS    400  // 根据需要调整延迟时间（纳秒）

// 函数声明
void PHY_Write(uint8_t phyAddr, uint8_t regAddr, uint16_t data);
uint16_t PHY_Read(uint8_t phyAddr, uint8_t regAddr);
void PHY_WriteAll(uint8_t regAddr, uint16_t data);
void PHY_ReadAll(uint8_t regAddr, uint16_t* data);

#endif // PHY_SMI_H
```

**phy_smi.c**

```c
#include "phy_smi.h"
#include "dwt_delay.h"

// 内部使用的静态函数
static void MDIO_Set(uint8_t value) {
    HAL_GPIO_WritePin(MDIO_PORT, MDIO_PIN, value ? GPIO_PIN_SET : GPIO_PIN_RESET);
}

static uint8_t MDIO_Get(void) {
    return HAL_GPIO_ReadPin(MDIO_PORT, MDIO_PIN);
}

static void MDC_Toggle(GPIO_TypeDef *port, uint16_t pin) {
    HAL_GPIO_WritePin(port, pin, GPIO_PIN_SET);
    DWT_Delay(MDC_DELAY_NS);
    HAL_GPIO_WritePin(port, pin, GPIO_PIN_RESET);
    DWT_Delay(MDC_DELAY_NS);
}

static void MDIO_WriteBit(uint8_t bit, GPIO_TypeDef *mdc_port, uint16_t mdc_pin) {
    MDIO_Set(bit);
    MDC_Toggle(mdc_port, mdc_pin);
}

static uint8_t MDIO_ReadBit(GPIO_TypeDef *mdc_port, uint16_t mdc_pin) {
    MDC_Toggle(mdc_port, mdc_pin);
    return MDIO_Get();
}

void PHY_Write(uint8_t phyAddr, uint8_t regAddr, uint16_t data) {
    GPIO_TypeDef *mdc_ports[] = {MDC_PORT_1, MDC_PORT_2, MDC_PORT_3, MDC_PORT_4, MDC_PORT_5, MDC_PORT_6, MDC_PORT_7};
    uint16_t mdc_pins[] = {MDC_PIN_1, MDC_PIN_2, MDC_PIN_3, MDC_PIN_4, MDC_PIN_5, MDC_PIN_6, MDC_PIN_7};

    GPIO_TypeDef *mdc_port = mdc_ports[phyAddr];
    uint16_t mdc_pin = mdc_pins[phyAddr];

    // 生成帧起始位（32个1）
    for (int i = 0; i < 32; i++) {
        MDIO_WriteBit(1, mdc_port, mdc_pin);
    }

    // 写入起始码（01）、写操作码（01）、PHY地址、寄存器地址和周转位（10）
    MDIO_WriteBit(0, mdc_port, mdc_pin);
    MDIO_WriteBit(1, mdc_port, mdc_pin);
    MDIO_WriteBit(0, mdc_port, mdc_pin);
    MDIO_WriteBit(1, mdc_port, mdc_pin);
    for (int i = 4; i >= 0; i--) {
        MDIO_WriteBit((phyAddr >> i) & 0x01, mdc_port, mdc_pin);
    }
    for (int i = 4; i >= 0; i--) {
        MDIO_WriteBit((regAddr >> i) & 0x01, mdc_port, mdc_pin);
    }
    MDIO_WriteBit(1, mdc_port, mdc_pin);
    MDIO_WriteBit(0, mdc_port, mdc_pin);

    // 写入数据
    for (int i = 15; i >= 0; i--) {
        MDIO_WriteBit((data >> i) & 0x01, mdc_port, mdc_pin);
    }

    // 释放MDIO
    MDIO_Set(0);
}

uint16_t PHY_Read(uint8_t phyAddr, uint8_t regAddr) {
    GPIO_TypeDef *mdc_ports[] = {MDC_PORT_1, MDC_PORT_2, MDC_PORT_3, MDC_PORT_4, MDC_PORT_5, MDC_PORT_6, MDC_PORT_7};
    uint16_t mdc_pins[] = {MDC_PIN_1, MDC_PIN_2, MDC_PIN_3, MDC_PIN_4, MDC_PIN_5, MDC_PIN_6, MDC_PIN_7};

    GPIO_TypeDef *mdc_port = mdc_ports[phyAddr];
    uint16_t mdc_pin = mdc_pins[phyAddr];

    uint16_t data = 0;

    // 生成帧起始位（32个1）
    for (int i = 0; i < 32; i++) {
        MDIO_WriteBit(1, mdc_port, mdc_pin);
    }

    // 写入起始码（01）、读操作码（10）、PHY地址、寄存器地址和周转位（Z0）
    MDIO_WriteBit(0, mdc_port, mdc_pin);
    MDIO_WriteBit(1, mdc_port, mdc_pin);
    MDIO_WriteBit(1, mdc_port, mdc_pin);
    MDIO_WriteBit(0, mdc

_port, mdc_pin);
    for (int i = 4; i >= 0; i--) {
        MDIO_WriteBit((phyAddr >> i) & 0x01, mdc_port, mdc_pin);
    }
    for (int i = 4; i >= 0; i--) {
        MDIO_WriteBit((regAddr >> i) & 0x01, mdc_port, mdc_pin);
    }

    // 切换MDIO为输入模式进行周转
    GPIO_InitTypeDef GPIO_InitStruct = {0};
    GPIO_InitStruct.Pin = MDIO_PIN;
    GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
    GPIO_InitStruct.Pull = GPIO_NOPULL;
    HAL_GPIO_Init(MDIO_PORT, &GPIO_InitStruct);

    // 周转
    MDIO_ReadBit(mdc_port, mdc_pin);  // 周转时的虚拟读取
    DWT_Delay(MDC_DELAY_NS);

    // 读取数据
    for (int i = 15; i >= 0; i--) {
        data |= (MDIO_ReadBit(mdc_port, mdc_pin) << i);
    }

    // 切换MDIO回输出模式
    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
    HAL_GPIO_Init(MDIO_PORT, &GPIO_InitStruct);

    // 释放MDIO
    MDIO_Set(0);

    return data;
}

void PHY_WriteAll(uint8_t regAddr, uint16_t data) {
    for (uint8_t phyAddr = 0; phyAddr < 7; phyAddr++) {
        PHY_Write(phyAddr, regAddr, data);
    }
}

void PHY_ReadAll(uint8_t regAddr, uint16_t* data) {
    for (uint8_t phyAddr = 0; phyAddr < 7; phyAddr++) {
        data[phyAddr] = PHY_Read(phyAddr, regAddr);
    }
}
```

### 4. 使用示例

以下是一个在主程序中使用`PHY_WriteAll`和`PHY_ReadAll`来同时对所有PHY设备进行读写操作的示例：

```c
#include "main.h"
#include "dwt_delay.h"
#include "phy_smi.h"

int main(void) {
    // HAL库初始化
    HAL_Init();

    // 系统时钟配置
    SystemClock_Config();

    // 启用DWT
    DWT_Init();

    // 其他初始化代码

    // 配置所有PHY设备的某个寄存器
    uint16_t regAddr = 0x1;  // 示例寄存器地址
    uint16_t writeData = 0x1234;  // 示例写入数据
    PHY_WriteAll(regAddr, writeData);

    // 读取所有PHY设备的某个寄存器
    uint16_t readData[7];
    PHY_ReadAll(regAddr, readData);

    // 输出读取的数据
    for (int i = 0; i < 7; i++) {
        printf("PHY %d: 0x%04X\n", i, readData[i]);
    }

    while (1) {
        // 主循环
    }
}
```

### 结论

通过GPIO模拟SMI时序来读写PHY设备是一个复杂但有趣的过程。本文详细介绍了如何配置STM32F407与七个PHY设备之间的通信，并通过具体的代码实现了读写操作。希望通过本文，您能对PHY设备的配置有一个深入的了解，并能够在实际项目中灵活应用。

如有任何疑问或建议，欢迎在评论区留言讨论。