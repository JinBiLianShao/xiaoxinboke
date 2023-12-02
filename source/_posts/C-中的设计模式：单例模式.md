title: C++中的设计模式：单例模式
author: 连思鑫
tags:
  - c++
  - 单例模式
categories:
  - C++中的设计模式
date: 2023-09-17 23:59:00
---
## **标题：C++中的设计模式：单例模式**

**简介：**
单例模式是一种常用的设计模式，它确保一个类只有一个实例，并提供一个全局访问点。

**正文：**

**1. 单例模式的定义**

单例模式保证一个类只有一个实例，并提供一个访问该实例的全局入口。

```cpp
class Singleton {
private:
    static Singleton* instance;
    Singleton() {} // 私有构造函数

public:
    static Singleton* getInstance() {
        if (!instance) {
            instance = new Singleton();
        }
        return instance;
    }
};
```

**2. 单例模式的实现**

```cpp
Singleton* Singleton::instance = nullptr; // 静态成员变量需要在类外初始化

int main() {
    Singleton* obj1 = Singleton::getInstance();
    Singleton* obj2 = Singleton::getInstance();

    if (obj1 == obj2) {
        std::cout << "obj1 and obj2 are the same instance\n";
    } else {
        std::cout << "obj1 and obj2 are different instances\n";
    }

    return 0;
}
```

**3. 单例模式的应用**

单例模式常用于以下场景：

- 当一个类只能有一个实例，并且需要在全局范围内提供访问点时。
- 当需要控制资源的分配，以避免多次创建相同对象时。

**4. 单例模式的线程安全实现**

```cpp
class Singleton {
private:
    static Singleton* instance;
    Singleton() {}

public:
    static Singleton* getInstance() {
        if (!instance) {
            std::lock_guard<std::mutex> lock(mutex); // 加锁
            if (!instance) {
                instance = new Singleton();
            }
        }
        return instance;
    }

    static std::mutex mutex; // 互斥锁
};

Singleton* Singleton::instance = nullptr;
std::mutex Singleton::mutex;
```

**结论：**

单例模式是一种常用的设计模式，它确保一个类只有一个实例，并提供一个全局访问点。在C++中，可以通过将构造函数私有化、提供一个静态成员变量以及一个静态方法来实现单例模式。单例模式常用于需要确保只有一个实例存在的场景。