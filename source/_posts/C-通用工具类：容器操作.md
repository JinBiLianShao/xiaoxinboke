title: C++通用工具类：容器操作
author: 连思鑫
tags:
  - c++
  - 容器操作
categories:
  - C++通用工具类
date: 2023-09-18 00:20:00
---
## **标题：C++通用工具类：容器操作**

**简介：**
容器操作是许多应用程序中常见的任务之一。在C++中，我们可以编写通用的工具类来简化容器的操作。

**正文：**

**1. 实现一个通用的打印容器元素函数**

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <map>

template <typename Container>
void printContainer(const Container& container) {
    for (const auto& element : container) {
        std::cout << element << " ";
    }
    std::cout << std::endl;
}
```

**2. 使用示例**

```cpp
int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    std::list<std::string> lst = {"apple", "banana", "cherry"};
    std::map<int, std::string> mp = {{1, "one"}, {2, "two"}, {3, "three"}};

    std::cout << "Vector: ";
    printContainer(vec);

    std::cout << "List: ";
    printContainer(lst);

    std::cout << "Map: ";
    printContainer(mp);

    return 0;
}
```

**3. 实现一个通用的查找元素函数**

```cpp
template <typename Container, typename T>
bool contains(const Container& container, const T& element) {
    return std::find(container.begin(), container.end(), element) != container.end();
}
```

**4. 使用示例**

```cpp
int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    int target1 = 3;
    int target2 = 6;

    if (contains(vec, target1)) {
        std::cout << "Vector contains " << target1 << std::endl;
    } else {
        std::cout << "Vector does not contain " << target1 << std::endl;
    }

    if (contains(vec, target2)) {
        std::cout << "Vector contains " << target2 << std::endl;
    } else {
        std::cout << "Vector does not contain " << target2 << std::endl;
    }

    return 0;
}
```

**结论：**

通用工具类可以帮助我们简化许多常见的任务，例如容器操作。在C++中，我们可以编写这样的工具类来提高代码的可重用性和可维护性。