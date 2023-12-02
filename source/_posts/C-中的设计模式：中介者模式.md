title: C++中的设计模式：中介者模式
author: 连思鑫
tags:
  - c++
  - 中介者模式
categories:
  - C++中的设计模式
date: 2023-09-18 00:13:00
---
## **标题：C++中的设计模式：中介者模式**

**简介：**
中介者模式是一种常用的设计模式，它通过将对象间的交互行为集中在中介者对象中来减少对象之间的直接依赖关系。

**正文：**

**1. 中介者模式的定义**

中介者模式包括两个角色：Mediator（中介者）和Colleague（同事）。中介者负责定义一个接口用于与各同事对象通信，每个同事对象都包含一个对中介者对象的引用。同事对象通过调用中介者的方法来与其他同事对象进行通信。

```cpp
class Colleague;

class Mediator {
public:
    virtual void send(const std::string& message, Colleague* colleague) = 0;
};

class Colleague {
protected:
    Mediator* mediator;

public:
    Colleague(Mediator* m) : mediator(m) {}

    virtual void receive(const std::string& message) = 0;
};
```

**2. 具体实现**

```cpp
class ConcreteMediator : public Mediator {
public:
    void send(const std::string& message, Colleague* colleague) override {
        colleague->receive(message);
    }
};

class ConcreteColleagueA : public Colleague {
public:
    using Colleague::Colleague;

    void receive(const std::string& message) override {
        std::cout << "Colleague A received: " << message << "\n";
    }

    void send(const std::string& message) {
        mediator->send(message, this);
    }
};

class ConcreteColleagueB : public Colleague {
public:
    using Colleague::Colleague;

    void receive(const std::string& message) override {
        std::cout << "Colleague B received: " << message << "\n";
    }

    void send(const std::string& message) {
        mediator->send(message, this);
    }
};
```

**3. 具体应用**

```cpp
int main() {
    ConcreteMediator mediator;
    ConcreteColleagueA colleagueA(&mediator);
    ConcreteColleagueB colleagueB(&mediator);

    colleagueA.send("Hello from Colleague A");
    colleagueB.send("Hi from Colleague B");

    return 0;
}
```

**4. 中介者模式的应用**

中介者模式常用于以下场景：

- 当对象间的交互行为变得复杂，且需要减少对象间的直接依赖关系时。
- 当一组对象之间存在相互通信，但是耦合度过高时。

**结论：**

中介者模式是一种常用的设计模式，它通过将对象间的交互行为集中在中介者对象中来减少对象之间的直接依赖关系。在C++中，可以通过定义中介者和同事的抽象类，以及具体的中介者和同事来实现中介者模式。中介者模式常用于需要减少对象之间直接依赖关系的场景。
