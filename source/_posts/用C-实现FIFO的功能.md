title: C++实现进程之间的通信（一）FIFO篇
author: 连思鑫
tags:
  - C++
  - 进程间通信
  - 笔记
categories:
  - 笔记
  - C++
date: 2022-03-23 21:06:00
---
# C++实现进程之间的通信（一）FIFO篇

## 一，C++ 常用进程间通信
>管道(Pipe)：管道可用于具有亲缘关系进程间的通信，允许一个进程和另一个与它有共同祖先的进程之间进行通信。

>命名管道(named pipe)：命名管道克服了管道没有名字的限制，因此，除具有管道所具有的功能外，它还允许无亲缘关系进程间的通信。命名管道在文件系统中有对应的文件名。命名管道通过命令mkfifo或系统调用mkfifo来创建。

>信号(Signal)：信号是比较复杂的通信方式，用于通知接受进程有某种事件发生，除了用于进程间通信外，进程还可以发送信号给进程本身;Linux除了支持Unix早期信号语义函数sigal外，还支持语义符合Posix.1标准的信号函数sigaction(实际上，该函数是基于BSD的，BSD为了实现可靠信号机制，又能够统一对外接口，用sigaction函数重新实现了signal函数)。

>消息(Message)队列：消息队列是消息的链接表，包括Posix消息队列system V消息队列。有足够权限的进程可以向队列中添加消息，被赋予读权限的进程则可以读走队列中的消息。消息队列克服了信号承载信息量少，管道只能承载无格式字节流以及缓冲区大小受限等缺点。

>共享内存：使得多个进程可以访问同一块内存空间，是最快的可用IPC形式。是针对其他通信机制运行效率较低而设计的。往往与其它通信机制，如信号量结合使用，来达到进程间的同步及互斥。

>信号量(semaphore)：主要作为进程间以及同一进程不同线程之间的同步手段。

>套接字(Socket)：更为一般的进程间通信机制，可用于不同机器之间的进程间通信。起初是由Unix系统的BSD分支开发出来的，但现在一般可以移植到其它类Unix系统上：Linux和System V的变种都支持套接字。

今天我们要研究的就是其中的FIFO实现进程之间的通信。

## 二、无名FIFO的实现
请看代码：

    /*
        2022-3-17
        测试无名管道实例
        作者：连思鑫
    */
    #pragma once
    #include <stdio.h>
    #include <iostream>
    #include <fcntl.h>	
    #include <stdlib.h>
    #include <sys/stat.h>
    #include <sys/types.h>
    #include <unistd.h>
    #include <string.h>

    #include "main.h"

    using namespace std;

    int main()
    {
        int _pipe[2] = { 0, 0 };
        int ret = pipe(_pipe); //创建无名管道，参数返回写和读文件操作符

        if (ret == -1)
        {
            cout << "cerate pipe fail" << endl;
            return 1;
        }

        cout << "create pipe:" << _pipe[0] << _pipe[1] << endl;

        //fork一个子进程出来
        pid_t cid = fork();
        if (cid < 0)
        {
            cout << "fork fail!" << endl;
            return 2;
        }

        //测试子进程写——>父进程读消息
        if (cid == 0)
        {
            cout << "Child Writing...." << endl;
            close(_pipe[0]);
            //发送数据到pipe
            int count = 5;
            const char* msg = "I love you !!!";
            while (count--)
            {
                write(_pipe[1], msg, strlen(msg));
                sleep(1);
            }
            close(_pipe[1]);
            exit(1); //退出子进程
        }
        else
        {
            cout << "father reading......" << endl;
            close(_pipe[1]);
            // 读取pipe数据
            char msg[1024];
            int count = 5;
            while (true)
            {
                ssize_t n = read(_pipe[0], msg, sizeof(msg) - 1);
                if (n > 0)
                {
                    msg[n] = '\0';
                    cout << "recive from chil: " << msg << endl;
                }
                else
                {
                    cout << "read emoty!" << endl;
                    break;
                }
            }

            //*等子进程结束后在退出父进程
            //if (waitpid(cid, 0, 0) != -1)
            //{
            //	cout << "child closed!" << endl;
            //}
        }
        return 0;
    }
    
## 三、管道的建立与通信的实现
直接看代码吧，我都写了注释....

发送端头文件 fifo_s.h

    #pragma once
    #include <stdio.h>
    #include <stdlib.h>
    #include <fcntl.h>
    #include <sys/stat.h>
    #include <sys/types.h>
    #include <unistd.h>
    #include <iostream>



发送端实现fifo_s.cpp

    /*
        2022-3-18
        测试有名管道fifo发送端实例
        作者：连思鑫
    */

    #include "fifo_s.h"

    using namespace std;

    int main()
    {
        string name = ".myfifo";

        //创建一个存取权限为0666的命名管道
        unlink(name.c_str());  //name.c_str()是将string类型转换成char类型，因有的函数只能打开char类型命名的文件。unlink是删除文件，删除之前会检查链接，如果有链接则不删
        int namepipo = mkfifo(name.c_str(),S_IFIFO | 0666); // mkfifo是创建管道对象

        if (namepipo == -1)
        {
            perror("mkfifo fail!\n"); //创建失败
            exit(1);
        }

        //只写的方式打开命名的管道
        int fd = open(name.c_str(), O_WRONLY); //O_WRONLY是以只写的方式打开
        // int fd = open(name.c_str(), O_RDONLY); //只读
        // int fd = open(name.c_str(), O_RDWR); //可读可写等。。。

        if (fd == -1)
        {
            perror("open fifo fail!\n");  //打开失败
            exit(2);
        }

        // 向管道发送数据
        char buf[1024]; //缓存，用于存放发送数据的
        while (1)
        {
            printf("sendto fifo:");
            //该语句整体作用：一般在printf后加，强制马上输出缓冲区的内容，防止输出错误。
            fflush(stdout); //fflush作用，清空文件缓冲区，如果文件是打开的则把缓冲区内容写入文件 ||stdout:与标准输出流关联，用于写入约定的输出。程序启动时，该流为完全缓冲当且仅当能确定流不引用交互式设备
            ssize_t n = read(0, buf, sizeof(buf) - 1); //从标准输入获得消息，读取文件，字节数大小-1,循环读取字节
            if (n > 0)
            {
                buf[n - 1] = '\0';  //过滤掉换行符
                if (write(fd, buf, n) == -1)
                {
                    perror("write fifo fail!");
                    exit(3);
                }
            }

        }
        close(fd);

        return 0;

    }

接受端头文件fifo_u.h

    #pragma once
    #include <stdio.h>
    #include <stdlib.h>
    #include <fcntl.h>
    #include <sys/stat.h>
    #include <sys/types.h>
    #include <unistd.h>
    #include <iostream>
    
接收端实现fifo_u.cpp

      /*
          2022-3-18
          测试有名管道fifo接受端实例
          作者：连思鑫
      */

      #include "fifo_u.h"

      using namespace std;

      int main()
      {
          string name = ".myfifo";

          int fd = open(name.c_str(), O_RDONLY);

          if (fd == -1)
          {
              perror("open fifo fail!");
              exit(1);
          }

          //接受管道数据
          char buf[1024];
          while (1)
          {
              ssize_t s = read(fd, buf, sizeof(buf) - 1);
              if (s >0 )
              {
                  printf("receive from fifo: %s\n", buf);
              }
              else
              {
                  perror("read fifo fail");
                  exit(2);
              }
          }
          close(fd);

          return 0;
      }

