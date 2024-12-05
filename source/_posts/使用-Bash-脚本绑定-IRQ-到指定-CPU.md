title: 使用 Bash 脚本绑定 IRQ 到指定 CPU
author: 连思鑫
tags:
  - 中断
  - irq
  - irq绑定cpu
categories:
  - Bash脚本
date: 2024-10-23 18:46:00
---
### 使用 Bash 脚本绑定 IRQ 到指定 CPU

在现代操作系统中，合理地管理中断请求（IRQ）可以显著提升系统性能。本文将介绍如何使用 Bash 脚本将特定的 IRQ 绑定到指定的 CPU，确保系统资源的高效利用。

#### 脚本概述

这个 Bash 脚本的功能是检查输入的 IRQ 号和 CPU 号，验证 IRQ 是否存在，并设置其 `smp_affinity`，以便将该中断分配给特定的 CPU。

#### 脚本实现

1. **参数检查**：首先，脚本检查输入参数的数量是否正确，确保用户输入了 IRQ 和 CPU 的有效值。

   ```bash
   if [ "$#" -ne 2 ]; then
       echo "Usage: $0 <IRQ_NUMBER> <CPU_NUMBER>"
       exit 1
   fi
   ```

2. **验证 IRQ 号**：接下来，脚本检查 `/proc/irq/<IRQ_NUMBER>` 目录是否存在，以确认指定的 IRQ 是否有效。如果无效，脚本会列出所有可用的 IRQ 号。

   ```bash
   if [ ! -d "/proc/irq/$IRQ_NUMBER" ]; then
       echo "IRQ $IRQ_NUMBER does not exist. Available IRQs are:"
       cat /proc/interrupts | awk '{print $1}' | sed 's/://g' | grep -E '^[0-9]+$'
       exit 1
   fi
   ```

3. **设置 CPU 掩码**：通过计算 CPU 掩码，脚本可以将 IRQ 绑定到指定的 CPU。此处使用位运算将中断分配给指定的 CPU。

   ```bash
   AFFINITY_MASK=$(printf "%x" $((1 << CPU_NUMBER)))
   ```

4. **应用和验证设置**：将计算出的掩码写入 `/proc/irq/$IRQ_NUMBER/smp_affinity` 文件，脚本随后验证设置是否成功。

   ```bash
   echo $AFFINITY_MASK > "/proc/irq/$IRQ_NUMBER/smp_affinity"
   CURRENT_AFFINITY=$(cat /proc/irq/$IRQ_NUMBER/smp_affinity)
   echo "Current affinity for IRQ $IRQ_NUMBER: $CURRENT_AFFINITY"
   ```

#### 使用示例

要使用这个脚本，只需执行以下命令：

```bash
./script.sh <IRQ_NUMBER> <CPU_NUMBER>
```

例如，如果你想将 IRQ 24 绑定到 CPU 2，可以运行：

```bash
./script.sh 24 2
```

#### 完整代码

```bash
#!/bin/bash

# 检查输入参数
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <IRQ_NUMBER> <CPU_NUMBER>"
    echo "Author: liansixin
    exit 1
fi

IRQ_NUMBER=$1  # 获取中断号
CPU_NUMBER=$2  # 获取目标CPU号

# 检查中断号目录是否存在
if [ ! -d "/proc/irq/$IRQ_NUMBER" ]; then
    echo "IRQ $IRQ_NUMBER does not exist. Available IRQs are:"
    cat /proc/interrupts | awk '{print $1}' | sed 's/://g' | grep -E '^[0-9]+$'
    exit 1
fi

# 计算CPU掩码，1 << CPU_NUMBER 表示将中断绑定到指定的 CPU
AFFINITY_MASK=$(printf "%x" $((1 << CPU_NUMBER)))

# 设置中断的 smp_affinity
echo "Setting IRQ $IRQ_NUMBER to CPU $CPU_NUMBER (affinity mask: 0x$AFFINITY_MASK)"
echo $AFFINITY_MASK > "/proc/irq/$IRQ_NUMBER/smp_affinity"

# 验证设置是否生效
CURRENT_AFFINITY=$(cat /proc/irq/$IRQ_NUMBER/smp_affinity)
echo "Current affinity for IRQ $IRQ_NUMBER: $CURRENT_AFFINITY"

```

#### 总结

通过这个简单的 Bash 脚本，你可以轻松地将 IRQ 绑定到指定的 CPU，从而提高系统性能。有效的 IRQ 管理对于多核系统尤为重要，可以帮助减少中断处理的延迟和提高响应速度。希望这篇博客能帮助你更好地理解和管理中断请求！