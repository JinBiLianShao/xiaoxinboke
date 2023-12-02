title: C++通用工具类：异常处理
author: 连思鑫
tags:
  - c++
  - 异常处理
categories:
  - C++通用工具类
date: 2023-09-18 00:21:00
---
## **标题：C++通用工具类：异常处理**

**简介：**
异常处理是保证程序稳定性的重要一环。在C++中，我们可以编写通用的工具类来简化异常处理过程。

**正文：**

**1. 实现一个通用的异常处理函数**

```cpp
#include <iostream>
#include <exception>

class ExceptionUtil {
public:
    static void handleException(const std::exception& e) {
        std::cerr << "Exception caught: " << e.what() << std::endl;
    }
};
```

**2. 使用示例**

```cpp
int main() {
    try {
        throw std::runtime_error("Something went wrong.");
    } catch (const std::exception& e) {
        ExceptionUtil::handleException(e);
    }

    return 0;
}
```

**3. 实现一个通用的异常抛出函数**

```cpp
class ExceptionUtil {
public:
    static void throwException() {
        throw std::runtime_error("Custom exception message.");
    }
};
```

**4. 使用示例**

```cpp
int main() {
    try {
        ExceptionUtil::throwException();
    } catch (const std::exception& e) {
        ExceptionUtil::handleException(e);
    }

    return 0;
}
```

**结论：**

通用工具类可以帮助我们简化许多常见的任务，例如异常处理。在C++中，我们可以编写这样的工具类来提高代码的可重用性和可维护性。
