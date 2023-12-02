title: C++中的设计模式：组合模式
author: 连思鑫
tags:
  - c++
  - 组合模式
categories:
  - C++中的设计模式
date: 2023-09-18 00:12:00
---
## **标题：C++中的设计模式：组合模式**

**简介：**
组合模式是一种常用的设计模式，它允许将对象组合成树形结构以表示"部分-整体"的层次结构。

**正文：**

**1. 组合模式的定义**

组合模式包括三个角色：Component（组件）、Leaf（叶子节点）和Composite（复合节点）。组件是所有节点的抽象类，它可以包含叶子节点或复合节点。叶子节点表示树的最终节点，它不能包含其他节点。复合节点包含其他节点，可以是叶子节点或其他复合节点。

```cpp
class Component {
public:
    virtual void operation() = 0;
    virtual void add(Component* c) {}
    virtual void remove(Component* c) {}
    virtual Component* getChild(int index) { return nullptr; }
};

class Leaf : public Component {
public:
    void operation() override {
        std::cout << "Leaf operation\n";
    }
};

class Composite : public Component {
private:
    std::vector<Component*> children;

public:
    void operation() override {
        std::cout << "Composite operation\n";
        for (Component* c : children) {
            c->operation();
        }
    }

    void add(Component* c) override {
        children.push_back(c);
    }

    void remove(Component* c) override {
        auto it = std::find(children.begin(), children.end(), c);
        if (it != children.end()) {
            children.erase(it);
        }
    }

    Component* getChild(int index) override {
        if (index >= 0 && index < children.size()) {
            return children[index];
        }
        return nullptr;
    }
};
```

**2. 具体实现**

```cpp
int main() {
    Leaf leaf1, leaf2, leaf3;
    Composite composite1, composite2;

    composite1.add(&leaf1);
    composite1.add(&leaf2);

    composite2.add(&composite1);
    composite2.add(&leaf3);

    composite2.operation();

    return 0;
}
```

**3. 组合模式的应用**

组合模式常用于以下场景：

- 当需要表示对象的"部分-整体"层次结构时。
- 当希望用户忽略叶子节点和复合节点之间的差异时。

**4. 组合模式与访问者模式的结合**

组合模式通常与访问者模式结合使用，以便在对复杂对象结构进行操作时能够轻松地扩展功能。

**结论：**

组合模式是一种常用的设计模式，它允许将对象组合成树形结构以表示"部分-整体"的层次结构。在C++中，可以通过定义组件、叶子节点和复合节点的抽象类，以及具体的组件、叶子节点和复合节点来实现组合模式。组合模式常用于需要表示对象的层次结构的场景。