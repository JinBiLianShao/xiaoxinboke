title: C++中的文件操作和输入输出流
author: 连思鑫
tags:
  - c++
  - 文件操作
  - 输入输出流
categories:
  - c++中的那些事
  - ''
date: 2023-09-17 14:40:00
---
## **标题：C++中的文件操作和输入输出流**

**简介：**
文件操作和输入输出流是C++中处理文件和数据流的重要部分，它们允许程序读取和写入文件，进行数据的持久化存储。

**正文：**

**1. 文件读写基础**

C++提供了 `fstream` 类来进行文件的读写操作。它包括了 `ifstream`（用于读取文件）、`ofstream`（用于写入文件）和 `fstream`（可以同时读写文件）。

```cpp
#include <fstream>

std::ofstream outFile("myfile.txt");
outFile << "写入文件内容" << std::endl;
outFile.close();

std::ifstream inFile("myfile.txt");
std::string line;
while (std::getline(inFile, line)) {
    std::cout << line << std::endl;
}
inFile.close();
```

**2. 文本文件与二进制文件**

文本文件以可读的字符形式存储，可以用文本编辑器打开查看。二进制文件以二进制数据形式存储，不能直接以文本形式打开。

```cpp
// 文本文件写入
std::ofstream textFile("textfile.txt");
textFile << "Hello, Text File!" << std::endl;
textFile.close();

// 二进制文件写入
std::ofstream binaryFile("binaryfile.bin", std::ios::binary);
int data = 42;
binaryFile.write(reinterpret_cast<char*>(&data), sizeof(int));
binaryFile.close();
```

**3. 文件流的异常处理**

在文件操作中，可能会出现打开失败、写入失败等情况，可以通过异常处理来处理这些情况。

```cpp
std::ofstream file;
file.exceptions(std::ofstream::failbit | std::ofstream::badbit);
try {
    file.open("myfile.txt");
    file << "写入文件内容" << std::endl;
    file.close();
} catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << std::endl;
}
```

**4. 输入输出流操作符重载**

可以通过重载输入输出运算符 `<<` 和 `>>` 来实现自定义类型的输入输出。

```cpp
class Person {
public:
    std::string name;
    int age;
    
    friend std::ostream& operator<<(std::ostream& os, const Person& person) {
        os << "Name: " << person.name << ", Age: " << person.age;
        return os;
    }

    friend std::istream& operator>>(std::istream& is, Person& person) {
        is >> person.name >> person.age;
        return is;
    }
};
```

**结论：**

文件操作和输入输出流是C++中进行数据持久化存储的重要部分。通过使用 `fstream` 类和输入输出流操作符的重载，可以实现对文件的读写操作。
