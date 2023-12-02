title: C++中的设计模式：桥接模式
author: 连思鑫
tags:
  - c++
  - 桥接模式
categories:
  - C++中的设计模式
date: 2023-09-18 00:17:00
---
## **标题：C++中的设计模式：桥接模式**

**简介：**
桥接模式是一种常用的设计模式，它将抽象部分与实现部分分离，使它们可以独立地变化。

**正文：**

**1. 桥接模式的定义**

桥接模式包括两个维度：Abstraction（抽象）和Implementor（实现）。抽象包含一个指向实现的指针，它定义了抽象部分的接口。实现定义了实现部分的接口。

```cpp
class Implementor {
public:
    virtual void operationImpl() = 0;
};

class ConcreteImplementorA : public Implementor {
public:
    void operationImpl() override {
        std::cout << "Concrete Implementor A\n";
    }
};

class ConcreteImplementorB : public Implementor {
public:
    void operationImpl() override {
        std::cout << "Concrete Implementor B\n";
    }
};

class Abstraction {
protected:
    Implementor* implementor;

public:
    Abstraction(Implementor* impl) : implementor(impl) {}

    virtual void operation() = 0;
};
```

**2. 具体实现**

```cpp
class RefinedAbstraction : public Abstraction {
public:
    using Abstraction::Abstraction;

    void operation() override {
        implementor->operationImpl();
    }
};
```

**3. 桥接模式的应用**

```cpp
int main() {
    ConcreteImplementorA implA;
    ConcreteImplementorB implB;

    RefinedAbstraction abstractionA(&implA);
    RefinedAbstraction abstractionB(&implB);

    abstractionA.operation();
    abstractionB.operation();

    return 0;
}
```

**4. 桥接模式的应用场景**

桥接模式常用于以下场景：

- 当一个类存在两个独立变化的维度时，可以将其分为抽象和实现两部分。
- 当一个类需要在运行时选择实现时，可以将实现作为参数传递给抽象类。

**结论：**

桥接模式是一种常用的设计模式，它将抽象部分与实现部分分离，使它们可以独立地变化。在C++中，可以通过定义抽象类和实现类来实现桥接模式。桥接模式常用于需要处理两个独立变化维度的场景。
