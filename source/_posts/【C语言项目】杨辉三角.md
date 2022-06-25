title: 【C语言项目】杨辉三角
author: 连思鑫
tags:
  - C语言
  - C语言项目
  - 杨辉三角
categories:
  - C语言项目
date: 2022-06-24 15:43:00
---
# 【C语言项目】杨辉三角



最近工作较为清闲，写点C语言项目练练手。



## 代码

```c++
	/*
 *  2022-6-24
 *  连思鑫
 *  杨辉三角的实现
 * */
#include<stdio.h>

#define HEIGHT 10 //假设杨辉三角的高度是10

int main(void) {

	int YHtrangle[HEIGHT][HEIGHT] = { 0 };
	int i, j;

	//计算杨辉三角
	for (i = 0; i < HEIGHT; i++) {

		YHtrangle[i][0] = 1;//每行第一个元素为 1
		YHtrangle[i][i] = 1;//每行最后一个元素为 1
		//需要计算的是从第三行开始，i == 2
		for (j = 1; j < i; j++)
			YHtrangle[i][j] = YHtrangle[i - 1][j - 1] + YHtrangle[i - 1][j];// 比如第三行的 2 是 第二行 1 + 1的和，这是杨辉三角的规律
	}

	//输出杨辉三角
	for (i = 0; i < HEIGHT; i++) {
		for (j = 0; j <= i; j++) {
			printf("%d	", YHtrangle[i][j]);
		}
		printf("\n");
	}

	return 0;
}
```



升级版

```c++
/*
 *  2022-6-24
 *  连思鑫
 *  杨辉三角的实现
 * */

#include<stdio.h>

#define HEIGHT 10 //如果要修改杨辉三角的高度修改这个参数即可

#define ARRLEN HEIGHT + 1 

void printYH(int arr[][ARRLEN]) {

	int row, col;

	//这个程序比较方便惯性思维理解，数组的首行首列不用（下标从 1 开始）
	for (row = 1; row <= HEIGHT; row++) {

		for (col = 1; col <= row; col++) {

			if (col == 1 || col == row)
				arr[row][col] = 1;
			else
				arr[row][col] = arr[row - 1][col - 1] + arr[row - 1][col];

			//直接输出计算结果不需要再用另一个循环输出
			printf("%d	", arr[row][col]);
		}

		printf("\n");
	}
	//当然这个程序也有缺点，如果你在程序中使用这个数组，你需要时刻记得下标为 0 是不存任何有意义的数据的
}

int main(void) {

	int YHtrangle[ARRLEN][ARRLEN] = { 0 };

	printYH(YHtrangle);

	return 0;
}
```

## 效果


![uploaded!](/images/2022-6-24-0003-1.png)

