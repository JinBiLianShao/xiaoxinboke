title: C++中的设计模式：备忘录模式
author: 连思鑫
tags:
  - c++
  - 备忘录模式
categories:
  - C++中的设计模式
date: 2023-09-18 00:10:00
---
## **标题：C++中的设计模式：备忘录模式**

**简介：**
备忘录模式是一种常用的设计模式，它允许在不破坏封装的前提下保存和恢复对象的内部状态。

**正文：**

**1. 备忘录模式的定义**

备忘录模式包括三个角色：Originator（发起人）、Memento（备忘录）和Caretaker（负责人）。发起人负责创建备忘录和恢复状态，备忘录负责保存状态，负责人负责管理备忘录。

```cpp
class Memento {
private:
    std::string state;

public:
    Memento(const std::string& s) : state(s) {}

    std::string getState() const {
        return state;
    }
};

class Originator {
private:
    std::string state;

public:
    void setState(const std::string& s) {
        state = s;
    }

    std::string getState() const {
        return state;
    }

    Memento createMemento() const {
        return Memento(state);
    }

    void restoreFromMemento(const Memento& m) {
        state = m.getState();
    }
};

class Caretaker {
private:
    Memento memento;

public:
    void saveMemento(const Memento& m) {
        memento = m;
    }

    Memento retrieveMemento() const {
        return memento;
    }
};
```

**2. 具体实现**

```cpp
int main() {
    Originator originator;
    Caretaker caretaker;

    // 设置状态并保存备忘录
    originator.setState("State 1");
    caretaker.saveMemento(originator.createMemento());

    // 修改状态
    originator.setState("State 2");

    // 恢复状态
    originator.restoreFromMemento(caretaker.retrieveMemento());
    std::cout << "Current state: " << originator.getState() << "\n";

    return 0;
}
```

**3. 备忘录模式的应用**

备忘录模式常用于以下场景：

- 需要在不破坏对象封装的前提下保存和恢复其内部状态。
- 需要提供撤销操作。

**4. C++中的标准备忘录模式**

在C++中，标准库提供了`std::memento`和`std::care_taker`来实现备忘录模式，例如`std::undoable`。

**结论：**

备忘录模式是一种常用的设计模式，它允许在不破坏封装的前提下保存和恢复对象的内部状态。在C++中，可以通过定义发起人、备忘录和负责人来实现备忘录模式。备忘录模式常用于需要提供撤销操作的场景。