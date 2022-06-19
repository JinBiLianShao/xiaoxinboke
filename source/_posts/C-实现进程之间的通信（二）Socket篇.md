title: C++实现进程之间的通信（二）Socket篇
author: 连思鑫
tags:
  - C++
  - 笔记
  - 进程间通信
categories:
  - C++
  - 笔记
date: 2022-03-24 21:47:00
---
# C++实现进程之间的通信（二）Socket篇

## Socket简介

80年代初，人们在UNIX操作系统下实现TCP/IP协议。

研究人员为TCP/IP网络通信开发了一个API（应用程序接口）。

这个API称为Socket接口（套接字）。

SOCKET接口是TCP/IP网络最为通用的API，也是在INTERNET上进行应用开发最为通用的API。

90年代初，Microsoft联合了其他几家公司共同制定了一套WINDOWS下的网络编程接口，即WindowsSockets规范。


## Socket的机制是什么

简单的把Socket理解为一个可以连通网络上不同计算机程序之间的管道，把一堆数据从管道的A端扔进去，则会从管道的B端（也许同时还可以从C、D、E、F……端冒出来）。

管道的端口由两个因素来唯一确认，即机器的IP地址和程序所使用的端口号。

端口号就是程序员指定的一个数字，如：http的80端口和ftp的21端口。

建议大家自己写程序不要使用太小的端口号，它们一般被系统占用了，也不要使用一些著名的端口，一般来说使用1000~5000之内的端口比较好。

Socket可以支持数据的发送和接收

它定义一种称为套接字的变量，发送数据时首先创建套接字，然后使用该套接字的sendto等方法对准某个IP/端口进行数据发送

接收端也首先创建套接字，然后将该套接字绑定到一个IP/端口上，所有发向此端口的数据会被该套接字的recv等函数读出。如同读出文件中的数据一样。

 所需的头文件、库文件和DLL

最广泛的Windows Socket2.0版本，所需的一些文件如下（以安装了VC6为例说明其物理位置）：

（1）头文件winsock2.h，通常处于C:“Program Files”Microsoft Visual Studio“VC98”INCLUDE；查看该头文件可知其中又包含了windows.h和pshpack4.h头文件，因此在windows中的一些常用API都可以使用

（2）库文件Ws2_32.lib，通常处于C:"Program Files"Microsoft Visual Studio"VC98"Lib；

（3）DLL文件Ws2_32.dll，通常处于C:"WINDOWS"system32。

 编写Socket程序需要的编程基础

（1）C++语法；

（2）一点windows SDK的基础，了解一些SDK的数据类型与API的调用方式；

（3）一点编译、链接和执行的技术。

增加了一些异步函数，并增加了符合Windows消息驱动特性的网络事件异步选择机制。

WINDOWSSOCKETS规范是一套开放的、支持多种协议的Windows下的网络编程接口。

从1991年的1.0版到1995年的2.0.8版，经过不断完善并在Intel、Microsoft、Sun、SGI、Informix、Novell等公司的全力支持下，已成为Windows网络编程的事实上的标准。

在实际应用中的WINDOWSSOKCETS规范主要有1.1版和2.0版。

两者的最重要区别是1.1版只支持TCP/IP协议，而2.0版可以支持多协议。

2.0版有良好的向后兼容性，任何使用1.1版的源代码，二进制文件，应用程序都可以不加修改地在2.0规范下使用。

SOCKET实际在计算机中提供了一个通信端口，可以通过这个端口与任何一个具有SOCKET接口的计算机通信。

应用程序在网络上传输，接收的信息都通过这个SOCKET接口来实现。

在应用开发中就像使用文件句柄一样，可以对SOCKET句柄进行读，写操作。

## UDP

所谓UDP，就是发送出去就不管的一种网络协议。

UDP编程的发送端只管发送就可以了，不用检查网络连接状态。

下面用例1来说明怎样编写UDP，并会详细解释每个API和数据类型。

SOCKET类型

SOCKET是socket套接字类型，在WINSOCK2.H中有如下定义：

      typedef unsigned int    u_int;

      typedef u_int           SOCKET;

可知套接字实际上就是一个无符号整型，它将被Socket环境管理和使用。

套接字将被创建、设置、用来发送和接收数据，最后会被关闭。

WORD类型、MAKEWORD、LOBYTE和HIBYTE宏

WORD类型是一个16位的无符号整型，在WTYPES.H中被定义为：

    typedef unsigned short WORD;

目的是提供两个字节的存储，在Socket中这两个字节可以表示主版本号和副版本号。

使用MAKEWORD宏可以给一个WORD类型赋值。例如要表示主版本号2，副版本号0，可以使用以下代码：

    WORD wVersionRequested;

    wVersionRequested = MAKEWORD( 2, 0 ); 

