title: C++中的设计模式：观察者模式
author: 连思鑫
tags:
  - c++
  - 观察者模式
categories:
  - C++中的设计模式
date: 2023-09-18 00:03:00
---
## **标题：C++中的设计模式：观察者模式**

**简介：**
观察者模式是一种常用的设计模式，它定义了对象之间的一对多依赖关系，当一个对象状态发生改变时，所有依赖于它的对象都会得到通知并自动更新。

**正文：**

**1. 观察者模式的定义**

观察者模式包括两个角色：Subject（主题）和Observer（观察者）。主题维护一组观察者，并提供方法用于添加、移除和通知观察者。观察者定义了一个更新方法，用于在接收到通知时更新自身状态。

```cpp
class Observer;

class Subject {
private:
    std::vector<Observer*> observers;

public:
    void addObserver(Observer* obs) {
        observers.push_back(obs);
    }

    void removeObserver(Observer* obs) {
        auto it = std::find(observers.begin(), observers.end(), obs);
        if (it != observers.end()) {
            observers.erase(it);
        }
    }

    void notifyObservers() {
        for (Observer* obs : observers) {
            obs->update();
        }
    }
};

class Observer {
public:
    virtual void update() = 0;
};
```

**2. 具体实现**

```cpp
class ConcreteObserverA : public Observer {
public:
    void update() override {
        std::cout << "ConcreteObserverA received update\n";
    }
};

class ConcreteObserverB : public Observer {
public:
    void update() override {
        std::cout << "ConcreteObserverB received update\n";
    }
}
```

**3. 观察者模式的应用**

观察者模式常用于以下场景：

- 当一个对象的状态发生改变时，需要通知其他对象进行相应的更新。
- 当一个对象需要将自身的变化通知给一组对象时。

**4. C++中的标准观察者模式**

在C++中，标准库提供了`std::observable`和`std::observer`来实现观察者模式，例如`std::vector`和`std::function`。

**结论：**

观察者模式是一种常用的设计模式，它定义了对象之间的一对多依赖关系，当一个对象状态发生改变时，所有依赖于它的对象都会得到通知并自动更新。在C++中，可以通过定义主题和观察者的抽象类，以及具体的主题和观察者来实现观察者模式。观察者模式常用于需要将对象的变化通知给一组对象的场景。