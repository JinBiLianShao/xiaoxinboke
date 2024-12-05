title: '[已验证]基于HAL库可迁移通用gpio模拟I2C实现'
author: 连思鑫
tags:
  - gpio
  - i2c
  - gpio模拟i2c
  - stm32
categories:
  - stm32学习笔记
date: 2024-10-23 19:42:00
---
# [已验证]基于HAL库可迁移通用gpio模拟I2C实现

## 引言

之前写过一版，但没有经过工程验证，而今年在实际工程领域确实要用到gpio模拟I2C的功能实现，我在原有的基础上调试，修复bug才有了今天这篇博客。下述源码已经过实际开发工程验证，可迁移使用。话不多说，在介绍一遍吧。。

## I2C协议简介

I2C是一种多主多从的串行通信协议，具有简单、灵活的优点。它使用两根信号线：SDA（数据线）和SCL（时钟线）。数据在SDA线上传输，而SCL线用于同步信号。I2C的通信时序如下图所示：


![i2c时序图](/images/2024-10-23-01.png)

### 时序说明

1. **起始条件（Start Condition）**：SDA从高电平跳变到低电平，SCL保持高电平。
2. **停止条件（Stop Condition）**：SDA从低电平跳变到高电平，SCL保持高电平。
3. **数据传输**：数据在SDA线上传输时，SCL线提供时钟信号，每个时钟周期传输一位数据。

## GPIO初始化

在STM32中，我使用GPIO引脚模拟I2C信号。以下是GPIO初始化的代码实现：

```c
void I2C_GPIO_Init(void)
{
    GPIO_InitTypeDef GPIO_InitStruct = {0};

    // 初始化SCL引脚
    GPIO_InitStruct.Pin = I2C3_SCL_Pin;
    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
    GPIO_InitStruct.Pull = GPIO_NOPULL;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_HIGH;
    HAL_GPIO_Init(I2C3_SCL_GPIO_Port, &GPIO_InitStruct);

    // 初始化SDA引脚
    GPIO_InitStruct.Pin = I2C3_SDA_Pin;
    HAL_GPIO_Init(I2C3_SDA_GPIO_Port, &GPIO_InitStruct);

    // 将SCL和SDA拉高
    HAL_GPIO_WritePin(I2C3_SCL_GPIO_Port, I2C3_SCL_Pin, GPIO_PIN_SET);
    HAL_GPIO_WritePin(I2C3_SDA_GPIO_Port, I2C3_SDA_Pin, GPIO_PIN_SET);
}
```

在`I2C_GPIO_Init`函数中，我们将SCL和SDA引脚初始化为推挽输出模式，并将其状态设置为高电平。

## I2C操作实现

接下来，我们将实现I2C的基本操作，包括起始条件、停止条件、发送字节和读取字节等。

### 起始条件与停止条件

```c
void I2C_Start(void)
{
    I2C_Set_SDA(GPIO_PIN_SET);
    I2C_Set_SCL(GPIO_PIN_SET);
    I2C_Delay();
    I2C_Set_SDA(GPIO_PIN_RESET);
    I2C_Delay();
    I2C_Set_SCL(GPIO_PIN_RESET);
    I2C_Delay();
}

void I2C_Stop(void)
{
    I2C_Set_SDA(GPIO_PIN_RESET);
    I2C_Set_SCL(GPIO_PIN_SET);
    I2C_Delay();
    I2C_Set_SDA(GPIO_PIN_SET);
    I2C_Delay();
}
```

在`I2C_Start`和`I2C_Stop`函数中，我们通过控制SDA和SCL的电平来实现I2C的起始和停止条件。

### 发送字节

发送字节的函数如下：

```c
static HAL_StatusTypeDef I2C_Send_Byte(uint8_t byte)
{
    for (int8_t i = 7; i >= 0; i--)
    {
        GPIO_PinState bit = (byte & (1 << i)) ? GPIO_PIN_SET : GPIO_PIN_RESET;
        I2C_Set_SDA(bit);
        I2C_Delay();
        I2C_Set_SCL(GPIO_PIN_SET);
        I2C_Delay();
        I2C_Set_SCL(GPIO_PIN_RESET);
        I2C_Delay();
    }

    // 接收ACK
    I2C_Set_SDA_Input();
    I2C_Delay();
    I2C_Set_SCL(GPIO_PIN_SET);
    I2C_Delay();
    GPIO_PinState ack = I2C_Read_SDA();
    I2C_Set_SCL(GPIO_PIN_RESET);
    I2C_Delay();

    return (ack == GPIO_PIN_RESET) ? HAL_OK : HAL_ERROR;
}
```

