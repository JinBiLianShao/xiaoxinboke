title: C++中的模板元编程和泛型编程
author: 连思鑫
tags:
  - c++
  - 模板元编程
  - 泛型编程
categories:
  - c++中的那些事
  - ''
date: 2023-09-17 14:34:00
---
## **标题：C++中的模板元编程和泛型编程**

**简介：**
模板元编程（Template Metaprogramming, TMP）和泛型编程（Generic Programming）是C++中强大的编程技巧，它们允许在编译时进行高度抽象和代码生成。

**正文：**

**1. 模板基础**

模板是一种通用的代码容器，可以用于生成特定类型或值的代码。它可以用于函数、类和变量。

```cpp
template <typename T>
T add(T a, T b) {
    return a + b;
}
```

**2. 模板特化**

模板特化允许为特定的类型提供定制的实现。

```cpp
template <>
int add<int>(int a, int b) {
    return a + b + 10; // 为整数类型提供特殊实现
}
```

**3. 模板元编程**

模板元编程是一种在编译时生成代码的技术，通过递归展开模板实例来实现。

```cpp
template <int N>
struct Factorial {
    static const int value = N * Factorial<N - 1>::value;
};

template <>
struct Factorial<0> {
    static const int value = 1;
};
```

**4. 可变模板参数**

C++11引入了可变模板参数，允许模板接受可变数量的参数。

```cpp
template <typename... Args>
void print(Args... args) {
    (cout << ... << args) << endl;
}
```

**5. 泛型算法**

STL（Standard Template Library）提供了许多泛型算法，它们可以用于不同类型的容器。

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};
std::for_each(vec.begin(), vec.end(), [](int& n){ cout << n << " "; });
```

**结论：**

模板元编程和泛型编程是C++中的高级技术，它们允许在编译时进行高度抽象和代码生成。模板提供了一种通用的代码容器，使得代码可以适用于不同的类型和值。