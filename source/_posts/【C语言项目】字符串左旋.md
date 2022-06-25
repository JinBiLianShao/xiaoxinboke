title: 【C语言项目】字符串左旋
author: 连思鑫
tags:
  - C语言项目
  - 字符串左旋
categories:
  - C语言项目
date: 2022-06-24 16:00:00
---
# 【C语言项目】字符串左旋


## 项目说明
实现一个函数，可以左旋字符串中的k个字符。

例如：

ABCD左旋一个字符得到BCDA

ABCD左旋两个字符得到CDAB

## 代码实现

```c++
/*
 *  2022-6-24
 *  连思鑫
 *  字符串左旋
 * */

//实现一个函数，可以左旋字符串中的k个字符。
//
//例如：
//ABCD左旋一个字符得到BCDA
//ABCD左旋两个字符得到CDAB

#include<stdio.h>
#include<string.h>
#include<assert.h>

char* strRightReverse(char* str, int num) {

	char strAfterReverse[100] = {0};
	char* strReverse = str;
	char* strNotReverse = str;
	int i;
	int length = strlen(str);

	if (num < 0 || num > strlen(str)) {
		printf("Illegal input!\n");
		return str;
	}

	//我们先将不左旋的数放进 strReverse 数组中
	strNotReverse += num;

	for (i = 0; i < length - num; i++)
		strAfterReverse[i] = *strNotReverse++;

	//再将要左旋的数依次放入数组尾
	for (i = length - num; i < length; i++) {
		strAfterReverse[i] = *strReverse++;
	}
	strAfterReverse[length] = '\0';
	
	strcpy(str, strAfterReverse);

	return str;
}

int main(void) {

	char str[100];
	int num = 0;

	printf("Enter a string: ");
	scanf("%s", str);
	printf("Enter a number: ");
	scanf("%d", &num);

	strRightReverse(str, num);

	printf("output: %s\n", str);

	return 0;
}

```

## 效果

```shell
$ ./test
Enter a string: abcde
Enter a number: 2
output: cdeab
```


![uploaded!](/images/2022-6-24-00009.png)





