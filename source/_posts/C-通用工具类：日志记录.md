title: C++通用工具类：日志记录
author: 连思鑫
tags:
  - c++
  - 日志记录
categories:
  - C++通用工具类
date: 2023-09-18 21:04:00
---
## **标题：C++通用工具类：日志记录**

**简介：**
日志记录是开发过程中必不可少的一环，它可以帮助我们跟踪程序的执行过程以及排查错误。在C++中，我们可以编写通用的工具类来简化日志记录的过程。

**正文：**

**1. 实现一个通用的日志记录函数**

```cpp
#include <iostream>
#include <fstream>
#include <ctime>

class LogUtil {
private:
    std::ofstream logFile;

public:
    LogUtil(const std::string& filepath) {
        logFile.open(filepath, std::ios::out | std::ios::app);
        if (!logFile.is_open()) {
            throw std::runtime_error("Failed to open log file.");
        }
    }

    ~LogUtil() {
        logFile.close();
    }

    void log(const std::string& message) {
        std::time_t currentTime = std::time(0);
        std::string timestamp = std::ctime(&currentTime);
        timestamp.pop_back(); // Remove the trailing newline character

        logFile << "[" << timestamp << "] " << message << std::endl;
    }
};
```

**2. 使用示例**

```cpp
int main() {
    try {
        LogUtil logger("logfile.txt");
        logger.log("This is a log message.");
        logger.log("Another log message.");
    } catch (const std::exception& e) {
        std::cerr << "Exception caught: " << e.what() << std::endl;
    }

    return 0;
}
```

**结论：**

通用工具类可以帮助我们简化许多常见的任务，例如日志记录。在C++中，我们可以编写这样的工具类来提高代码的可重用性和可维护性。
