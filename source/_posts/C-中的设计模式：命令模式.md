title: C++中的设计模式：命令模式
author: 连思鑫
tags:
  - c++
  - 命令模式
categories:
  - C++中的设计模式
date: 2023-09-18 00:10:00
---
## **标题：C++中的设计模式：命令模式**

**简介：**
命令模式是一种常用的设计模式，它将一个请求封装成一个对象，使得可以用不同的请求对客户进行参数化。

**正文：**

**1. 命令模式的定义**

命令模式包括四个角色：Command（命令）、Receiver（接收者）、Invoker（调用者）和Client（客户端）。命令对象负责封装请求，接收者执行具体的操作，调用者发起请求，客户端创建并配置命令对象。

```cpp
class Receiver {
public:
    void action() {
        std::cout << "Receiver is performing action.\n";
    }
};

class Command {
protected:
    Receiver* receiver;

public:
    Command(Receiver* rec) : receiver(rec) {}

    virtual void execute() = 0;
};

class ConcreteCommand : public Command {
public:
    ConcreteCommand(Receiver* rec) : Command(rec) {}

    void execute() override {
        receiver->action();
    }
};

class Invoker {
private:
    Command* command;

public:
    void setCommand(Command* cmd) {
        command = cmd;
    }

    void executeCommand() {
        command->execute();
    }
};
```

**2. 具体实现**

```cpp
int main() {
    Receiver receiver;
    ConcreteCommand command(&receiver);
    Invoker invoker;

    invoker.setCommand(&command);
    invoker.executeCommand();

    return 0;
}
```

**3. 命令模式的应用**

命令模式常用于以下场景：

- 需要将请求的发送者和接收者解耦。
- 需要对请求进行排队、记录请求日志等操作。

**4. 命令模式与策略模式的比较**

命令模式与策略模式有些相似，它们都将算法封装成对象，可以在运行时动态切换。但它们的关注点不同，策略模式关注于整体算法的替换，而命令模式关注于请求的发送者和接收者的解耦。

**结论：**

命令模式是一种常用的设计模式，它将一个请求封装成一个对象，使得可以用不同的请求对客户进行参数化。在C++中，可以通过定义命令、接收者和调用者来实现命令模式。命令模式常用于需要将请求的发送者和接收者解耦的场景。