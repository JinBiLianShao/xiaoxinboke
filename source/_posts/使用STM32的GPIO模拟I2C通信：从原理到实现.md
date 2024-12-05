title: 使用STM32的GPIO模拟I2C通信：从原理到实现
author: 连思鑫
tags:
  - STM32
  - 模拟I2C实现
  - HAL库
categories:
  - STM32学习笔记
date: 2024-02-23 20:05:00
---
## 使用STM32的GPIO模拟I2C通信：从原理到实现

在嵌入式系统中，I2C（Inter-Integrated Circuit）是一种常用的串行通信协议，用于在芯片之间进行简单、高效的数据传输。然而，在某些情况下，由于外部设备或特定硬件限制，我们可能无法直接使用硬件I2C接口。在这种情况下，可以通过GPIO模拟I2C通信来实现相同的功能。本文将介绍GPIO模拟I2C通信的原理，并提供一个基于STM32的示例代码。

### GPIO模拟I2C通信原理

GPIO模拟I2C通信是通过控制微控制器的通用输入/输出引脚来模拟I2C通信协议。在I2C通信中，通常有两根线：SDA（数据线）和SCL（时钟线）。通过控制这两根线的电平变化，可以实现起始条件、停止条件、数据传输等功能。

1. **起始条件（Start Condition）**：在I2C通信中，起始条件是将SDA线从高电平转换为低电平，然后保持SCL线为高电平状态。

2. **停止条件（Stop Condition）**：停止条件是将SDA线从低电平转换为高电平，然后保持SCL线为高电平状态。

3. **数据传输**：在数据传输过程中，数据是在SCL线为低电平时传输的。SDA线的电平变化表示数据的位值，即高电平表示1，低电平表示0。在每个数据字节传输后，都需要等待接收方发送应答信号。

基于以上原理，可以通过GPIO控制来模拟I2C通信的各个步骤，从而实现与外部设备的数据交换。

### 优化模拟I2C实现

为了增强模拟I2C的通用性和易用性，我对模拟I2C实现进行了优化，并提供了类似于HAL库中对I2C的操作风格。

1. **模拟I2C句柄定义**：创建了一个结构体`SimulatedI2C_HandleTypeDef`，用于存储模拟I2C的引脚信息。

2. **封装模拟I2C操作函数**：封装了模拟I2C的初始化函数`SimulatedI2C_Init`、写入函数`SimulatedI2C_Write`和读取函数`SimulatedI2C_Read`，以实现类似于HAL库中对I2C的操作风格。

### 优化后的示例代码

下面是示例代码，演示了如何使用STM32的GPIO模拟I2C通信与外部设备进行读写操作：