在`I2C_Send_Byte`函数中，我们将数据的每一位发送到SDA线上，并在发送完毕后读取ACK信号。

### 读取字节

读取字节的实现如下：

```c
static uint8_t I2C_Read_Byte(GPIO_PinState ack)
{
    uint8_t byte = 0;

    I2C_Set_SDA_Input();  // 设置SDA为输入模式
    I2C_Delay();

    for (int8_t i = 7; i >= 0; i--)
    {
        I2C_Set_SCL(GPIO_PIN_SET);
        I2C_Delay();
        if (I2C_Read_SDA() == GPIO_PIN_SET)
        {
            byte |= (1 << i);
        }
        I2C_Set_SCL(GPIO_PIN_RESET);
        I2C_Delay();
    }

    // 发送ACK或NACK
    I2C_Set_SDA(ack);
    I2C_Delay();
    I2C_Set_SCL(GPIO_PIN_SET);
    I2C_Delay();
    I2C_Set_SCL(GPIO_PIN_RESET);
    I2C_Delay();

    return byte;
}
```

在`I2C_Read_Byte`函数中，我们设置SDA为输入模式，读取数据位，并根据需要发送ACK或NACK。

## I2C读写操作的封装

我们还可以将上述基本操作封装为更高层次的I2C读写函数，如`G_I2C_Mem_Write`和`G_I2C_Mem_Read`。

### 写入操作

```c
HAL_StatusTypeDef G_I2C_Mem_Write(uint8_t devAddr, uint8_t memAddr, uint8_t *pData, uint16_t size)
{
    I2C_Start();

    if (I2C_Send_Byte(devAddr << 1) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    if (I2C_Send_Byte(memAddr) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    for (uint16_t i = 0; i < size; i++)
    {
        if (I2C_Send_Byte(pData[i]) != HAL_OK)
        {
            I2C_Stop();
            return HAL_ERROR;
        }
    }

    I2C_Stop();
    return HAL_OK;
}
```

### 读取操作

```c
HAL_StatusTypeDef G_I2C_Mem_Read(uint8_t devAddr, uint8_t memAddr, uint8_t *pData, uint16_t size)
{
    I2C_Start();

    if (I2C_Send_Byte(devAddr << 1) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    if (I2C_Send_Byte(memAddr) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    I2C_Start();

    if (I2C_Send_Byte((devAddr << 1) | 0x01) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    for (uint16_t i = 0; i < size; i++)
    {
        pData[i] = I2C_Read_Byte((i == size - 1) ? I2C_NACK : I2C_ACK);
    }

    I2C_Stop();
    return HAL_OK;
}
```

## 结论

通过以上实现，我们可以利用GPIO成功模拟I2C通信。这种方法不仅适用于STM32等微控制器，还能应用于其他许多嵌入式平台。在实际应用中，理解I2C时序和信号的处理都是至关重要的。

## 附录

完整的代码实现可参考本博客提供的源文件和头文件。
##### i2c_gpio.h
```c
/**
 * @file i2c_gpio.h
 * @brief 实现gpio模拟I2C的功能实现
 * @author 连思鑫 (liansixin)
 * @date 9/5/2024
 */
#ifndef __I2C_GPIO_H
#define __I2C_GPIO_H

#include "stm32f4xx_hal.h"

void I2C_GPIO_Init(void);
void I2C_Delay(void);
void I2C_Start(void);
void I2C_Stop(void);
HAL_StatusTypeDef I2C_Mem_Write(uint8_t devAddr, uint16_t memAddr, uint8_t *pData, uint16_t size);
HAL_StatusTypeDef I2C_Mem_Read(uint8_t devAddr, uint16_t memAddr, uint8_t *pData, uint16_t size);

// I2C API函数声明
HAL_StatusTypeDef G_I2C_Mem_Write(uint8_t devAddr, uint8_t memAddr, uint8_t *pData, uint16_t size);
HAL_StatusTypeDef G_I2C_Mem_Read(uint8_t devAddr, uint8_t memAddr, uint8_t *pData, uint16_t size);


#endif /* __I2C_GPIO_H */

```

