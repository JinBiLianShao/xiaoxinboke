title: C++中的并发编程与多线程控制
author: 连思鑫
tags:
  - c++
  - 并发编程
  - 多线程控制
categories:
  - c++中的那些事
  - ''
date: 2023-09-17 14:43:00
---
## **标题：C++中的并发编程与多线程控制**

**简介：**
并发编程允许程序同时执行多个任务，而不是按顺序一个接一个地执行。C++提供了多线程支持，使得并发编程变得容易。

**正文：**

**1. 多线程基础**

C++标准库提供了 `std::thread` 类来支持多线程编程。

```cpp
#include <thread>

void myThreadFunction() {
    // 线程执行的任务
}

int main() {
    std::thread myThread(myThreadFunction);
    myThread.join(); // 等待线程执行完毕
    return 0;
}
```

**2. 线程同步与互斥量**

在多线程环境中，需要注意共享资源的访问控制，以避免竞态条件和数据竞争。

```cpp
#include <mutex>

std::mutex mtx;

void threadSafeFunction() {
    mtx.lock(); // 加锁
    // 访问共享资源
    mtx.unlock(); // 解锁
}
```

**3. 条件变量**

条件变量用于在线程之间进行通信，允许一个线程在满足特定条件之前等待。

```cpp
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool dataReady = false;

void producer() {
    // 生产数据
    std::unique_lock<std::mutex> lock(mtx);
    dataReady = true;
    cv.notify_one();
}

void consumer() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return dataReady; });
    // 使用数据
}
```

**4. 异步任务与`std::async`**

C++11引入了 `std::async` 来支持异步任务的执行。

```cpp
#include <future>

int myTask() {
    // 执行任务
    return result;
}

int main() {
    std::future<int> fut = std::async(myTask);
    int result = fut.get(); // 获取任务结果
    return 0;
}
```

**5. 线程池**

线程池是一种管理和复用线程的机制，可以有效地管理大量的任务。

```cpp
#include <thread>
#include <vector>
#include <queue>

std::queue<std::function<void()>> taskQueue;
std::vector<std::thread> threads;

void workerThread() {
    while(true) {
        std::function<void()> task;
        {
            std::unique_lock<std::mutex> lock(mtx);
            cv.wait(lock, []{ return !taskQueue.empty(); });
            task = std::move(taskQueue.front());
            taskQueue.pop();
        }
        task();
    }
}
```

**结论：**

并发编程是现代软件开发中的重要组成部分，它可以提高程序的性能和响应能力。但同时也引入了并发控制的问题，需要谨慎处理。通过使用多线程、互斥量、条件变量等工具，可以实现安全、高效的并发编程。