```c
#include "stm32f4xx_hal.h"

// GPIO定义
#define SDA_GPIO_PORT GPIOA
#define SDA_PIN GPIO_PIN_0

#define SCL_GPIO_PORT GPIOA
#define SCL_PIN GPIO_PIN_1

// 模拟I2C句柄定义
typedef struct {
    GPIO_TypeDef *SDA_GPIO_Port;
    uint16_t SDA_Pin;
    GPIO_TypeDef *SCL_GPIO_Port;
    uint16_t SCL_Pin;
} SimulatedI2C_HandleTypeDef;

// 函数声明
void SimulatedI2C_Init(SimulatedI2C_HandleTypeDef *hi2c);
void SimulatedI2C_Write(SimulatedI2C_HandleTypeDef *hi2c, uint8_t dev_addr, uint8_t *data, uint16_t size);
void SimulatedI2C_Read(SimulatedI2C_HandleTypeDef *hi2c, uint8_t dev_addr, uint8_t *data, uint16_t size);

// 延迟函数
void I2C_Delay(void) {
    // 根据需要添加延迟，也可以用HAL库的HAL_Delay();
   for (int i = 0; i < 100; i++);
}

// 启动条件
void I2C_Start(SimulatedI2C_HandleTypeDef *hi2c) {
    HAL_GPIO_WritePin(hi2c->SDA_GPIO_Port, hi2c->SDA_Pin, GPIO_PIN_SET);
    HAL_GPIO_WritePin(hi2c->SCL_GPIO_Port, hi2c->SCL_Pin, GPIO_PIN_SET);
    I2C_Delay();
    HAL_GPIO_WritePin(hi2c->SDA_GPIO_Port, hi2c->SDA_Pin, GPIO_PIN_RESET);
    I2C_Delay();
    HAL_GPIO_WritePin(hi2c->SCL_GPIO_Port, hi2c->SCL_Pin, GPIO_PIN_RESET);
    I2C_Delay();
}

// 停止条件
void I2C_Stop(SimulatedI2C_HandleTypeDef *hi2c) {
    HAL_GPIO_WritePin(hi2c->SDA_GPIO_Port, hi2c->SDA_Pin, GPIO_PIN_RESET);
    HAL_GPIO_WritePin(hi2c->SCL_GPIO_Port, hi2c->SCL_Pin, GPIO_PIN_SET);
    I2C_Delay();
    HAL_GPIO_WritePin(hi2c->SDA_GPIO_Port, hi2c->SDA_Pin, GPIO_PIN_SET);
    I2C_Delay();
}

// 写入单个字节
void I2C_WriteByte(SimulatedI2C_HandleTypeDef *hi2c, uint8_t byte) {
    for (int8_t i = 7; i >= 0; i--) {
        if (byte & (1 << i)) {
            HAL_GPIO_WritePin(hi2c->SDA_GPIO_Port, hi2c->SDA_Pin, GPIO_PIN_SET);
        } else {
            HAL_GPIO_WritePin(hi2c->SDA_GPIO_Port, hi2c->SDA_Pin, GPIO_PIN_RESET);
        }
        I2C_Delay();
        HAL_GPIO_WritePin(hi2c->SCL_GPIO_Port, hi2c->SCL_Pin, GPIO_PIN_SET);
        I2C_Delay();
        HAL_GPIO_WritePin(hi2c->SCL_GPIO_Port, hi2c->SCL_Pin, GPIO_PIN_RESET);
        I2C_Delay();
    }
}

// 读取单个字节
uint8_t I2C_ReadByte(SimulatedI2C_HandleTypeDef *hi2c) {
    uint8_t byte = 0;
    for (int8_t i = 7; i >= 0; i--) {
        HAL_GPIO_WritePin(hi2c->SCL_GPIO_Port, hi2c->SCL_Pin, GPIO_PIN_SET);
        I2C_Delay();
        if (HAL_GPIO_ReadPin(hi2c->SDA_GPIO_Port, hi2c->SDA_Pin)) {
            byte |= (1 << i);
        }
        HAL_GPIO_WritePin(hi2c->SCL_GPIO_Port, hi2c->SCL_Pin, GPIO_PIN_RESET);
        I2C_Delay();
    }
    return byte;
}

// 模拟I2C初始化
void SimulatedI2C_Init(SimulatedI2C_HandleTypeDef *hi2c) {
    GPIO_InitTypeDef GPIO_InitStruct = {0};

    // 初始化SDA引脚
    GPIO_InitStruct.Pin = hi2c->SDA_Pin;
    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_OD;
    GPIO_InitStruct.Pull = GPIO_PULLUP;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_HIGH;
    HAL_GPIO_Init(hi2c->SDA_GPIO_Port, &GPIO_InitStruct);

    // 初始化SCL引脚
    GPIO_InitStruct.Pin = hi2c->SCL_Pin;
    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_OD;
    GPIO_InitStruct.Pull = GPIO_PULLUP;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_HIGH;
    HAL_GPIO_Init(hi2c->SCL_GPIO_Port, &GPIO_InitStruct);
}

// 向设备写入数据
void SimulatedI2C_Write(SimulatedI2C_HandleTypeDef *hi2c, uint8_t dev_addr, uint8_t *data, uint16_t size) {
    // 发送起始条件
    I2C_Start(hi2c);

    // 发送设备地址和写入位
    I2C_WriteByte(hi2c, dev_addr << 1);

    // 发送数据
    for (uint16_t i = 0; i < size; i++) {
        I2C_WriteByte(hi2c, data[i]);
    }

    // 结束通信
    I2C_Stop(hi2c);
}

// 从设备读取数据
void SimulatedI2C_Read(SimulatedI2C_HandleTypeDef *hi2c, uint8_t dev_addr, uint8_t *data, uint16_t size) {
    // 发送起始条件
    I2C_Start(hi2c);

    // 发送设备地址和读取位
    I2C_WriteByte(hi2c, (dev_addr << 1) | 0x01);

    // 读取数据
    for (uint16_t i = 0; i < size; i++) {
        data[i] = I2C_ReadByte(hi2c);
    }

    // 结束通信
    I2C_Stop(hi2c);
}

int main(void) {
    HAL_Init();

    SimulatedI2C_HandleTypeDef hi2c = {0};
    hi2c.SDA_GPIO_Port = SDA_GPIO_PORT;
    hi2c.SDA_Pin = SDA_PIN;
    hi2c.SCL_GPIO_Port = SCL_GPIO_PORT;
    hi2c.SCL_Pin = SCL_PIN;

    SimulatedI2C_Init(&hi2c);

    // 以下是示例代码，使用模拟I2C向外部设备写入数据和读取数据
    uint8_t writeData[] = {0x12, 0x34, 0x56};
    uint8_t readData[3];

    SimulatedI2C_Write(&hi2c, 0x50, writeData, sizeof(writeData));
    SimulatedI2C_Read(&hi2c, 0x50, readData, sizeof(readData));

    while (1) {
        // 无限循环
    }
}

```

我们使模拟I2C的操作更加通用和易用，从而能够更灵活地与不同的外部设备进行通信。在实际应用中，您可以根据具体的需求和外部设备的通信协议来进行定制和扩展。

**注意：**上述示例代码写于今晚，还未经过实际验证其稳定性！！请谨慎用于工作项目中。。。

**已更新已验证版本，请跳转观看：** [点我跳转到最新博客](https://jinbilianshao.github.io/2024/10/23/%E5%B7%B2%E9%AA%8C%E8%AF%81-%E5%9F%BA%E4%BA%8EHAL%E5%BA%93%E5%8F%AF%E8%BF%81%E7%A7%BB%E9%80%9A%E7%94%A8gpio%E6%A8%A1%E6%8B%9FI2C%E5%AE%9E%E7%8E%B0/)