##### i2c_gpio.c
```c
/**
 * @file i2c_gpio.h
 * @brief 实现gpio模拟I2C的功能实现
 * @author 连思鑫 (liansixin)
 * @date 9/5/2024
 */
#include "stm32f4xx_hal.h"

// 定义引脚和端口
#define I2C3_SCL_Pin GPIO_PIN_8
#define I2C3_SDA_Pin GPIO_PIN_9
#define I2C3_SCL_GPIO_Port GPIOA
#define I2C3_SDA_GPIO_Port GPIOC

// 定义 I2C ACK 和 NACK
#define I2C_ACK GPIO_PIN_RESET
#define I2C_NACK GPIO_PIN_SET

void I2C_GPIO_Init(void)
{
    GPIO_InitTypeDef GPIO_InitStruct = {0};

    // 初始化SCL引脚
    GPIO_InitStruct.Pin = I2C3_SCL_Pin;
    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
    GPIO_InitStruct.Pull = GPIO_NOPULL;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_HIGH;
    HAL_GPIO_Init(I2C3_SCL_GPIO_Port, &GPIO_InitStruct);

    // 初始化SDA引脚
    GPIO_InitStruct.Pin = I2C3_SDA_Pin;
    HAL_GPIO_Init(I2C3_SDA_GPIO_Port, &GPIO_InitStruct);

    // 将SCL和SDA拉高
    HAL_GPIO_WritePin(I2C3_SCL_GPIO_Port, I2C3_SCL_Pin, GPIO_PIN_SET);
    HAL_GPIO_WritePin(I2C3_SDA_GPIO_Port, I2C3_SDA_Pin, GPIO_PIN_SET);
}

//输出模式
void I2C_Set_SDA_Output(void)
{
    GPIO_InitTypeDef GPIO_InitStruct = {0};

    GPIO_InitStruct.Pin = I2C3_SDA_Pin;
    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
    GPIO_InitStruct.Pull = GPIO_NOPULL;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_HIGH;
    HAL_GPIO_Init(I2C3_SDA_GPIO_Port, &GPIO_InitStruct);
}

// 输入模式
void I2C_Set_SDA_Input(void)
{
    GPIO_InitTypeDef GPIO_InitStruct = {0};

    GPIO_InitStruct.Pin = I2C3_SDA_Pin;
    GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
    GPIO_InitStruct.Pull = GPIO_NOPULL;
    HAL_GPIO_Init(I2C3_SDA_GPIO_Port, &GPIO_InitStruct);
}

// 设置SCL线电平
static void I2C_Set_SCL(GPIO_PinState state)
{
    HAL_GPIO_WritePin(I2C3_SCL_GPIO_Port, I2C3_SCL_Pin, state);
}

// 设置SDA线电平
static void I2C_Set_SDA(GPIO_PinState state)
{
    I2C_Set_SDA_Output();  // 设置为输出模式
    HAL_GPIO_WritePin(I2C3_SDA_GPIO_Port, I2C3_SDA_Pin, state);
}

// 读取SDA线电平
static GPIO_PinState I2C_Read_SDA(void)
{
    I2C_Set_SDA_Input();  // 设置为输入模式
    return HAL_GPIO_ReadPin(I2C3_SDA_GPIO_Port, I2C3_SDA_Pin);
}

void I2C_Delay(void)
{
    // 延时函数，可以根据时钟频率调整
    for (volatile int i = 0; i < 126; i++)
    {
        __NOP();
    }
}

void I2C_Start(void)
{
	  I2C_Set_SDA(GPIO_PIN_SET);
    I2C_Set_SCL(GPIO_PIN_SET);
    I2C_Delay();
    I2C_Set_SDA(GPIO_PIN_RESET);
    I2C_Delay();
    I2C_Set_SCL(GPIO_PIN_RESET);
    I2C_Delay();
}

void I2C_Stop(void)
{
	  I2C_Set_SDA(GPIO_PIN_RESET);
    I2C_Set_SCL(GPIO_PIN_SET);
    I2C_Delay();
    I2C_Set_SDA(GPIO_PIN_SET);
    I2C_Delay();
}

// 发送一个字节，返回ACK状态
static HAL_StatusTypeDef I2C_Send_Byte(uint8_t byte)
{
    for (int8_t i = 7; i >= 0; i--)
    {
        GPIO_PinState bit = (byte & (1 << i)) ? GPIO_PIN_SET : GPIO_PIN_RESET;
        I2C_Set_SDA(bit);
        I2C_Delay();
        I2C_Set_SCL(GPIO_PIN_SET);
        I2C_Delay();
        I2C_Set_SCL(GPIO_PIN_RESET);
        I2C_Delay();
    }

    // 接收ACK
    I2C_Set_SDA_Input();  // 切换SDA为输入模式
    I2C_Delay();
    I2C_Set_SCL(GPIO_PIN_SET);
    I2C_Delay();
    GPIO_PinState ack = I2C_Read_SDA();  // 读取ACK信号
    I2C_Set_SCL(GPIO_PIN_RESET);
    I2C_Delay();

    return (ack == GPIO_PIN_RESET) ? HAL_OK : HAL_ERROR;
}

// 读取一个字节，并发送ACK或NACK
static uint8_t I2C_Read_Byte(GPIO_PinState ack)
{
    uint8_t byte = 0;

    I2C_Set_SDA_Input();  // 设置SDA为输入模式
    I2C_Delay();

    for (int8_t i = 7; i >= 0; i--)
    {
        I2C_Set_SCL(GPIO_PIN_SET);
        I2C_Delay();
        if (I2C_Read_SDA() == GPIO_PIN_SET)
        {
            byte |= (1 << i);
        }
        I2C_Set_SCL(GPIO_PIN_RESET);
        I2C_Delay();
    }

    // 发送ACK或NACK
    I2C_Set_SDA(ack);  // 设置SDA为输出模式，并发送ACK或NACK
    I2C_Delay();
    I2C_Set_SCL(GPIO_PIN_SET);
    I2C_Delay();
    I2C_Set_SCL(GPIO_PIN_RESET);
    I2C_Delay();

    return byte;
}

// 模拟I2C写入函数，类似HAL_I2C_Mem_Write
HAL_StatusTypeDef G_I2C_Mem_Write(uint8_t devAddr, uint8_t memAddr, uint8_t *pData, uint16_t size)
{
    I2C_Start();

    if (I2C_Send_Byte(devAddr << 1) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    if (I2C_Send_Byte(memAddr) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    for (uint16_t i = 0; i < size; i++)
    {
        if (I2C_Send_Byte(pData[i]) != HAL_OK)
        {
            I2C_Stop();
            return HAL_ERROR;
        }
    }

    I2C_Stop();
    return HAL_OK;
}

// 模拟I2C读取函数，类似HAL_I2C_Mem_Read
HAL_StatusTypeDef G_I2C_Mem_Read(uint8_t devAddr, uint8_t memAddr, uint8_t *pData, uint16_t size)
{
    I2C_Start();

    if (I2C_Send_Byte(devAddr << 1) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    if (I2C_Send_Byte(memAddr) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    I2C_Start();  // 重新启动信号

    if (I2C_Send_Byte((devAddr << 1) | 0x01) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    for (uint16_t i = 0; i < size; i++)
    {
        pData[i] = I2C_Read_Byte((i == size - 1) ? I2C_NACK : I2C_ACK);
    }

    I2C_Stop();
    return HAL_OK;
}

// 模拟I2C写入函数，支持16位寄存器地址
HAL_StatusTypeDef I2C_Mem_Write(uint8_t devAddr, uint16_t memAddr, uint8_t *pData, uint16_t size)
{
    I2C_Start();

    if (I2C_Send_Byte(devAddr << 1) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    // 发送高位地址字节
    if (I2C_Send_Byte((uint8_t)(memAddr >> 8)) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    // 发送低位地址字节
    if (I2C_Send_Byte((uint8_t)(memAddr & 0xFF)) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    // 发送数据
    for (uint16_t i = 0; i < size; i++)
    {
        if (I2C_Send_Byte(pData[i]) != HAL_OK)
        {
            I2C_Stop();
            return HAL_ERROR;
        }
    }

    I2C_Stop();
    return HAL_OK;
}


// 模拟I2C读取函数，支持16位寄存器地址
HAL_StatusTypeDef I2C_Mem_Read(uint8_t devAddr, uint16_t memAddr, uint8_t *pData, uint16_t size)
{
    I2C_Start();

    if (I2C_Send_Byte(devAddr << 1) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    // 发送高位地址字节
    if (I2C_Send_Byte((uint8_t)(memAddr >> 8)) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    // 发送低位地址字节
    if (I2C_Send_Byte((uint8_t)(memAddr & 0xFF)) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    I2C_Start();  // 重新启动信号

    if (I2C_Send_Byte((devAddr << 1) | 0x01) != HAL_OK)
    {
        I2C_Stop();
        return HAL_ERROR;
    }

    // 接收数据
    for (uint16_t i = 0; i < size; i++)
    {
        pData[i] = I2C_Read_Byte((i == size - 1) ? I2C_NACK : I2C_ACK);
    }

    I2C_Stop();
    return HAL_OK;
}
```
---