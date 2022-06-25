title: 【C语言项目】字符串旋转判断
author: 连思鑫
tags:
  - C语言项目
  - 字符串旋转判断
categories:
  - C语言项目
date: 2022-06-24 15:46:00
---
# 字符串旋转

写一个函数，判断一个字符串是否为另外一个字符串旋转之后的字符串。

例如：给定s1 =AABCD和s2 = BCDAA，返回1
给定s1=abcd和s2=ACBD，返回0.

AABCD左旋一个字符得到ABCDA
AABCD左旋两个字符得到BCDAA
AABCD右旋一个字符得到DAABC

## 代码实现

```c++
/*
 *  2022-6-24
 *  连思鑫
 *  字符串旋转
 * */

#include<stdio.h>
#include<string.h>
#include<assert.h>

int strJudge(const char* str1, const char* str2) {

	char* str2_start = (char*)str2;

	//str1 和 str2 不能是空指针
	assert(str1 != NULL && str2 != NULL);

	//如果字符串长度是 1 ，这个判断就没有意义了
	assert(strlen(str1) != 1);
	
	//如果连个字符串长度都不一样，肯定不是
	if (!(strlen(str1) == strlen(str2)))
		return 0;

	//在 str2 中寻找 str1 的第一个元素
	while (*str2) {
		if (*str2 == *str1) {
			++str1;// str1 中的第一个元素已经找到，在下一个循环寻找 str1 中的下一个
			break;
		}

		++str2;
	}
	//没有找到，直接返回 0
	if (*str2 == '\0')
		return 0;

	while (*str1) {
		
		++str2;

		if (*str2 == '\0')
			str2 = str2_start;
		
		if (!(*str2 == *str1))
			return 0;

		++str1;
	
	}

	return 1;
}

int main(void) {

	char str1[100];
	char str2[100];

	printf("Enter two strings: ");
	scanf("%s %s", str1, str2);

	if (strJudge(str1, str2))
		printf("Yes\n");
	else
		printf("No\n");

	return 0;
}
```

## 效果

```shell
lsx@DESKTOP-LFPDU8K:~$ ./test
Enter two strings: AABCD BCDAA
Yes
lsx@DESKTOP-LFPDU8K:~$ ./test
Enter two strings: asdas dsasd
No
```


![uploaded!](/images/2022-6-24-00632.png)