注意低位内存存储主版本号2，高位内存存储副版本号0，其值为0x0002。使用宏LOBYTE可以读取WORD的低位字节，HIBYTE可以读取高位字节。

话不多说，上项目吧~

# 套字节实现通信

本实现的环境是建立在linux上，如需Windows下实现，请给予其库文件以及DLL文件。

套字节（socket）服务端实例 socket.h


    #pragma once
    #include <iostream>
    #include <string>
    #include <sys/socket.h>
    #include <cstdio>
    #include <cstdlib>
    #include <unistd.h>
    #include <sys/types.h>
    #include <arpa/inet.h>
    #include <cerrno>
    #include <netinet/in.h>
    #include <string.h>

    //监听8000端口
    #define PORT 8000 
    #define MAXLINE 4096



    class socket_s
    {
    };
    
套字节（socket）服务端实例 socket.cpp

    /*
        2022-3-18
        测试套字节（socket）服务端实例
        作者：连思鑫
    */
    #include "socket_s.h"


    using namespace std;

    int main()
    {
        //这是服务器
        cout << "this is server" << endl;


        //socket
        //初始化socket，并检测是都成功
        int listenfd = socket(AF_INET, SOCK_STREAM, 0);
        if (listenfd == -1)
        {
            perror("socket fail");
            exit(1);
        }

        //bind
        //绑定socket

        struct sockaddr_in addr;
        addr.sin_family = AF_INET;
        addr.sin_port = htons(PORT);
        addr.sin_addr.s_addr = INADDR_ANY;

        //判断绑定是否失败
        if (bind(listenfd,(struct sockaddr*)&addr, sizeof(addr)) == -1)
        {
            perror("bind fail");
            exit(2);
        }

        //listen
        //监听
        if (listen(listenfd, 5) == -1)
        {
            perror("linsten fail");
            exit(3);
        }

        //accept
        //接收客户端数据
        int conn;
        char clientIP[INET_ADDRSTRLEN] = "";
        struct sockaddr_in clientAddr;
        socklen_t clientAddrLen = sizeof(clientAddr);
        while (1)
        {
            cout << ".....listening" << endl;
            conn = accept(listenfd, (struct sockaddr*)&clientAddr, &clientAddrLen);
            if (conn < 0)
            {
                perror("accept fail");
                exit(4);
            }
            inet_ntop(AF_INET, &clientAddr.sin_addr, clientIP, INET_ADDRSTRLEN);
            cout << ".......connect" << clientIP << ":" << ntohs(clientAddr.sin_port) << endl;

            char buf[1024];
            while (true)
            {
                memset(buf, 0, sizeof(buf));
                //接受数据
                int len = recv(conn, buf, sizeof(buf), 0);
                buf[len] = '\0';
                if (strcmp(buf, "exit") == 0)
                {
                    cout << ".......disconnect" << clientIP << ":" << ntohs(clientAddr.sin_port) << endl;
                    break;
                }
                cout << buf << endl;
                //发送数据
                send(conn, buf, len, 0);
            }

            close(conn);
        }

        close(listenfd);
        return 0;

    }


套字节（socket）用户端实例 socket_u.h

    #pragma once
    #include <iostream>
    #include <sys/socket.h>
    #include <cstdio>
    #include <cstdlib>
    #include <unistd.h>
    #include <sys/types.h>
    #include <arpa/inet.h>
    #include <cerrno>
    #include <netinet/in.h>
    #include <string.h>

    //监听8000端口
    #define PORT 8000 
    #define MAXLINE 4096



    class socket_u
    {
    };



套字节（socket）用户端实例 socket_u.cpp


    /*
        2022-3-18
        测试套字节（socket）用户端实例
        作者：连思鑫
    */

    #include "socket_u.h"
    #include <iostream>

    using namespace std;

    int main()
    {
        //这是客户端
        cout << "this is user" << endl;


        //socket
        //初始化socket，并检测是都成功
        int ulient = socket(AF_INET, SOCK_STREAM, 0);
        if (ulient == -1)
        {
            perror("socket fail");
            exit(1);
        }

        //connect
        struct sockaddr_in serverAddr;
        serverAddr.sin_family = AF_INET;
        serverAddr.sin_port = htons(PORT);
        serverAddr.sin_addr.s_addr = inet_addr("127.0.0.1");
        if (connect(ulient, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) < 0)
        {
            cout << "connect fail" << endl;
            exit(2);
        }
        cout << ".....connect" << endl;
        char data[1024];
        char buf[1024];
        while (true)
        {
            cin >> data;
            send(ulient, data, strlen(data), 0);
            if (strcmp(data, "exit") == 0)
            {
                cout << "......disconnect" << endl;
                break;
            }
            memset(buf, 0, sizeof(buf));
            int len = recv(ulient, buf, sizeof(buf), 0);
            buf[len] = '\0';
            cout << buf << endl;
        }
        close(ulient);
        return 0;
    }

结束over~
