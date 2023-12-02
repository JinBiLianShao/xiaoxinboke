title: C++中的设计模式：状态模式
author: 连思鑫
tags:
  - c++
  - 状态模式
categories:
  - C++中的设计模式
date: 2023-09-18 00:09:00
---
## **标题：C++中的设计模式：状态模式**

**简介：**
状态模式是一种常用的设计模式，它允许一个对象在其内部状态改变时改变其行为。

**正文：**

**1. 状态模式的定义**

状态模式包括三个角色：Context（上下文）、State（状态）和具体的状态实现类。上下文包含一个指向当前状态的引用，可以在运行时改变状态。

```cpp
class State {
public:
    virtual void handle() = 0;
};

class ConcreteStateA : public State {
public:
    void handle() override {
        std::cout << "State A\n";
    }
};

class ConcreteStateB : public State {
public:
    void handle() override {
        std::cout << "State B\n";
    }
};

class Context {
private:
    State* currentState;

public:
    Context(State* initialState) : currentState(initialState) {}

    void setState(State* newState) {
        currentState = newState;
    }

    void request() {
        currentState->handle();
    }
};
```

**2. 具体实现**

```cpp
int main() {
    ConcreteStateA stateA;
    ConcreteStateB stateB;

    Context context(&stateA);
    context.request();

    context.setState(&stateB);
    context.request();

    return 0;
}
```

**3. 状态模式的应用**

状态模式常用于以下场景：

- 当一个对象的行为取决于其内部状态，并且可以在运行时动态改变状态时。
- 当一个对象需要根据其状态执行不同的操作时。

**4. 状态模式与策略模式的比较**

状态模式与策略模式有些相似，它们都允许对象在运行时改变其行为。但它们的关注点不同，策略模式关注于整体算法的替换，而状态模式关注于对象内部状态的切换。

**结论：**

状态模式是一种常用的设计模式，它允许一个对象在其内部状态改变时改变其行为。在C++中，可以通过定义抽象状态类和具体状态类，以及一个包含状态引用的上下文类来实现状态模式。状态模式可以使得对象在运行时根据内部状态改变其行为。