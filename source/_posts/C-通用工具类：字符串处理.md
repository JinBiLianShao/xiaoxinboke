title: C++通用工具类：字符串处理
author: 连思鑫
tags:
  - c++
  - 字符串处理
categories:
  - C++通用工具类
date: 2023-09-18 00:18:00
---
## **标题：C++通用工具类：字符串处理**

**简介：**
字符串处理是许多应用程序中常见的任务之一。在C++中，我们可以通过编写通用的工具类来简化这一过程。

**正文：**

**1. 实现一个通用的字符串拆分函数**

```cpp
#include <string>
#include <vector>
#include <sstream>

class StringUtil {
public:
    static std::vector<std::string> split(const std::string& str, char delimiter) {
        std::vector<std::string> tokens;
        std::istringstream stream(str);
        std::string token;
        while (std::getline(stream, token, delimiter)) {
            tokens.push_back(token);
        }
        return tokens;
    }
};
```

**2. 使用示例**

```cpp
int main() {
    std::string input = "Hello,World,OpenAI";
    char delimiter = ',';

    std::vector<std::string> tokens = StringUtil::split(input, delimiter);

    for (const std::string& token : tokens) {
        std::cout << token << std::endl;
    }

    return 0;
}
```

**3. 实现一个通用的字符串替换函数**

```cpp
class StringUtil {
public:
    static std::string replace(const std::string& str, const std::string& target, const std::string& replacement) {
        std::string result = str;
        size_t position = 0;
        while ((position = result.find(target, position)) != std::string::npos) {
            result.replace(position, target.length(), replacement);
            position += replacement.length();
        }
        return result;
    }
};
```

**4. 使用示例**

```cpp
int main() {
    std::string input = "Hello, World! Hello, OpenAI!";
    std::string target = "Hello";
    std::string replacement = "Hi";

    std::string result = StringUtil::replace(input, target, replacement);

    std::cout << result << std::endl;

    return 0;
}
```

**结论：**

通用工具类可以帮助我们简化许多常见的任务，例如字符串处理。在C++中，我们可以编写这样的工具类来提高代码的可重用性和可维护性。