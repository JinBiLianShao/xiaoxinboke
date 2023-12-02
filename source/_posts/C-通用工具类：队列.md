title: C++通用工具类：队列
author: 连思鑫
tags:
  - c++
  - 队列
categories:
  - C++通用工具类
date: 2023-09-18 21:08:00
---
## **标题：C++通用工具类：队列**

**简介：**
队列是一种常用的数据结构，它遵循先进先出（FIFO）的原则。在C++中，我们可以编写通用的工具类来实现队列的基本操作。

**正文：**

**1. 实现一个通用的队列类**

```cpp
#include <iostream>
#include <queue>

template <typename T>
class Queue {
private:
    std::queue<T> elements;

public:
    void enqueue(const T& element) {
        elements.push(element);
    }

    void dequeue() {
        if (!elements.empty()) {
            elements.pop();
        }
    }

    T front() const {
        if (!elements.empty()) {
            return elements.front();
        } else {
            throw std::runtime_error("Queue is empty.");
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
    Queue<int> intQueue;
    intQueue.enqueue(10);
    intQueue.enqueue(20);
    intQueue.enqueue(30);

    while (!intQueue.isEmpty()) {
        std::cout << intQueue.front() << " ";
        intQueue.dequeue();
    }

    std::cout << std::endl;

    Queue<std::string> stringQueue;
    stringQueue.enqueue("Hello");
    stringQueue.enqueue("World");
    stringQueue.enqueue("OpenAI");

    while (!stringQueue.isEmpty()) {
        std::cout << stringQueue.front() << " ";
        stringQueue.dequeue();
    }

    return 0;
}
```

**结论：**

通用工具类可以帮助我们简化许多常见的任务，例如实现常用的数据结构。在C++中，我们可以编写这样的工具类来提高代码的可重用性和可维护性。