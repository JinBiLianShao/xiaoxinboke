title: C++通用工具类：文件操作
author: 连思鑫
tags:
  - c++
  - 文件操作
categories:
  - C++通用工具类
date: 2023-09-18 00:19:00
---
## **标题：C++通用工具类：文件操作**

**简介：**
文件操作是许多应用程序中常见的任务之一。在C++中，我们可以编写通用的工具类来简化文件的读写操作。

**正文：**

**1. 实现一个通用的文件读取函数**

```cpp
#include <string>
#include <fstream>

class FileUtil {
public:
    static std::string read(const std::string& filepath) {
        std::ifstream file(filepath);
        if (file) {
            std::string content((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
            return content;
        } else {
            return "";
        }
    }
};
```

**2. 使用示例**

```cpp
int main() {
    std::string filepath = "example.txt";

    std::string content = FileUtil::read(filepath);

    if (!content.empty()) {
        std::cout << "File content:\n" << content << std::endl;
    } else {
        std::cout << "Failed to read file." << std::endl;
    }

    return 0;
}
```

**3. 实现一个通用的文件写入函数**

```cpp
class FileUtil {
public:
    static void write(const std::string& filepath, const std::string& content) {
        std::ofstream file(filepath);
        if (file) {
            file << content;
        }
    }
};
```

**4. 使用示例**

```cpp
int main() {
    std::string filepath = "example.txt";
    std::string content = "This is an example.";

    FileUtil::write(filepath, content);

    std::cout << "File written successfully." << std::endl;

    return 0;
}
```

**结论：**

通用工具类可以帮助我们简化许多常见的任务，例如文件操作。在C++中，我们可以编写这样的工具类来提高代码的可重用性和可维护性。