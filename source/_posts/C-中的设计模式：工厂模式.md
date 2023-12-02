title: C++中的设计模式：工厂模式
author: 连思鑫
tags:
  - c++
  - 工厂模式
categories:
  - C++中的设计模式
date: 2023-09-18 00:00:00
---
## **标题：C++中的设计模式：工厂模式**

**简介：**
工厂模式是一种常用的设计模式，它提供了一种创建对象的接口，但允许子类决定实例化的类。

**正文：**

**1. 工厂模式的定义**

工厂模式包括三个角色：Product（产品）、ConcreteProduct（具体产品）和Factory（工厂）。工厂类负责创建产品的实例，而具体的产品类负责实现产品的具体行为。

```cpp
class Product {
public:
    virtual void operation() = 0;
};

class ConcreteProductA : public Product {
public:
    void operation() override {
        std::cout << "Product A\n";
    }
};

class ConcreteProductB : public Product {
public:
    void operation() override {
        std::cout << "Product B\n";
    }
};

class Factory {
public:
    virtual Product* createProduct() = 0;
};

class ConcreteFactoryA : public Factory {
public:
    Product* createProduct() override {
        return new ConcreteProductA();
    }
};

class ConcreteFactoryB : public Factory {
public:
    Product* createProduct() override {
        return new ConcreteProductB();
    }
};
```

**2. 具体实现**

```cpp
int main() {
    ConcreteFactoryA factoryA;
    ConcreteFactoryB factoryB;

    Product* productA = factoryA.createProduct();
    Product* productB = factoryB.createProduct();

    productA->operation();
    productB->operation();

    delete productA;
    delete productB;

    return 0;
}
```

**3. 工厂模式的应用**

工厂模式常用于以下场景：

- 当一个类不知道它必须创建的对象的类时。
- 当一个类希望将对象的创建延迟到其子类时。

**4. 工厂模式的扩展：抽象工厂模式**

抽象工厂模式提供了一种创建一系列相关或相互依赖对象的接口，而无需指定它们的具体类。

**结论：**

工厂模式是一种常用的设计模式，它提供了一种创建对象的接口，但允许子类决定实例化的类。在C++中，可以通过定义产品、具体产品和工厂来实现工厂模式。工厂模式常用于需要将对象的创建与具体业务逻辑分离的场景。
