title: C++中的多态讲解与示例
author: 连思鑫
tags:
  - C++
  - 多态的概念
categories:
  - C++
date: 2023-02-23 10:38:00
---
# C++中的多态讲解与示例


在 C++ 中，多态是指同一个函数名可以具有不同的实现方式和行为的特性。这意味着，同一个函数名可以在不同的情况下具有不同的含义，以实现更灵活的编程。

C++ 中的多态分为静态多态和动态多态两种形式。静态多态又称为函数重载（Function Overloading），通过在同一个作用域内声明具有相同函数名但参数列表不同的多个函数，实现了同一个函数名可以具有多种不同的实现方式。

动态多态则是通过虚函数（Virtual Function）和继承（Inheritance）来实现的。在父类中定义虚函数，在子类中覆盖（Override）这个虚函数，从而实现了同一个函数名在不同子类对象上具有不同的行为。

下面是一个简单的例子来说明动态多态的概念：


```cpp
#include <iostream>

using namespace std;

class Shape {
   protected:
      int width, height;

   public:
      Shape(int a = 0, int b = 0) {
         width = a;
         height = b;
      }

      virtual int area() {
         cout << "Parent class area :" << endl;
         return 0;
      }
};

class Rectangle: public Shape {
   public:
      Rectangle(int a = 0, int b = 0):Shape(a, b) { }

      int area () {
         cout << "Rectangle class area :" << endl;
         return (width * height);
      }
};

class Triangle: public Shape {
   public:
      Triangle(int a = 0, int b = 0):Shape(a, b) { }

      int area () {
         cout << "Triangle class area :" << endl;
         return (width * height / 2);
      }
};

int main() {
   Shape *shape;
   Rectangle rec(10,7);
   Triangle  tri(10,5);

   // 矩形对象
   shape = &rec;
   // 调用矩形的求面积函数 area
   shape->area();

   // 三角形对象
   shape = &tri;
   // 调用三角形的求面积函数 area
   shape->area();

   return 0;
}
```

在上面的例子中，我们定义了一个 Shape 类作为父类，然后定义了 Rectangle 和 Triangle 类作为子类。在 Shape 类中定义了一个虚函数 area，Rectangle 和 Triangle 类都重写了这个虚函数并提供了不同的实现。

在 main 函数中，我们定义了一个指向 Shape 类的指针，然后将它分别指向 Rectangle 和 Triangle 类的对象，并调用它们的 area 函数。由于 area 函数是虚函数，所以在运行时会根据指针指向的对象类型来确定具体调用哪个子类的 area 函数。这就实现了多态。


静态多态可以通过函数重载实现。函数重载指的是在同一作用域内，函数名相同但参数列表不同的函数。编译器根据传入的参数类型和数量确定使用哪个函数。例如：


```cpp
#include <iostream>

void print(int x) {
    std::cout << "Printing an integer: " << x << std::endl;
}

void print(double x) {
    std::cout << "Printing a double: " << x << std::endl;
}

int main() {
    print(42);
    print(3.14);
    return 0;
}
```

在上面的例子中，我们定义了两个名为`print`的函数，分别接受`int`和`double`类型的参数。在`main`函数中，我们分别调用了这两个函数并传入了不同类型的参数，编译器会根据参数类型的不同自动选择使用对应的函数。这就是静态多态的一个例子。