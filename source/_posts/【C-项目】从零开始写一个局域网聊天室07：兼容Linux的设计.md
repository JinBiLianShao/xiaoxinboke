title: 【C++项目】从零开始写一个局域网聊天室07：跨系统兼容Linux的设计
author: 连思鑫
tags:
  - C++项目
  - 从零开始写一个局域网聊天室
  - 服务器编程
categories:
  - 从零开始写一个聊天室系列
date: 2022-11-12 15:31:00
---
# 【C++项目】从零开始写一个局域网聊天室07：跨系统兼容Linux的设计

## 1.说明
因为windows环境下与linux环境下的网络编程存在差异，当你想将windows下的系统移植到Linux环境中编译运行时，需要修改许多内容。为了方便移植，增加其跨平台特性，可以在代码中添加宏进行判断，从而提高软件兼容性。

## 2.代码
因为在写代码的时候，将讲解都以注释的方式写在代码里，这里将不再重复，直接看代码注释。

### 2.1 Server端


```C++
/*
	author: 连思鑫
	time: 2022-11-12
	跨系统兼容Linux的设计
*/
//宏判断运行环境
#ifdef _WIN32
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <WinSock2.h>
#else
#include <unistd.h> //uni std
#include <arpa/inet.h> 
#include <string.h>
#define SOCKET int 
#define INVALID_SOCKET   (SOCKET)(~0)
#define SOCKET_ERROR             (-1)
#endif
#include "iostream"
#include "stdio.h"
#include <vector>
using namespace std;
/*使用报文的方式进行传输*/
//数据头
enum CMD
{
	CMD_LOGIN,
	CMD_LOGIN_RESULT,
	CMD_LOGINOUT,
	CMD_LOGINOUT_RESULT,
	CMD_NEW_USER_JOIN,
	CMD_ERROR
};
struct DataHeader
{
	short dataLength;//数据长度 
	short cmd;//命令
};
//DataPackage
//包体
struct Login : public DataHeader
{
	//DataHeader header;
	Login()
	{
		dataLength = sizeof(Login);
		cmd = CMD_LOGIN;
	}
	char userName[32];
	char PassWord[32];
};
struct LoginResult : public DataHeader
{
	LoginResult()
	{
		dataLength = sizeof(LoginResult);
		cmd = CMD_LOGIN_RESULT;
		result = 0;
	}
	int result;
};
struct LoginOut : public DataHeader
{
	LoginOut()
	{
		dataLength = sizeof(LoginOut);
		cmd = CMD_LOGINOUT;
	}
	char userName[32];
};
struct LoginOutResult : public DataHeader
{
	LoginOutResult()
	{
		dataLength = sizeof(LoginOutResult);
		cmd = CMD_LOGINOUT_RESULT;
		result = 0;
	}
	int result;
};
//新客户端加入
struct NewUserJoin : public DataHeader
{
	NewUserJoin()
	{
		dataLength = sizeof(NewUserJoin);
		cmd = CMD_NEW_USER_JOIN;
		sock = 0;
	}
	int sock;
};
//创建一个全局的容器
vector<SOCKET> g_clients;

//创建一个函数进行处理
int processor(SOCKET _cSocket)
{
	//使用缓冲区来接受数据
	char szRecv[1024] = {};
	//5 接收客户端请求数据
	int nLen = (int)recv(_cSocket, (char*)&szRecv, sizeof(DataHeader), 0);
	//拆包 和 分包
	/*拆包和分包的作用主要是用在服务端接受数据时一次接受数据过长 和 过短的情况*/
	DataHeader* header = (DataHeader*)szRecv;
	if (nLen <= 0)
	{
		printf("客户端<Socket = %d>已经退出, 任务结束。\n", _cSocket);
		return -1;
	}
	//printf("收到命令: %d 数据长度：%d\n", header.cmd, header.dataLength);
	/*判断所收到的数据*/ //多客户端进行收发数据的情况下使用
				 //if (nLen > sizeof(DataHeader))
				 //{
				 //}
	switch (header->cmd)
	{
	case CMD_LOGIN:
	{
		recv(_cSocket, szRecv + sizeof(DataHeader), header->dataLength - sizeof(DataHeader), 0);
		Login* login = (Login*)szRecv;
		printf("收到客户端<Socket = %d>请求:CMD_LOGIN 数据长度：%d userName = %s passWord = %s\n", _cSocket, login->dataLength, login->userName, login->PassWord);
		//忽略判断用户名密码是否正确的过程
		LoginResult ret;
		//send(_cSocket, (char*)&header, sizeof(DataHeader), 0);
		send(_cSocket, (char*)&ret, sizeof(LoginResult), 0);
	}
	break;
	case CMD_LOGINOUT:
	{
		recv(_cSocket, szRecv + sizeof(DataHeader), header->dataLength - sizeof(DataHeader), 0);
		LoginOut *loginout = (LoginOut*)szRecv;
		printf("收到命令:CMD_LOGINOUT 数据长度：%d userName = %s\n", loginout->dataLength, loginout->userName);
		//忽略判断用户名密码是否正确的过程
		LoginOutResult ret;
		//send(_cSocket, (char*)&header, sizeof(DataHeader), 0);
		send(_cSocket, (char*)&ret, sizeof(LoginOutResult), 0);
	}
	break;
	default:
	{
		DataHeader header = { 0, CMD_ERROR };
		send(_cSocket, (char*)&header, sizeof(DataHeader), 0);
	}
	break;
	}
	return 0;
}

int main()
{
	/*启动Windows socket 2.x环境*/
	//版本号
#ifdef _WIN32
	WORD ver = MAKEWORD(2, 2);
	WSADATA dat;
	//socket网络编程启动函数
	WSAStartup(ver, &dat);
#endif
	//---------------------------
	//--用Socket API建立简易TCP服务端
	//1、建立一个socket  套接字 （windows） linux上指的是指针
	/*socket(
	_In_ int af,(表示什么类型的套接字)
	_In_ int type,(数据流)
	_In_ int protocol
	);*/
	//IPV4的网络套接字 AF_INET
	//IPV6的网络套接字 AF_INET6
	SOCKET _sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
	char msgBuf[] = "Hello, I'm Server.\n";
	//2、bind 绑定用于接收客户端链接的网络端口
	/*
	bind(
	_In_ SOCKET s,
	_In_reads_bytes_(namelen) const struct sockaddr FAR * name,
	_In_ int namelen
	);
	*/
	sockaddr_in _sin = {};
	_sin.sin_family = AF_INET;//ipv4
	_sin.sin_port = htons(4567);//端口号 由于主机和网络的数据类型不同 因此需要进行转换 使用 host to net unsigned short
#ifdef _WIN32
	_sin.sin_addr.S_un.S_addr = INADDR_ANY;//inet_addr("127.0.0.1");//服务器的ip地址 INADDR_ANY本机所有的Ip地址都可以访问 一般这样
#else
	_sin.sin_addr.s_addr = INADDR_ANY;
#endif
	//有可能绑定失败
	if (SOCKET_ERROR == bind(_sock, (sockaddr*)&_sin, sizeof(_sin)))
	{
		printf("错误，绑定网络端口失败...\n");
	}
	else
	{
		printf("绑定端口成功...\n");
	}

	//3、listen 监听网络端口
	/*
	listen(
	_In_ SOCKET s,
	_In_ int backlog
	);*/
	if (SOCKET_ERROR == listen(_sock, 5))
	{
		printf("错误，监听网络端口失败...\n");
	}
	else
	{
		printf("监听网络端口成功...\n");
	}
	while (true)
	{
		// 伯克利 BSD socket windows上第一个参数无意义
		//linux 表示描述符加1
		/*处理多客户端类型
		select(
		_In_ int nfds,
		_Inout_opt_ fd_set FAR * readfds,//可读
		_Inout_opt_ fd_set FAR * writefds,//可写
		_Inout_opt_ fd_set FAR * exceptfds,//异常
		_In_opt_ const struct timeval FAR * timeout//查询延迟
		);*/
		fd_set fdRead;//描述符(socket)集合
		fd_set fdWrite;
		fd_set fdExp;

		FD_ZERO(&fdRead);//清空fd_set集合类型的数据 其实就是将fd_count 置为0
		FD_ZERO(&fdWrite);//清理集合
		FD_ZERO(&fdExp);
		//typedef struct fd_set {
		//	u_int fd_count; 数量              /* how many are SET? */
		//	SOCKET  fd_array[FD_SETSIZE(64)];   /* an array of SOCKETs */
		//} fd_set;

		FD_SET(_sock, &fdRead);//将描述符加入集合中
		FD_SET(_sock, &fdWrite);
		FD_SET(_sock, &fdExp);
		SOCKET maxSock = _sock;
		for (int n = (int)g_clients.size() - 1; n >= 0; n--)
		{
			FD_SET(g_clients[n], &fdRead);//放入可读数据中查询 是否有可读数据
			if (maxSock < g_clients[n])
			{
				//找到所有描述符中的最大描述符
				maxSock = g_clients[n];
			}
		}

		//nfds是一个整数值 是指fd_set集合中所有描述符(socket)的范围 而不是数量 
		//既是所有文件描述符最大值+1 在windows中这个参数可以写0
		//最后一个参数写成NULL表示一直阻塞在此等待
		timeval t = { 1, 0 };//时间变量 &t 最大为1秒

							 //struct timeval {
							 //long    tv_sec;         /* seconds */
							 //long    tv_usec;        /* and microseconds */};
		int ret = select(maxSock + 1, &fdRead, &fdWrite, &fdExp, &t);
		/*_sock + 1能够 使得在linux上正常使用*/

		/*以上方式为阻塞方式，如果没有客户端进入将阻塞在此处*/
		if (ret < 0)
		{
			printf("select任务结束。\n");
			break;//表示出错 跳出循环
		}
		//如果这个socket可读的话表示 有客户端已经连接进来了
		if (FD_ISSET(_sock, &fdRead))//判断描述符是否在集合中
		{
			//清理
			FD_CLR(_sock, &fdRead);
			//4、accept 等待接收客户端链接
			/*
			accept(
			_In_ SOCKET s,
			_Out_writes_bytes_opt_(*addrlen) struct sockaddr FAR * addr,
			_Inout_opt_ int FAR * addrlen
			);*/
			//accept 等待接受客户端连接
			sockaddr_in clientAddr = {};
			int nAddrLen = sizeof(sockaddr_in);
			SOCKET _cSocket = INVALID_SOCKET;
			//nAddrLen类型是windows和linux之间不一样的
#ifdef _WIN32
			_cSocket = accept(_sock, (sockaddr*)&clientAddr, &nAddrLen);
#else
			_cSocket = accept(_sock, (sockaddr*)&clientAddr, (socklen_t*)&nAddrLen);
#endif
			if (INVALID_SOCKET == _cSocket)
			{
				printf("错误，接收到无效客户端SOCKET...\n");
			}
			else
			{
				//有新客户端加入群发给所有用户 类似像聊天室 或者狼人杀类型
				for (int n = (int)g_clients.size() - 1; n >= 0; n--)
				{
					NewUserJoin userJoin;
					//发送给现有的每个客户端
					send(g_clients[n], (const char*)&userJoin, sizeof(NewUserJoin), 0);
				}
				g_clients.push_back(_cSocket);
				printf("新客户端加入: socket = %d IP = %s \n", _cSocket, inet_ntoa(clientAddr.sin_addr));//inet_ntoa转换为可读地址
			}
		}
		for (int n = (int)g_clients.size() - 1; n >= 0; n--)
		{
			if (FD_ISSET(g_clients[n], &fdRead))
			{
				if (processor(g_clients[n]) == -1)
				{
					auto iter = g_clients.begin() + n;
					if (iter != g_clients.end())
					{
						g_clients.erase(iter);
					}
				}
			}
		}
		//printf("空闲时间处理其他业务\n");
	}
	//以防万一退出程序时 将所有套接字进行清理
#ifdef _WIN32
	for (int n = (int)g_clients.size() - 1; n >= 0; n--)
	{
		closesocket(g_clients[n]);
	}
	//5、send 向客户端发送一条数据
	/*send(
	_In_ SOCKET s,
	_In_reads_bytes_(len) const char FAR * buf,
	_In_ int len,
	_In_ int flags
	);*/
	//char msgBuf[] = "Hello, I'm Server.";
	//+1表示将结尾符一并发送过去
	//send(_cSocket, msgBuf, strlen(msgBuf) + 1, 0);

	//6、关闭套接字closesocket
	closesocket(_sock);

	//---------------------------
	WSACleanup();
#else
	for (int n = (int)g_clients.size() - 1; n >= 0; n--)
	{
		close(g_clients[n]);
	}
#endif
	printf("已退出，任务结束\n");
	getchar();
	return 0;
}
```

