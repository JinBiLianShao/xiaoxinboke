title: C++中的设计模式：适配器模式
author: 连思鑫
tags:
  - c++
  - 适配器模式
categories:
  - C++中的设计模式
date: 2023-09-18 00:06:00
---
## **标题：C++中的设计模式：适配器模式**

**简介：**
适配器模式是一种常用的设计模式，它允许接口不兼容的类能够一起工作。

**正文：**

**1. 适配器模式的定义**

适配器模式有三个角色：目标接口（Target）、被适配者（Adaptee）和适配器（Adapter）。适配器将被适配者的接口转换成目标接口，使得两者能够协同工作。

```cpp
class Target {
public:
    virtual void request() = 0;
};

class Adaptee {
public:
    void specificRequest() {
        std::cout << "Specific request\n";
    }
};

class Adapter : public Target {
private:
    Adaptee* adaptee;

public:
    Adapter(Adaptee* a) : adaptee(a) {}

    void request() override {
        adaptee->specificRequest();
    }
};
```

**2. 具体实现**

```cpp
int main() {
    Adaptee adaptee;
    Adapter adapter(&adaptee);
    adapter.request();

    return 0;
}
```

**3. 对象适配器与类适配器**

在适配器模式中，有两种实现方式：对象适配器和类适配器。

对象适配器使用组合来连接目标接口与被适配者，而类适配器使用多重继承。

**4. 适配器模式的应用**

适配器模式常用于以下场景：

- 在不修改现有类的情况下，使其与其他接口协同工作。
- 将多个类的接口整合成一个统一的接口，以提供更简洁的接口。

**结论：**

适配器模式是一种常用的设计模式，它允许接口不兼容的类能够一起工作。在C++中，可以通过适配器将被适配者的接口转换成目标接口，从而实现两者的协同工作。