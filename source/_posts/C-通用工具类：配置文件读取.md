title: C++通用工具类：配置文件读取
author: 连思鑫
tags:
  - c++
  - 配置文件读取
categories:
  - C++通用工具类
date: 2023-09-18 21:05:00
---
## **标题：C++通用工具类：配置文件读取**

**简介：**
在许多应用程序中，配置文件是用来存储程序配置信息的重要组成部分。在C++中，我们可以编写通用的工具类来简化配置文件的读取过程。

**正文：**

**1. 实现一个通用的配置文件读取函数**

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <map>

class ConfigUtil {
private:
    std::map<std::string, std::string> configMap;

public:
    ConfigUtil(const std::string& filepath) {
        std::ifstream configFile(filepath);
        if (configFile) {
            std::string line;
            while (std::getline(configFile, line)) {
                size_t delimiterPos = line.find('=');
                if (delimiterPos != std::string::npos) {
                    std::string key = line.substr(0, delimiterPos);
                    std::string value = line.substr(delimiterPos + 1);
                    configMap[key] = value;
                }
            }
        } else {
            throw std::runtime_error("Failed to open config file.");
        }
    }

    std::string getValue(const std::string& key) const {
        auto it = configMap.find(key);
        if (it != configMap.end()) {
            return it->second;
        } else {
            return "";
        }
    }
};
```

**2. 使用示例**

假设配置文件（config.txt）内容如下：

```
username=JohnDoe
password=secretpassword
server=127.0.0.1
port=8080
```

```cpp
int main() {
    try {
        ConfigUtil config("config.txt");

        std::string username = config.getValue("username");
        std::string password = config.getValue("password");
        std::string server = config.getValue("server");
        std::string port = config.getValue("port");

        std::cout << "Username: " << username << std::endl;
        std::cout << "Password: " << password << std::endl;
        std::cout << "Server: " << server << std::endl;
        std::cout << "Port: " << port << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Exception caught: " << e.what() << std::endl;
    }

    return 0;
}
```

**结论：**

通用工具类可以帮助我们简化许多常见的任务，例如配置文件读取。在C++中，我们可以编写这样的工具类来提高代码的可重用性和可维护性。