title: C++通用工具类：日期时间处理
author: 连思鑫
tags:
  - c++
  - 日期时间处理
categories:
  - C++通用工具类
date: 2023-09-18 00:19:00
---
## **标题：C++通用工具类：日期时间处理**

**简介：**
日期时间处理是许多应用程序中常见的任务之一。在C++中，我们可以编写通用的工具类来简化日期时间的操作。

**正文：**

**1. 实现一个通用的日期时间格式化函数**

```cpp
#include <string>
#include <ctime>

class DateTimeUtil {
public:
    static std::string format(const std::string& format, const std::time_t& time) {
        char buffer[80];
        std::tm* timeinfo = std::localtime(&time);
        std::strftime(buffer, sizeof(buffer), format.c_str(), timeinfo);
        return buffer;
    }
};
```

**2. 使用示例**

```cpp
int main() {
    std::time_t currentTime = std::time(0);
    std::string format = "%Y-%m-%d %H:%M:%S";

    std::string formattedTime = DateTimeUtil::format(format, currentTime);

    std::cout << "Current time: " << formattedTime << std::endl;

    return 0;
}
```

**3. 实现一个通用的日期时间解析函数**

```cpp
class DateTimeUtil {
public:
    static std::time_t parse(const std::string& datetime, const std::string& format) {
        std::tm timeinfo = {};
        std::istringstream stream(datetime);
        stream >> std::get_time(&timeinfo, format.c_str());
        return std::mktime(&timeinfo);
    }
};
```

**4. 使用示例**

```cpp
int main() {
    std::string datetime = "2023-09-16 15:30:00";
    std::string format = "%Y-%m-%d %H:%M:%S";

    std::time_t parsedTime = DateTimeUtil::parse(datetime, format);

    if (parsedTime != -1) {
        std::string formattedTime = DateTimeUtil::format(format, parsedTime);
        std::cout << "Parsed time: " << formattedTime << std::endl;
    } else {
        std::cout << "Failed to parse datetime." << std::endl;
    }

    return 0;
}
```

**结论：**

通用工具类可以帮助我们简化许多常见的任务，例如日期时间处理。在C++中，我们可以编写这样的工具类来提高代码的可重用性和可维护性。
