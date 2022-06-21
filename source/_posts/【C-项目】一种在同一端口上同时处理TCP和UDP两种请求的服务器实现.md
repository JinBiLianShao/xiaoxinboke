title: 【C++项目】一种在同端口上同时处理TCP和UDP的服务器实现
author: 连思鑫
tags:
  - c++项目
  - server
  - 服务器
categories:
  - C++项目
date: 2022-06-19 18:01:00
---
## 一种在同一端口上同时处理TCP和UDP两种请求的服务器实现

服务器实现代码:

server.cpp
```c++
/*
	2022-6-19
	一种在同端口上同时处理TCP和UDP的服务器实现
	作者：连思鑫
*/

#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <assert.h>
#include <stdlib.h>
#include <pthread.h>
#include <fcntl.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/epoll.h>
#include <iostream>

using namespace std;

/// 在同一端口上同时处理TCP和UDP两种请求
#define MAX_EVENT_NUMBER 1024
#define TCP_BUFFER_SIZE  512
#define UDP_BUFFER_SIZE  (1024*4)
#define EFFECT_TEST  "Server received!!"

int setnonblocking(int fd)
{
    int old_option = fcntl(fd, F_GETFL);
    int new_option = old_option | O_NONBLOCK;
    fcntl(fd, F_SETFL, new_option);
    return old_option;
}

void addfd(int epollfd, int fd)
{
    epoll_event event;
    event.data.fd = fd;
    //event.events = EPOLLIN | EPOLLET;
    event.events = EPOLLIN;
    epoll_ctl(epollfd, EPOLL_CTL_ADD, fd, &event);
    setnonblocking(fd);
}

int main(int argc, char* argv[])
{
    if(argc <= 2)
    {
        printf("usage: %s ip_address port_number\n", basename(argv[0]));
        return 1;
    }
    const char* ip = argv[1];
    int port = atoi(argv[2]);

    int ret = 0;

    // 创建TCP Socket，绑定到端口port
    struct sockaddr_in address;
    bzero(&address, sizeof(address));
    address.sin_family = AF_INET;
    inet_pton(AF_INET, ip, &address.sin_addr);
    address.sin_port = htons(port);
    int listenfd = socket(PF_INET, SOCK_STREAM, 0);
    assert(listenfd >= 0);
    ret = bind(listenfd, (struct sockaddr*)&address, sizeof(address));
    assert(ret != -1);
    ret = listen(listenfd, 5);
    assert(ret != -1);

    // 创建UDP Socket，绑定到同样端口
    bzero(&address, sizeof(address));
    address.sin_family = AF_INET;
    inet_pton(AF_INET, ip, &address.sin_addr);
    address.sin_port = htons(port);
    int udpfd = socket(PF_INET, SOCK_DGRAM, 0);
    assert(udpfd >= 0);
    ret = bind(udpfd, (struct sockaddr*)&address, sizeof(address));
    assert(ret != -1);

    int epollfd = epoll_create(5);
    assert(epollfd != -1);

    // 分别注册TCP和UDP socket的可读事件到epoll上
    addfd(epollfd, listenfd);
    addfd(epollfd, udpfd);

    epoll_event events[ MAX_EVENT_NUMBER ];
    while(1)
    {
        int number = epoll_wait(epollfd, events, MAX_EVENT_NUMBER, -1);
        if (number < 0)
        {
            printf("epoll failure\n");
            break;
        }

        for (int i = 0; i < number; i++)
        {
            int sockfd = events[i].data.fd;
            if (sockfd == listenfd)
            {
                struct sockaddr_in client_address;
                socklen_t client_addrlength = sizeof(client_address);
                int connfd = accept(listenfd, (struct sockaddr*)&client_address, &client_addrlength);
                addfd(epollfd, connfd);
            }
            else if (sockfd == udpfd)
            {
                char buf[ UDP_BUFFER_SIZE ];
                memset(buf, '\0', UDP_BUFFER_SIZE);
                struct sockaddr_in client_address;
                socklen_t client_addrlength = sizeof(client_address);

                ret = recvfrom(udpfd, buf, UDP_BUFFER_SIZE-1, 0, (struct sockaddr*)&client_address, &client_addrlength);
                if(ret > 0)
                {
                    cout << "this is UDP:" << buf << endl;
                    //sendto(udpfd, buf, UDP_BUFFER_SIZE-1, 0, (struct sockaddr*)&client_address, client_addrlength);
                    sendto(udpfd, EFFECT_TEST, UDP_BUFFER_SIZE-1, 0, (struct sockaddr*)&client_address, client_addrlength);
                }
            }
            else if (events[i].events & EPOLLIN)
            {
                char buf[ TCP_BUFFER_SIZE ];
                while(1)
                {
                    memset(buf, '\0', TCP_BUFFER_SIZE);
                    ret = recv(sockfd, buf, TCP_BUFFER_SIZE-1, 0);
                    if(ret < 0)
                    {
                        if((errno == EAGAIN) || (errno == EWOULDBLOCK))
                        {
                            break;
                        }
                        close(sockfd);
                        break;
                    }
                    else if(ret == 0)
                    {
                        close(sockfd);
                    }
                    else
                    {
                        cout << "this is TCP:" << buf << endl;
                        send(sockfd, EFFECT_TEST, sizeof(EFFECT_TEST), 0);
                    }
                }
            }
            else
            {
                printf("something else happened \n");
            }
        }
    }

    close(listenfd);
    return 0;
}

```

