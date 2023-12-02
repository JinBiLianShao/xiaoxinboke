title: C++中的面向对象编程基础
author: 连思鑫
tags:
  - C++
  - 面向对象基础
categories:
  - c++中的那些事
  - ''
date: 2023-09-17 14:31:00
---
## **标题：C++中的面向对象编程基础**

**简介：**
面向对象编程（Object-Oriented Programming, OOP）是软件开发中一个重要的编程范式，它以对象为核心，通过封装、继承和多态等概念来组织代码，提高了代码的重用性和可维护性。

**正文：**

**1. 类与对象**

在C++中，类是面向对象编程的基础。一个类是一个模板，用于创建具有相似属性和行为的对象。对象是类的实例，它包含了类定义的数据和函数。

```cpp
class Person {
    // 成员变量
    string name;
    int age;

public:
    // 构造函数
    Person(string n, int a) : name(n), age(a) {}

    // 成员函数
    void introduce() {
        cout << "我叫" << name << "，今年" << age << "岁。" << endl;
    }
};
```

**2. 封装**

封装是OOP的一个重要概念，它将数据和操作数据的方法捆绑在一起。类通过将成员变量和成员函数定义在同一个作用域内来实现封装。

```cpp
class BankAccount {
private:
    double balance;

public:
    void deposit(double amount) {
        balance += amount;
    }

    void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
        } else {
            cout << "余额不足。" << endl;
        }
    }
};
```

**3. 继承**

继承允许一个类（子类）继承另一个类（父类）的属性和行为。子类可以添加新的成员变量和成员函数，也可以重写父类的成员函数。

```cpp
class Student : public Person {
private:
    string major;

public:
    Student(string n, int a, string m) : Person(n, a), major(m) {}

    void introduce() {
        cout << "我叫" << name << "，今年" << age << "岁，专业是" << major << "。" << endl;
    }
};
```

**4. 多态**

多态允许使用相同的接口来处理不同类型的对象。在C++中，可以通过虚函数（virtual function）实现多态。

```cpp
class Shape {
public:
    virtual void draw() {
        cout << "绘制形状。" << endl;
    }
};

class Circle : public Shape {
public:
    void draw() override {
        cout << "绘制圆形。" << endl;
    }
};
```

**结论：**

面向对象编程是C++中的重要特性，它提供了一种结构化和灵活的方式来组织和管理代码。通过封装、继承和多态等概念，我们可以构建出模块化、可扩展和易维护的程序。