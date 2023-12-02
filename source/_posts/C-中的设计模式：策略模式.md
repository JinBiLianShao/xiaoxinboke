title: C++中的设计模式：策略模式
author: 连思鑫
tags:
  - c++
  - 策略模式
categories:
  - C++中的设计模式
date: 2023-09-18 00:08:00
---
## **标题：C++中的设计模式：策略模式**

**简介：**
策略模式是一种常用的设计模式，它定义了一族算法，使得它们可以互相替换，使得算法的变化不会影响到使用算法的客户。

**正文：**

**1. 策略模式的定义**

策略模式包括三个角色：Context（上下文）、Strategy（策略）和具体的策略实现类。上下文包含一个指向策略的引用，可以在运行时替换具体的策略。

```cpp
class Strategy {
public:
    virtual void algorithm() = 0;
};

class ConcreteStrategyA : public Strategy {
public:
    void algorithm() override {
        std::cout << "Using Strategy A\n";
    }
};

class ConcreteStrategyB : public Strategy {
public:
    void algorithm() override {
        std::cout << "Using Strategy B\n";
    }
};

class Context {
private:
    Strategy* strategy;

public:
    Context(Strategy* s) : strategy(s) {}

    void setStrategy(Strategy* s) {
        strategy = s;
    }

    void execute() {
        strategy->algorithm();
    }
};
```

**2. 具体实现**

```cpp
int main() {
    ConcreteStrategyA strategyA;
    ConcreteStrategyB strategyB;

    Context context(&strategyA);
    context.execute();

    context.setStrategy(&strategyB);
    context.execute();

    return 0;
}
```

**3. 策略模式的应用**

策略模式常用于以下场景：

- 当一个问题有多个解决策略，且可以动态切换时。
- 当需要在不同情况下使用不同的算法时。

**4. 策略模式与工厂模式的结合**

策略模式通常与工厂模式结合使用，以便在运行时动态选择合适的策略。

```cpp
class StrategyFactory {
public:
    static Strategy* createStrategy(char type) {
        switch (type) {
            case 'A':
                return new ConcreteStrategyA();
            case 'B':
                return new ConcreteStrategyB();
            default:
                return nullptr;
        }
    }
};
```

**结论：**

策略模式是一种常用的设计模式，它定义了一族算法，使得它们可以互相替换，使得算法的变化不会影响到使用算法的客户。在C++中，可以通过定义抽象策略类和具体策略类，以及一个包含策略引用的上下文类来实现策略模式。策略模式通常与工厂模式结合使用，以便在运行时动态选择合适的策略。
