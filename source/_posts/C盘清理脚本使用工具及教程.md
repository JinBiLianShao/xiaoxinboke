title: C盘清理脚本使用工具及教程
author: 连思鑫
date: 2021-12-01 17:30:40
tags:
---
# C盘清理工具及使用教程

## 起因
好多人找我说电脑C盘快满了，电脑变卡了，来找我帮忙清理一下C盘。

C盘是电脑的系统盘，有许多重要的系统文件，没技术和经验的千万不要乱删。因为你的一个不留神，轻则一些软件打不开，重则直接开不了机。

C盘的清理又是一个非常麻烦的工作，你要一个个去分析判断这个文件能不能删。而且垃圾文件又不是统一存放在一个位置上，所以你还要一个个的去找。

所以，开发一个批量的清理脚本的念头便诞生了。

## C盘清理脚本
bat文件是批处理处理文件，在dos下的可执行脚本文件。我们去分析C盘里哪些是垃圾文件，例如.tpm、.log等后缀的都是可有可无的缓存文件和日志文件，是可以删除的，从而减轻C盘的容量负担。

脚本如下：

    @echo off

    echo Cleaning up system junk files, please wait ......

    del /f /s /q %systemdrive%\*.tmp

    del /f /s /q %systemdrive%\*._mp       

    del /f /s /q %systemdrive%\*.log

    del /f /s /q %systemdrive%\*.gid         

    del /f /s /q %systemdrive%\*.chk

    del /f /s /q %systemdrive%\*.old         

    del /f /s /q %systemdrive%\recycled\*.*

    del /f /s /q %windir%\*.bak                  

    del /f /s /q %windir%\prefetch\*.*

    rd /s /q %windir%\temp & md %windir%\temp

    del /f /q %userprofile%\cookies\*.*       

    del /f /q %userprofile%\recent\*.*

    del /f /s /q "%userprofile%\Local Settings\Temporary Internet Files\*.*"

    del /f /s /q "%userprofile%\Local Settings\Temp\*.*"    

    del /f /s /q "%userprofile%\recent\*.*"

    echo Cleaning system garbage complete!     

    echo. & pause 
    

 
 ## 使用教程
 
1.在电脑桌面新建一个文本文档
 
![upload successful](/images/2021-12-1-001.png)

2.复制上面我写的代码到你新建的文本文档中。

![upload successful](/images/2021-12-1-002.png)

3.更改文件名为C盘清理脚本.bat。注：后缀 **.txt** 一定要改成 **.bat**。
 
![upload successful](/images/2021-12-1-003.png)

4.右击以管理员身份运行即可

![overwrote existing file](/images/2021-12-1-004.png)


**注：一定要以管理员身份运行，不然有的目录没有权限，清理不彻底！**