### 2.2 Client端

```C++
/*
	author: 连思鑫
	Time: 2022-11-12
	跨平台客户端
*/

/*client代码可以跨linux windows macos使用*/
#define WIN32_LEAN_AND_MEAN
#define _WINSOCK_DEPRECATED_NO_WARNINGS

//进行系统判断 是什么系统就使用什么包
#ifdef _WIN32
#include <windows.h>
#include <WinSock2.h>
#else
#include <unistd.h> //uni std
#include <arpa/inet.h> 
#include <string.h>
#define SOCKET int 
#define INVALID_SOCKET   (SOCKET)(~0)
#define SOCKET_ERROR             (-1)
#endif

#include <stdio.h>
#include <thread>
#include "iostream"
using namespace std;
enum CMD
{
	CMD_LOGIN,
	CMD_LOGIN_RESULT,
	CMD_LOGINOUT,
	CMD_LOGINOUT_RESULT,
	CMD_NEW_USER_JOIN,
	CMD_ERROR
};
struct DataHeader
{
	short dataLength;//数据长度 
	short cmd;//命令
};
//DataPackage
//包体
struct Login : public DataHeader
{
	//DataHeader header;
	Login()
	{
		dataLength = sizeof(Login);
		cmd = CMD_LOGIN;
	}
	char userName[32];
	char PassWord[32];
};
struct LoginResult : public DataHeader
{
	LoginResult()
	{
		dataLength = sizeof(LoginResult);
		cmd = CMD_LOGIN_RESULT;
		result = 0;
	}
	int result;
};
struct LoginOut : public DataHeader
{
	LoginOut()
	{
		dataLength = sizeof(LoginOut);
		cmd = CMD_LOGINOUT;
	}
	char userName[32];
};
struct LoginOutResult : public DataHeader
{
	LoginOutResult()
	{
		dataLength = sizeof(LoginOutResult);
		cmd = CMD_LOGINOUT_RESULT;
		result = 0;
	}
	int result;
};
//新客户端加入
struct NewUserJoin : public DataHeader
{
	NewUserJoin()
	{
		dataLength = sizeof(NewUserJoin);
		cmd = CMD_NEW_USER_JOIN;
		sock = 0;
	}
	int sock;
};
int processor(SOCKET _cSocket)
{
	//使用缓冲区来接受数据
	char szRecv[1024] = {};
	//5 接收客户端请求数据
	int nLen = recv(_cSocket, (char*)&szRecv, sizeof(DataHeader), 0);
	//拆包 和 分包
	/*拆包和分包的作用主要是用在服务端接受数据时一次接受数据过长 和 过短的情况*/
	DataHeader* header = (DataHeader*)szRecv;
	if (nLen <= 0)
	{
		printf("与服务器断开连接, 任务结束。\n");
		return -1;
	}
	//printf("收到命令: %d 数据长度：%d\n", header.cmd, header.dataLength);
	/*判断所收到的数据*/ //多客户端进行收发数据的情况下使用
				 //if (nLen > sizeof(DataHeader))
				 //{
				 //}
	switch (header->cmd)
	{
	case CMD_LOGIN_RESULT:
	{
		recv(_cSocket, szRecv + sizeof(DataHeader), header->dataLength - sizeof(DataHeader), 0);
		LoginResult* login = (LoginResult*)szRecv;
		printf("收到服务端消息:CMD_LOGIN_RESULT 数据长度：%d \n", login->dataLength);
	}
	break;
	case CMD_LOGINOUT_RESULT:
	{
		recv(_cSocket, szRecv + sizeof(DataHeader), header->dataLength - sizeof(DataHeader), 0);
		LoginOutResult* loginout = (LoginOutResult*)szRecv;
		printf("收到服务端消息:CMD_LOGINOUT_RESULT 数据长度：%d \n", loginout->dataLength);
	}
	break;
	case CMD_NEW_USER_JOIN:
	{
		recv(_cSocket, szRecv + sizeof(DataHeader), header->dataLength - sizeof(DataHeader), 0);
		NewUserJoin* userJoin = (NewUserJoin*)szRecv;
		printf("收到服务端消息:CMD_NEW_USER_JOIN 数据长度：%d \n", userJoin->dataLength);
	}
	break;
	}
}
bool g_bRun = true;
//将输入命令分离出来
void cmdThread(SOCKET sock) {
	while (true)
	{
		char cmdBuf[256] = {};
		scanf("%s", cmdBuf);
		if (0 == strcmp(cmdBuf, "exit"))
		{
			g_bRun = false;
			printf("退出cmdThread线程\n");
			break;
		}
		else if (0 == strcmp(cmdBuf, "login"))
		{
			Login login;
			strcpy(login.userName, "zjj");
			strcpy(login.PassWord, "969513");
			send(sock, (const char*)&login, sizeof(login), 0);
		}
		else if (0 == strcmp(cmdBuf, "logout"))
		{
			LoginOut logout;
			strcpy(logout.userName, "zjj");
			send(sock, (const char*)&logout, sizeof(logout), 0);
		}
		else
		{
			printf("不支持的命令\n");
		}
	}
}
int main()
{
#ifdef _WIN32
	/*启动Windows socket 2.x环境*/
	//版本号
	WORD ver = MAKEWORD(2, 2);
	WSADATA dat;
	//socket网络编程启动函数
	WSAStartup(ver, &dat);
#endif
	//---------------------------
	//用Socket API建立简易TCP客户端
	//1、建立一个socket
	SOCKET _sock = socket(AF_INET, SOCK_STREAM, 0);
	if (INVALID_SOCKET == _sock)
	{
		printf("错误，建立Socket失败...\n");
	}
	else
	{
		printf("建立socket成功...\n");
	}

	//2、链接服务器 connect
	sockaddr_in _sin = {};//将结构体初始化
	_sin.sin_family = AF_INET;//ipv4
	_sin.sin_port = htons(4567);//将网络转换为成无符号类型
								//linux修改的地方
#ifdef _WIN32
	_sin.sin_addr.S_un.S_addr = inet_addr("127.0.0.1");
#else
	_sin.sin_addr.s_addr = inet_addr("192.168.137.1");
	//_sin.sin_addr.s_addr = inet_addr("192.168.25.1");
#endif
	int ret = connect(_sock, (sockaddr*)&_sin, sizeof(sockaddr_in)); //使用sizeof(sockaddr_in)类型更安全
	if (SOCKET_ERROR == ret)
	{
		printf("错误，链接服务器失败...\n");
	}
	else
	{
		printf("链接服务器成功...\n");
	}

	//启动线程
	thread t1(cmdThread, _sock);
	t1.detach();//将其与主线程进行分离

	while (g_bRun)
	{
		fd_set fdReads;
		FD_ZERO(&fdReads);
		FD_SET(_sock, &fdReads);
		timeval t = { 1, 0 };
		int ret = select(_sock + 1, &fdReads, 0, 0, &t);
		if (ret < 0)
		{
			printf("select任务结束！！！\n");
			break;
		}
		if (FD_ISSET(_sock, &fdReads))
		{
			FD_CLR(_sock, &fdReads);
			if (processor(_sock) == -1)
			{
				printf("select任务结束2\n");
				break;
			}
		}
		//线程thread 如果在程序执行的过程中加入scanf那么程序将会阻塞
		//printf("空闲时间处理其他业务\n");
		//Sleep(1000);
	}

	//7 关闭套节字closesocket
	//---------------------------
#ifdef _WIN32
	closesocket(_sock);//windows下使用
	WSACleanup();
#else
	close(_sock);
#endif
	printf("已退出.\n");
	getchar();
	return 0;
}
```

## 效果演示

Linux环境为WSL容器Ubuntu（运行成功！！）
![Linux环境下的server](/images/2022-11-12-1.png)

完整展示：

![uploaded!](/images/2022-11-12-02.png)

这样就形成了一个简单的多用户聊天室功能，且跨平台。server运行在Linux容器内，client运行在windows11环境中。后续可以用QT写UI美化。




