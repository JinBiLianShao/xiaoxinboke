title: 【嵌入式笔记1】PC端开发常用工具简介
author: 连思鑫
tags:
  - 嵌入式笔记
categories:
  - 嵌入式笔记
date: 2022-12-02 22:07:00
---
# 【嵌入式笔记1】PC端开发常用工具简介

## 一.编译环境的搭建

### 1 编译工具

编译链：目前我所接触到的编译器工具链一共有三个，Linux通用编译链，arm编译链，FT编译链（特定飞腾芯片）。

ARM芯片编译链工具如下图：
![uploaded!](/images/2022-12-2-01.png)
该工具链包含了编译该芯片程序的gcc与g++环境。

Linux通用环境下编译链（X86芯片）如下图：
![uploaded!](/images/2022-12-2-02.pmg.png)

飞腾芯片编译链工具如下图：
![uploaded!](/images/2022-12-2-03.png)
该工具链包含了编译该芯片程序的gcc与g++环境。
 
WSL：本程序中运行环境为Linux，所以程序内需要用到许多Linux的库文件。又因为虚拟机相对而言卡顿且不易于管理和操作。所以WSL的优势就体现出来了。WSL是Windows的一种Linux容器，较于虚拟机具有启动快速流畅，方便对Linux文件系统的管理，文件传输更为方便。（可以在Windows文件系统下对其进行操作）剪切板互通，可以随意粘贴和复制等等。 
![windows本地目录文件](/images/2022-12-2-04.png)
![uploaded!](/images/2022-12-2-05.png)
 
 
Clion：因为长时间使用该软件，对该软件相较于其他软件熟悉，故此使用该软件作为编译开发的IDE。该IDE配合WSL开发将会非常便捷，在windows环境下开发Linux环境的应用程序不需要导入Linux的库文件，该ide可以自己检索。
![uploaded!](/images/2022-12-2-06.png)
![uploaded!](/images/2022-12-2-07.ping.png)
针对不同编译链可以在CMake中进行指定编译。如上图，下文也会给出样例。

Cmake：该程序是用于管理和自动生成makefile的工具，对于大型项目来说，项目的体积越大，makefile的编写就越复杂，从而不利于维护和修改。而Cmake可以读入所有的源文件，自动生成makefile，且该工具具有跨平台的特性。

### 2 编译环境配置

首先导入代码或者新建Clion工程，在IDE中配置Clion的编译链。（如图，该软件会自动检测WSL中的编译环境）
![uploaded!](/images/2022-12-2-06.png)

编译链配置好后，开始编写cmakelists.text文档，有一点需要注意，在编写cmakelists.text时需要指定一下编译器。如：
~~~
#FT
set(CMAKE_C_COMPILER "/bin/aarch64-linux-gnu-gcc")
set(CMAKE_CXX_COMPILER "/bin/aarch64-linux-gnu-g++")
#arm
#set(CMAKE_C_COMPILER "/bin/arm-linux-gnueabihf-gcc")
#set(CMAKE_CXX_COMPILER "/bin/arm-linux-gnueabihf-g++")
~~~
cmakelists.text在IDE中也可以自动生成，略作修改即可。

本项目完整的cmakelists.text内容如下：
~~~
cmake_minimum_required(VERSION 3.16)
project(XiaoxinIPDetectionTool)

set(CMAKE_CXX_STANDARD 14)

FIND_PACKAGE(OpenMP REQUIRED)
if (OPENMP_FOUND)
    message("OPENMP FOUND")
    set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} ${OpenMP_C_FLAGS}")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${OpenMP_CXX_FLAGS}")
    set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} ${OpenMP_EXE_LINKER_FLAGS}")

endif ()

#FT
#set(CMAKE_C_COMPILER "/bin/aarch64-linux-gnu-gcc")
#set(CMAKE_CXX_COMPILER "/bin/aarch64-linux-gnu-g++")

#arm
#set(CMAKE_C_COMPILER "/bin/arm-linux-gnueabihf-gcc")
#set(CMAKE_CXX_COMPILER "/bin/arm-linux-gnueabihf-g++")


include_directories(.)
include_directories(PublicPackage)
......略过...ide可自动生成
include_directories(PublicPackage/Tools)

add_executable(XiaoxinIPDetectionTool
        ......可通过ide自动生成，该处略过本项目的文件树
        iner_ip.cpp
        iner_ip.h
        main.cpp
        view_ip.cpp
        view_ip.h 
        TestDataTransmission.cpp 
        TestDataTransmission.h 
        Iperf.cpp 
        Iperf.h)

~~~
完成上述步骤即可编译成执行文件。


### 3 调试/测试工具

MobaXterm：该软件极力推荐，功能很多很全。一般板卡测试都使用串口，这里视测试环境情况而定。例如54所机箱较为靠里，串口线短，笔记本无处安放，连落脚的地方都很小，所以可以将板卡拓展出来的控制网口接交换机，笔记本也接交换机通过ssh去远程控制，可以同时控制多个终端。

SSH ：先通过串口工具登入板卡的kylin系统，在系统中启动ssh服务。命令如下：

	systemctl start sshd          开启SSH服务
	syatemctl is-enabled sshd   设置开启启动ssh服务
    

其他的Linux版本开启的方法大致略同，偶有差别可百度/谷歌解决。
如果没有ssh服务，可以通过包管理器进行安装openssh.

连接ssh使用方法：打开MobaXterm，点击左上角。如图
 
![uploaded!](/images/2022-12-2-08.png)
 
在选择ssh

![uploaded!](/images/2022-12-2-09.png)
 
记住板卡的IP和用户名和登录密码输入进去
 
![uploaded!](/images/2022-12-2-10.png)
 
即可登录板卡命令终端界面。

![uploaded!](/images/2022-12-2-11.png)
 
1.当你成功连接板卡的命令终端界面后，会在窗口的左侧生成一个sftp的窗口，可以方便文件传输和软件的更新。
2.在窗口的中间时可以远程控制板卡系统的命令终端窗口。
3.在窗口的下方还有一个小栏，会生成监控板卡系统信息的内容。
注：需要注意的是，每一个ssh用户都是一个独立的用户空间，也就是说你可以在同一个IP打开多个远程窗口，这些远程窗口在进程之间互不相通。也就是你在第一个ssh窗口打开了一个程序，你在第二个窗口却无法看到它。Ps命令也无法看到它。