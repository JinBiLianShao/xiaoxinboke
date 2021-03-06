title: 算法题：C语言判断回文数
author: 连思鑫
tags:
  - C语言
  - 算法
categories:
  - C语言
date: 2021-09-17 22:43:00
---
# C语言判断回文数

## 什么是回文数？
回文数是指一个数反过来和原来数值不变的数

## C语言设计回文数的思想

1.首先我们知道回文数是指一个数反过来和原来的数值相同，所以我们要先把数值反过来

2.将反过来的数值和原数值比对大小，相同则是回文数，不同则不是回文数

## 实现步骤

1.首先要将有输入

	printf("请输入一个数：");
	scanf("%d", &s);
    
这里我们用scanf（）输入函数获取用户输入，%d是指输入的是个整数型。

printf（）是输出，这里用于提示用户输入数值，当然也可以写成

	scanf("请输入一个数：%d", &s);

个人不建议这样写，因为scanf（）函数的一些特性，往往容易出问题。尤其是在字符的处理上，例如用户输入的数据是通过键盘，键盘上的所有按键输入到电脑都是一个字符。你按回车也是向电脑输入了一个字符/n。
这个输入的数据存放在内存缓冲区，scanf便是循环取出内存缓冲区的数据。如果是字符型，则包含了你输入的所有数据，这也是用scanf所要注意的地方。

关于scanf的用法和注意事项，我会单独列出一个章节去讲，这里先不深入了。

2.数值反转

想要数值反转，首先要知道你输入的数值是多少位，然后根据位数加个循环，把数值一个个反转在存放在备用的变量中。

	//循环计算输入数是多少位
    while ( s != 0)
    {
        s = s / 10;
        ++t;
    }
上面便是用于计算输入数的位数的实现，很简单，因为是整数型，得不到小数，所以只能整除并丢失余数。

例如： 
	
    int s = 11/2; //=5余1，而返回给s的只有5，1便不要了。
    
所以通过这种整除的形式除以10，最后等于0时，所累计的数便是输入数的位数了。

位数知道了，接下来便是数值的反转。

	//w是位数，s是输入的值，之前要定义一个容器变量放反转数这里h,d是那个容器。
	for(int i = 0, i < w, i++) 
	{
    d = s % 10; //%是取余运算符
    h = h * 10 + d;
    s = s / 10;
	}

思路讲解：先对输入数取余获取最后的余数，例如：

	s = 21 % 10; // 21 / 10 = 2 ..1。s是1，余数

这样就可以得到倒数第一个数了,然后定义一个int类型的h，初始值给0，用来存放反过来的数的容器。我们上一步获取倒数第一个数，但怎么提高它的位级呢？所以，接下来通过h存放上一次循环的中间件d，也就是个位数的值，并在下一个循环提升它的位级，即乘10。所以

	h = h * 10 + d; //这个才是重点！！核心所在！！
    
3.接下来就是判断

用if语句判断原数值s和反转后存放容器变量h，一样则输出是回文数，不一样则不是回文数。

	//对反转的数进行回文数判断
	if(s == h)
	{
		printf("%d 是回文数！！\n", s);
	}else{
		printf("%d 不是回文数！！\n",s);
	}

## 完整代码

	#include<stdio.h>
	#include<stdlib.h>
	/*
 	*  oji题：输入一个数判断是否是回文数
 	* 回文数：例如123321这种数，反过来和正这是同一个数的叫回文数
 	*
 	* */
	int main()
	{
		int i,h,s;
		int v = 0;
    	printf("请输入一个数：");
		scanf("%d", &i);
		s = i;
		while( i !=0)  //循环历遍，反转回文数
		{
            h = i % 10; //对i进行10的取余，得到的数放到h中
            v = v *10 + h; // 本题的精华所在。
            i = i / 10; // 因为是整数，所以可以通过这句来计算输入数的位数
        }

        //对反转的数进行回文数判断
        if(s == v)
        {
            printf("%d 是回文数！！\n", s);
        }else{
            printf("%d 不是回文数！！\n",s);
        }
    }

这是简化版，不利于理解，所以上面我拆分的写的。完整版我将位数和反转合并了。

## 运行效果图

环境：manjaro （linux系统）
工具：vscod

![upload successful](/images/2021-9-1701.png)

![upload successful](/images/2021-9-1702.png)

![upload successful](/images/2021-9-1703.png)

![upload successful](/images/2021-9-1704.png)