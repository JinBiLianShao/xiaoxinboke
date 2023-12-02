title: C++通用工具类：栈
author: 连思鑫
tags:
  - c++
  - 栈
categories:
  - C++通用工具类
date: 2023-09-18 21:05:00
---
## **标题：C++通用工具类：栈**

**简介：**
栈是一种常用的数据结构，它遵循后进先出（LIFO）的原则。在C++中，我们可以编写通用的工具类来实现栈的基本操作。

**正文：**

**1. 实现一个通用的栈类**

```cpp
#include <iostream>
#include <vector>

template <typename T>
class Stack {
private:
    std::vector<T> elements;

public:
    void push(const T& element) {
        elements.push_back(element);
    }

    void pop() {
        if (!elements.empty()) {
            elements.pop_back();
        }
    }

    T top() const {
        if (!elements.empty()) {
            return elements.back();
        } else {
            throw std::runtime_error("Stack is empty.");
        }
    }

    bool isEmpty() const {
        return elements.empty();
    }
};
```

**2. 使用示例**

```cpp
int main() {
    Stack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    intStack.push(30);

    while (!intStack.isEmpty()) {
        std::cout << intStack.top() << " ";
        intStack.pop();
    }

    std::cout << std::endl;

    Stack<std::string> stringStack;
    stringStack.push("Hello");
    stringStack.push("World");
    stringStack.push("OpenAI");

    while (!stringStack.isEmpty()) {
        std::cout << stringStack.top() << " ";
        stringStack.pop();
    }

    return 0;
}
```

**结论：**

通用工具类可以帮助我们简化许多常见的任务，例如实现常用的数据结构。在C++中，我们可以编写这样的工具类来提高代码的可重用性和可维护性。