测试代码：
client_tcp.cpp
```c++
/*
	2022-6-19
	测试套字节（socket）用户端实例（tcp）
	作者：连思鑫
*/

#include "socket_u.h"
#include <iostream>

using namespace std;

int main(int argc, char* argv[])
{
    if(argc <= 2)
    {
        printf("usage: %s ip_address port_number\n", basename(argv[0]));
        return 1;
    }
    const char* ip = argv[1];
    int port = atoi(argv[2]);
	//这是客户端
	cout << "this is user" << endl;


	//socket
	//初始化socket，并检测是都成功
	int ulient = socket(AF_INET, SOCK_STREAM, 0); //tcp
    //int ulient = socket(AF_INET, SOCK_DGRAM, 0); //udp
	if (ulient == -1)
	{
		perror("socket fail");
		exit(1);
	}

	//connect
	struct sockaddr_in serverAddr;
	serverAddr.sin_family = AF_INET;
	serverAddr.sin_port = htons(port);
	serverAddr.sin_addr.s_addr = inet_addr(ip);
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
```

client_udp.cpp
```c++
/*
	2022-6-19
	测试套字节（socket）用户端实例（udp）
	作者：连思鑫
*/

#include "socket_u.h"
#include <iostream>

using namespace std;

int main(int argc, char* argv[])
{
    if(argc <= 2)
    {
        printf("usage: %s ip_address port_number\n", basename(argv[0]));
        return 1;
    }
    const char* ip = argv[1];
    int port = atoi(argv[2]);
	//这是客户端
	cout << "this is user" << endl;


	//socket
	//初始化socket，并检测是都成功
	//int ulient = socket(AF_INET, SOCK_STREAM, 0); //tcp
    int ulient = socket(AF_INET, SOCK_DGRAM, 0); //udp
	if (ulient == -1)
	{
		perror("socket fail");
		exit(1);
	}

	//connect
	struct sockaddr_in serverAddr;
	serverAddr.sin_family = AF_INET;
	serverAddr.sin_port = htons(port);
	serverAddr.sin_addr.s_addr = inet_addr(ip);
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
```

测试结果：
client_udp端
```
$ g++ socket_u.cpp -o client_udp
$ ./client_udp 127.0.0.1 8000
this is user
.....connect
123456
Server received!!
12345458
Server received!!
```
client_tcp端
```
$ g++ socket_u.cpp -o client_tcp
$ ./client_tcp 127.0.0.1 8000
this is user
.....connect
123456
Server received!!
123456
Server received!!
```
server端
```
./a.out 127.0.0.1 8000
this is TCP:123456
this is TCP:123456
this is UDP:123456
this is UDP:12345458
```
如图：

![upload successful](/images/2022-6-19-001.png)


