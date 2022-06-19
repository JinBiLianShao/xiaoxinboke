title: 【C语言项目】爱的征途游戏开源
author: 连思鑫
tags:
  - C语言
  - 开源i项目
  - 爱的征途
categories:
  - C语言
  - 开源项目
date: 2022-06-05 18:25:00
---
# 【C语言项目】爱的征途游戏开源

不知道多少年前写的了，是我写的第一个角色扮演的游戏，写这个游戏的时间在我的高中时代。没办法写实现的教程了，只能直接放代码出来。

## 成品展示


![游戏背景](/images/2022-6-5-000006.png)


![游戏地图](/images/2022-6-5-000007.png)



## 源码展示

```C
#include<stdio.h>
#include<windows.h>
#include<string.h> 
		//初始化地图 
				//第一张地图 
    int map1[20][20]={{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
				   {1,2,1,1,1,4,1,1,1,3,3,3,3,3,3,3,3,3,3,1},
				   {1,3,1,1,1,3,1,1,1,3,1,1,1,1,1,1,1,1,3,1},
				   {1,3,1,1,1,3,3,3,1,3,1,1,4,1,1,1,1,1,3,1},
				   {1,3,3,3,3,3,1,3,1,3,1,1,3,3,3,3,1,1,3,1},
				   {1,1,1,1,1,1,1,3,1,3,1,1,50,1,1,3,1,1,3,1},
				   {1,1,1,1,4,1,1,3,1,3,1,1,4,1,1,3,1,1,3,1},
				   {1,1,1,1,3,1,1,3,1,3,1,1,1,1,1,3,1,1,3,1},
				   {1,1,1,1,3,1,1,5,1,3,1,1,1,1,1,3,1,1,3,1},
				   {1,1,1,1,3,1,1,3,1,3,1,3,3,3,3,3,1,1,3,1},
				   {1,1,1,1,3,1,1,3,1,3,1,3,1,1,1,1,1,1,3,1},
				   {1,3,3,3,3,3,3,3,1,3,1,3,3,3,3,3,3,3,3,1},
				   {1,3,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1},
				   {1,3,1,1,1,1,1,1,1,3,3,3,3,3,1,1,1,1,1,1},
				   {1,3,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1},
				   {1,3,3,3,1,1,1,1,1,1,3,1,1,9,3,3,3,1,1,1},
				   {1,1,8,1,1,1,1,3,3,3,3,1,1,1,1,1,3,1,1,1},
				   {1,1,3,1,1,1,1,3,1,1,1,1,1,1,1,1,3,3,3,1},
				   {1,1,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,3,6},
				   {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},};
				   		//第二张地图 	魔塔第一层 
  int map2[20][20]={{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
				   {11,3,3,15,3,14,3,3,3,3,3,3,3,3,3,3,3,3,3,1},
				   {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1},
				   {1,3,3,3,3,3,1,3,3,3,3,1,3,3,3,3,3,1,3,1},
				   {1,3,1,1,1,3,1,3,3,1,3,1,3,19,3,7,3,1,3,1},
				   {1,3,1,25,15,3,3,3,3,1,3,1,3,3,3,3,3,1,3,1},
				   {1,3,1,1,1,3,1,3,3,1,3,1,1,1,15,1,1,1,3,1},
				   {1,3,3,3,3,3,1,3,3,1,14,1,1,1,3,1,1,1,3,1},
				   {1,1,1,16,1,1,1,3,3,1,3,1,3,3,3,3,3,1,3,1},
				   {1,3,3,3,3,3,1,3,3,1,3,1,3,18,3,7,3,1,3,1},
				   {1,18,3,3,3,19,1,3,3,1,3,1,3,3,3,3,3,1,3,1},
				   {1,18,3,3,3,19,1,3,3,1,3,1,1,1,15,1,1,1,3,1},
				   {1,18,3,3,3,19,1,3,3,1,3,3,3,3,3,3,3,1,3,1},
				   {1,3,7,7,7,3,1,3,3,1,1,1,1,1,1,1,1,1,3,1},
				   {1,1,1,17,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,1},
				   {1,3,3,3,3,3,1,1,1,1,3,1,1,1,1,1,15,1,1,1},
				   {1,3,23,1,1,3,1,1,7,3,3,3,18,1,3,3,3,3,3,1},
				   {1,3,1,1,24,3,1,1,7,3,3,3,18,1,3,3,7,3,3,1},
				   {1,3,3,3,3,3,1,1,7,3,2,3,19,1,3,3,3,3,3,1},
				   {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},};
				   		//第三张地图 	魔塔第二层 
  int map3[20][20]={{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
				   {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
				   {1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,1,1,1},
				   {1,1,3,3,3,3,1,3,3,3,3,1,3,1,1,1,1,1,1,1},
				   {1,1,3,7,7,3,1,3,3,1,3,1,3,1,3,3,3,1,1,1},
				   {1,1,3,7,24,3,16,3,3,1,3,1,3,17,3,23,3,1,1,1},
				   {1,1,3,7,7,3,1,3,3,1,3,1,3,1,3,3,3,1,1,1},
				   {1,1,3,3,3,3,1,3,3,1,3,1,3,1,1,1,1,1,1,1},
				   {1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,10,1,1},
				   {1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,1,1},
				   {1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1},
				   {1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1},
				   {1,1,3,1,1,1,3,1,1,1,1,1,1,3,1,1,1,3,1,1},
				   {1,1,3,1,3,3,14,3,3,1,1,3,3,14,3,3,1,3,1,1},
				   {1,1,3,1,3,1,7,1,3,1,1,3,18,1,19,3,1,3,1,1},
				   {1,1,3,1,15,18,1,19,15,1,1,15,1,3,1,15,1,3,1,1},
				   {1,1,3,1,3,1,7,1,3,1,1,3,7,1,7,3,1,3,1,1},
				   {1,1,2,1,3,3,15,3,3,1,1,3,3,15,3,3,1,3,1,1},
				   {1,1,12,1,1,1,1,1,1,1,1,1,1,1,1,1,1,21,1,1},
				   {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},};
				   		//第四张地图 	魔塔第三层 
  int map4[20][20]={{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
				   {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
				   {1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,1,1},
				   {1,1,3,3,3,3,1,3,7,1,1,1,1,1,15,1,1,3,1,1},
				   {1,1,3,7,7,3,1,3,3,3,3,3,1,3,3,3,1,3,1,1},
				   {1,1,3,18,18,3,17,3,3,1,1,3,1,18,3,3,1,3,1,1},
				   {1,1,3,19,19,3,1,3,3,1,1,3,1,1,16,1,1,3,1,1},
				   {1,1,3,3,3,3,1,7,3,1,1,3,1,3,3,3,1,3,1,1},
				   {1,1,1,1,1,1,1,1,1,1,1,3,1,3,19,3,1,3,1,1},
				   {1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,1,3,1,1},
				   {1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,3,1,1},
				   {1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1},
				   {1,1,3,1,1,1,14,1,1,3,1,1,1,1,1,1,1,3,1,1},
				   {1,1,3,1,7,3,3,3,1,3,1,3,3,3,16,3,3,3,1,1},
				   {1,1,17,1,1,1,14,1,1,3,1,3,1,1,1,1,1,3,1,1},
				   {1,1,3,1,3,3,3,7,1,3,1,3,1,3,3,3,1,3,1,1},
				   {1,1,3,1,14,1,1,1,1,3,1,3,1,3,23,3,13,3,1,1},
				   {1,1,3,3,3,3,3,3,1,2,1,3,3,3,3,3,1,3,1,1},
				   {1,1,31,1,1,1,1,1,1,22,1,1,1,1,1,1,1,1,1,1},
				   {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},};
				   		//第五张地图 	魔塔第四层 
  int map5[20][20]={{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
				   {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
				   {1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1},
				   {1,1,3,1,1,1,1,17,1,1,1,1,16,1,1,1,1,3,1,1},
				   {1,1,3,1,1,1,1,17,1,1,1,1,16,1,1,1,1,3,1,1},
				   {1,1,3,1,1,1,3,3,3,1,1,3,3,3,1,1,1,3,1,1},
				   {1,1,3,1,1,1,3,7,3,1,1,3,7,3,1,1,1,3,1,1},
				   {1,1,3,1,1,1,3,7,3,1,1,3,7,3,1,1,1,3,1,1},
				   {1,1,3,1,1,1,3,3,3,1,1,3,3,3,1,1,1,3,1,1},
				   {1,1,3,1,1,1,1,17,1,1,1,1,16,1,1,1,1,3,1,1},
				   {1,1,3,1,1,1,3,3,3,1,1,3,3,3,1,1,1,3,1,1},
				   {1,1,3,1,1,1,3,7,3,1,1,3,7,3,1,1,1,3,1,1},
				   {1,1,3,1,1,1,3,7,3,1,1,3,7,3,1,1,1,3,1,1},
				   {1,1,3,1,1,1,3,3,3,1,1,3,3,3,1,1,1,3,1,1},
				   {1,1,3,1,1,1,1,17,1,1,1,1,16,1,1,1,1,3,1,1},
				   {1,1,3,1,1,1,3,3,3,1,1,3,3,3,1,1,1,3,1,1},
				   {1,1,3,1,1,1,3,23,3,1,1,3,24,3,13,13,13,3,1,1},
				   {1,1,2,1,1,1,3,3,3,1,1,3,3,3,1,1,1,3,1,1},
				   {1,1,32,1,1,1,1,1,1,1,1,1,1,1,1,1,1,41,1,1},
				   {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},};
				   		//第六张地图 	魔塔第五层 
  int map6[20][20]={{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
				   {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
				   {1,1,100,1,13,13,13,13,13,13,13,13,13,13,13,13,13,13,1,1},
				   {1,1,13,1,1,1,1,13,1,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,1,1,1,1,13,1,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,1,1,1,1,13,1,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,1,1,1,1,13,1,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,1,1,1,1,1,1,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,1,1,1,1,13,13,13,13,13,13,1,1,1,1,13,1,1},
				   {1,1,13,1,1,1,1,13,1,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,1,1,1,1,13,1,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,1,13,13,13,13,13,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,1,1,1,1,1,13,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,1,1,13,13,13,13,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,13,13,13,1,13,1,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,1,1,1,1,13,1,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,1,13,1,1,13,1,1,1,1,13,1,1,1,1,13,1,1},
				   {1,1,13,1,13,13,13,13,1,1,1,1,13,1,1,1,1,2,1,1},
				   {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,42,1,1},
				   {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},};

		//角色信息
struct hero{
	char name[20];	//主角姓名 
	int z_x;		//主角横坐标 
	int z_y;		//主角纵坐标 
	int jade;		//镇魂之玉 
	int is_over;	//判断一个移动的结束 
	int hp;			//主角的血量 
	int carry;		//主角的攻击力 
	int defend;		//主角的防御力 
	int fortune; 	//主角的金币 
	int actor;		//主角的信息激活码 
	int backpack; 	//怪物图谱的激活码 
	int shop;		//商店的激活码 
	int floor;		//楼层数 
	int money;		//用于购买东西的金币 
};
struct monster{
	char m1_name[20];	//小史莱姆怪 
	int m1_hp;
	int m1_carry;
	int m1_defend;
	char m1_lose[20];
	int m1Lose;
	char m2_name[20];	//大史莱姆怪 
	int m2_hp;
	int m2_carry;
	int m2_defend;
	char m2_lose[20];
	int m2Lose;
	char m3_name[20];	//邪恶巫师 
	int m3_hp;
	int m3_carry;
	int m3_defend;
	char m3_lose[20];
	int m3Lose;
	char m4_name[20];	//双剑武士 
	int m4_hp;
	int m4_carry;
	int m4_defend;
	char m4_lose[20];
	int m4Lose;
	char m5_name[20];	//大法师 
	int m5_hp;
	int m5_carry;
	int m5_defend;
	char m5_lose[20];
	int m5Lose;
} ;
struct contain{
	struct hero person;
	struct monster ms;
};

struct contain move(struct contain zd,int a[20][20]);
struct contain moveDown(struct contain zd,int a[20][20]); 
struct contain moveUp(struct contain zd,int a[20][20]);
struct contain moveRight(struct contain zd,int a[20][20]);
struct contain moveLeft(struct contain zd,int a[20][20]);
struct contain information(struct contain zd,int a[20][20]);
struct contain monsterBP(struct contain zd,int a[20][20]);
struct contain login(struct contain zd);
struct contain account(struct contain zd);
struct contain ShowMap(struct contain zd,int a[20][20]);
struct contain fightM1(struct contain zd);
struct contain fightM2(struct contain zd); 
struct contain fightM3(struct contain zd); 
struct contain fightM4(struct contain zd); 
struct contain fightM5(struct contain zd);
struct contain addCarry(struct contain zd);
struct contain addDefend(struct contain zd);
struct contain addCarry10(struct contain zd);
struct contain addDefend10(struct contain zd);
struct contain addHp(struct contain zd);
struct contain SHOP(struct contain zd);
struct contain openshop(struct contain zd);

				   		//定义一个地图的函数，名字叫ShowMap 
struct contain ShowMap(struct contain zd,int a[20][20]){
	system("cls"); 
	 zd=account(zd);
	system("color 75");
	int i=0,j=0;
	for(i=0;i<20;i++){
		for(j=0;j<20;j++){
			if(a[i][j]==1) printf("■");		//墙 
			else if(a[i][j]==2) printf("♀");	//主角 
			else if(a[i][j]==3) printf("  ");	//空格 
			else if(a[i][j]==4) printf("￠");	//镇魂之玉 
			else if(a[i][j]==5||a[i][j]==8||a[i][j]==9||a[i][j]==50) printf("卍");	//怪物 
			else if(a[i][j]==6) printf("♂");	//王子 
			else if(a[i][j]==7) printf("%c%c",3,3);//血瓶 	200点 
			else if(a[i][j]==10)printf("智");	//怪物图谱 
			else if(a[i][j]==11)printf("上");	//一楼往上走 
			else if(a[i][j]==12)printf("下");	//二楼往下走
			else if(a[i][j]==21)printf("上");	//二楼往上走 
			else if(a[i][j]==22)printf("下");	//三楼往下走
			else if(a[i][j]==31)printf("上");	//三楼往上走 
			else if(a[i][j]==32)printf("下");	//四楼往下走
			else if(a[i][j]==41)printf("上");	//四楼往上走 
			else if(a[i][j]==42)printf("下");	//五楼往下走 
			else if(a[i][j]==13)printf("■");	//可以穿透的墙
			else if(a[i][j]==14)printf("○");	//小史莱姆怪 
			else if(a[i][j]==15)printf("◎");	//大史莱姆怪 
			else if(a[i][j]==16)printf("☆");	//邪恶巫师 
			else if(a[i][j]==17)printf("¤");	//双剑武士 
			else if(a[i][j]==18)printf("ㄨ");	//攻击  2点 
			else if(a[i][j]==19)printf("◇");	//防御	2点 
			else if(a[i][j]==23)printf("剑");	//剑  攻击  10点 
			else if(a[i][j]==24)printf("盾");	//盾  防御  10点 
			else if(a[i][j]==25)printf("商");	//激活商店 
			else if(a[i][j]==100)printf("№");	//大法师  
		}printf("\n");
	}
	if(zd.person.floor>=1)printf("\t        魔塔第%d层\n",zd.person.floor);
	return zd;
}
		//怪物与主角的损血计算
struct contain account(struct contain zd){
			//小史莱姆怪 
		int x=0,y=0,z=0; 
		z=zd.person.carry-zd.ms.m1_defend;
		if(z!=0) x=zd.ms.m1_hp/z;
  		y=(x-1)*(zd.ms.m1_carry-zd.person.defend);
	if(zd.person.carry<=zd.ms.m1_defend||zd.person.hp<=y){
		strcpy(zd.ms.m1_lose,"?????");
	}else{
		if(zd.ms.m1_carry<=zd.person.defend){
			strcpy(zd.ms.m1_lose,"0");
			zd.ms.m1Lose=0;
		}else {
	      	zd.ms.m1Lose=y;
			itoa(zd.ms.m1Lose,zd.ms.m1_lose,10);
		}
	}
			//大史莱姆怪 
		z=zd.person.carry-zd.ms.m2_defend;
		if(z!=0) x=zd.ms.m2_hp/z;
		y=(x-1)*(zd.ms.m2_carry-zd.person.defend);
	if(zd.person.carry<=zd.ms.m2_defend||zd.person.hp<=y){
		strcpy(zd.ms.m2_lose,"?????");
	}else{
		if(zd.ms.m2_carry<=zd.person.defend){
			strcpy(zd.ms.m2_lose,"0");
			zd.ms.m2Lose=0;
		}else {
       		zd.ms.m2Lose=y;
			itoa(zd.ms.m2Lose,zd.ms.m2_lose,10);
		}
	}
			//邪恶巫师  
		z=zd.person.carry-zd.ms.m3_defend;
		if(z!=0) x=zd.ms.m3_hp/z;
		y=(x-1)*(zd.ms.m3_carry-zd.person.defend);
	if(zd.person.carry<=zd.ms.m3_defend||zd.person.hp<=y){
		strcpy(zd.ms.m3_lose,"?????");
	}else{
		if(zd.ms.m3_carry<=zd.person.defend){
			strcpy(zd.ms.m3_lose,"0");
			zd.ms.m3Lose=0;
		}else {
  			zd.ms.m3Lose=y;
			itoa(zd.ms.m3Lose,zd.ms.m3_lose,10);
		}
	}
			//双剑武士 
		z=zd.person.carry-zd.ms.m4_defend;
		if(z!=0) x=zd.ms.m4_hp/z;
		y=(x-1)*(zd.ms.m4_carry-zd.person.defend);
	if(zd.person.carry<=zd.ms.m4_defend||zd.person.hp<=y){
		strcpy(zd.ms.m4_lose,"?????");
	}else{
		if(zd.ms.m4_carry<=zd.person.defend){
			strcpy(zd.ms.m4_lose,"0");
			zd.ms.m4Lose=0;
		}else { 
	       	zd.ms.m4Lose=y;
			itoa(zd.ms.m4Lose,zd.ms.m4_lose,10);
		}
	}
			//大法师 
		z=zd.person.carry-zd.ms.m5_defend;
		if(z!=0) x=zd.ms.m5_hp/z;
		y=(x-1)*(zd.ms.m5_carry-zd.person.defend);
	if(zd.person.carry<=zd.ms.m5_defend||zd.person.hp<=y){
		strcpy(zd.ms.m5_lose,"?????");
	}else{
		if(zd.ms.m5_carry<=zd.person.defend){
			strcpy(zd.ms.m5_lose,"0");
			zd.ms.m5Lose=0;
		}else { 
			zd.ms.m5Lose=y;
			itoa(zd.ms.m5Lose,zd.ms.m5_lose,10);
		}
	}
	return zd;
} 
		//主函数 
int main(void){
	struct hero person={"公主",1,1,0,0,400,6,8,0,0,0,0,0,2};
	struct monster ms={ "小史莱姆怪",100,20,0,"???",1000000, 
						"大史莱姆怪",100,50,0,"???",1000000,
						"邪恶巫师",200,70,10,"???",1000000,
						"双剑武士",300,100,25,"???",1000000,
						"大法师",500,200,60,"???",1000000};
	struct contain zd;
	zd.ms=ms;
	zd.person=person;
	load();
	post();
	background(); 
	scene();
	mention();
	jiazai();
	ShowMap(zd,map1);
	zd=move(zd,map1);
	theme();
	zd=login(zd);
	ShowMap(zd,map2);
	zd=move(zd,map2);
	gameover();
	getch();
} 
		//游戏前的小提醒
int mention(void){
	printf("\n\n\t\t\t游戏小提示:\n");
	printf("\t\t\t游戏前请将输入法切换为英文输入\n");
	printf("\t\t\t向上：w\n");
	printf("\t\t\t向下：s\n");
	printf("\t\t\t向左：a\n");
	printf("\t\t\t向右：d\n");
	printf("\n\t\t\t按任意键继续...\n");
	getch();
	system("cls");
} 
		//剧情——开端——公主的独白 
int scene(void){
	printf("\n\n\n\n\t\tloading");
	int x=0;
	for(x=0;x<7;x++){
 			Sleep(100);
			printf(".");
				 }
 	system("cls");
 	printf("\n\n\n\n    \t\t王子小鑫的独白:\n");Sleep(1000);printf("\t\t\t很");Sleep(200);printf("久");Sleep(200);
 	printf("以");Sleep(200);printf("前");Sleep(500);printf("我");Sleep(200);printf("不");Sleep(200);
 	printf("相\n");Sleep(1000);printf("\t\t\t信");Sleep(500);printf("爱");Sleep(100);printf("情");Sleep(100);
 	printf("直");Sleep(100);printf("到");Sleep(100);printf("有");Sleep(100);printf("一\n");Sleep(1000);
 	printf("\t\t\t天");Sleep(100);printf("遇见了你\n");Sleep(1000);printf("\t\t\t我");Sleep(100);printf("深");Sleep(700);
	printf("情");Sleep(100);printf("的");Sleep(100);printf("爱");Sleep(100);printf("着");Sleep(100);
	printf("你");Sleep(100);printf("啊\n");Sleep(1000);printf("\t\t\t可");Sleep(100);printf("你");Sleep(100);
	printf("突然\n");Sleep(1000);printf("\t\t\t消失");Sleep(100);printf("在");Sleep(100);printf("我的");Sleep(100);
	printf("世");Sleep(100);printf("界\n");Sleep(500);printf("\n\t\t\t按任意键继续...\n");
	getch();
	system("cls");
}
		//剧情——开端——画面渲染
		//字幕一
int postOne(int count){
	printf("\n\n\n");
	switch(count){
		case 4:printf("\t\t***************************************\n");
		case 3:printf("\t\t*       ♀                            *\n");
		case 2:printf("\t\t*             爱的征途                *\n");
		case 1:printf("\t\t*                            ♂       *\n"); 
	   default:printf("\t\t***************************************\n");
	}
} 
		//字幕二 
int postTwo(int count){
	printf("\n\n\n");
	switch(count){
		case 4:printf("\t\t***************************************\n");
		case 3:printf("\t\t*                              ##     *\n");
		case 2:printf("\t\t*        演员：王子小鑫和公主某某     *\n");
		case 1:printf("\t\t*                                     *\n"); 
	   default:printf("\t\t***************************************\n");
	}
}
		//字幕三 
int postThree(int count){
	printf("\n\n\n");
	switch(count){
		case 4:printf("\t\t***************************************\n");
		case 3:printf("\t\t*         导演             №         *\n");
		case 2:printf("\t\t*             金笔连少     №         *\n");
		case 1:printf("\t\t*                      №      ^-^    *\n"); 
	   default:printf("\t\t***************************************\n");
	}
}
		//字幕循环
int post(){
	int count=0,num=1;
	Sleep(1000);
	for(;num!=4;){
		for(;count!=5;){
		switch(num){
			case 1:postOne(count);
				break;
			case 2:postTwo(count);
				break;
			case 3:postThree(count);
				break;
		}
		Sleep(400); 
		system("cls");
		count++;	
	}
	count--;
	for(;count!=-1;){
		switch(num){
			case 1:postOne(count);
				break;
			case 2:postTwo(count);
				break;
			case 3:postThree(count);
				break;
		}
		Sleep(200); 
		system("cls");
		count--;	
	}
	system("cls");
	Sleep(1000);
	count=0;
	num++;
	}
	
} 
		//剧情——背景引入
int background(){
	char test[1000]="\n \n \n \n \t\t\t血 腥 的 风 放 肆 嘲 笑 \n \t\t\t漫 天 的 黄 叶 \n \t\t\t这 古 堡 的 路 \n \t\t\t已 横 尸 遍 野 \n \t\t\t听 说 \n \t\t\t你 落 入 封 闭 的 地 牢 \n \t\t\t发 不 出 求 救 的 讯 号 \n \t\t\t我 折 返 这 古 堡 \n \t\t\t提 着 刀 \n \t\t\t杀 红 了 眼 \n \t\t\t不 依 不 饶 \n";
	char *p ;
	p = strtok(test," ");
	while(p){
		printf("%s",p);
		p = strtok(NULL," ");
		Sleep(100);
	}
	printf("\n\t\t\t按任意键继续\n");
	getch();
	system("cls");
} 
		//正在加载中
int jiazai(){
	int i=0;
	for(i=0;i<1;i++){
	system("cls");
	printf("\n\t\t\t请稍等，正在加载中...\n");Sleep(15);system("cls");
	printf("\t\t\t请\n"); 
	printf("\t\t\t  稍等，正在加载中...\n");Sleep(50);system("cls");
	printf("\t\t\t  稍\n"); 
	printf("\t\t\t请  等，正在加载中...\n");Sleep(50);system("cls");
	printf("\t\t\t    等\n"); 
	printf("\t\t\t请稍  ，正在加载中...\n");Sleep(50);system("cls");
	printf("\t\t\t      ，\n"); 
	printf("\t\t\t请稍等  正在加载中...\n");Sleep(50);system("cls");
	printf("\t\t\t        正\n"); 
	printf("\t\t\t请稍等，  在加载中...\n");Sleep(50);system("cls");
	printf("\t\t\t          在\n"); 
	printf("\t\t\t请稍等，正  加载中...\n");Sleep(50);system("cls");
	printf("\t\t\t            加\n"); 
	printf("\t\t\t请稍等，正在  载中...\n");Sleep(50);system("cls");
	printf("\t\t\t              载\n"); 
	printf("\t\t\t请稍等，正在加  中...\n");Sleep(50);system("cls");
	printf("\t\t\t                中\n"); 
	printf("\t\t\t请稍等，正在加载  ...\n");Sleep(50);system("cls");
	printf("\t\t\t                  .\n"); 
	printf("\t\t\t请稍等，正在加载中 ..\n");Sleep(50);system("cls");
	printf("\t\t\t                   .\n"); 
	printf("\t\t\t请稍等，正在加载中. .\n");Sleep(50);system("cls");
	printf("\t\t\t                    .\n"); 
	printf("\t\t\t请稍等，正在加载中.. \n");Sleep(50);system("cls");
	printf("\n\t\t\t请稍等，正在加载中...\n");Sleep(200);
	system("cls");	
	}	
} 
		//剧情——结尾
int last(){
	printf("\n\n\n\n\t\t\t王");Sleep(300);printf("子");Sleep(300);printf("看");Sleep(300);printf("见");Sleep(500);
	printf("来");Sleep(200);printf("找");Sleep(200);printf("自");Sleep(200);printf("己");Sleep(200);
	printf("的");Sleep(200);printf("公");Sleep(200);printf("主\n");Sleep(2000);
	
	printf("\t\t\t非");Sleep(300);printf("常");Sleep(300);printf("的");Sleep(600);printf("高兴");Sleep(300);
	printf("王子");Sleep(300);printf("小鑫");Sleep(300);printf("将公主");Sleep(300);printf("拥入怀中\n");Sleep(1000);
	
	printf("\t\t王子：\n"); Sleep(2000); printf("\t\t\t我");Sleep(200);printf("以为");Sleep(200);
	printf("在也");Sleep(200);printf("见不到");Sleep(200);printf("你了！");Sleep(3000);printf("\n\t\t\t两");Sleep(400);
	printf("人");Sleep(400);printf("紧");Sleep(400);printf("紧");Sleep(400);printf("相");Sleep(400);
	printf("拥\n");Sleep(5000);printf("\t\t公主：\n");Sleep(2000);printf("\t\t\t距离");Sleep(1000);
	printf("终究");Sleep(300);printf("没");Sleep(700);printf("能阻挡");Sleep(200);printf("我们");Sleep(200);
	printf("的爱\n");Sleep(2000);
	
	printf("\t\t\t我不想");Sleep(700);printf("失去");Sleep(200);printf("你，");Sleep(200);printf("可是");Sleep(200);
	printf("我。。。。\n");Sleep(2000);printf("\t\t\t我的");Sleep(200);printf("王子殿下");Sleep(200);printf("我");Sleep(200);
	printf("爱");Sleep(200);printf("你\n");Sleep(2000);
	
	printf("\n\t\t\t公");Sleep(700);printf("主");Sleep(200);printf("转");Sleep(200);printf("身");Sleep(200);
	printf("\n");Sleep(2000);printf("\t\t\t黑");Sleep(200);printf("白");Sleep(200);printf("分");Sleep(200);
	printf("明");Sleep(200);printf("的");Sleep(200);printf("眼");Sleep(200);printf("眸");Sleep(700);
	printf("泛");Sleep(200);printf("着");Sleep(200);printf("红");Sleep(200);printf("宝");Sleep(200);
	printf("石");Sleep(200);printf("一");Sleep(200);printf("样");Sleep(200);
	printf("的");Sleep(700);printf("光");Sleep(200);printf("泽\n");Sleep(2000);
	
	printf("\n\t\t\t她");Sleep(700);printf("又一次");Sleep(300);printf("消失");Sleep(200);
	printf("不见\n");Sleep(2000);
	
	printf("\t\t王");Sleep(700);printf("子");Sleep(300);printf("痛");Sleep(200);printf("哭：\n");Sleep(5000);
	
	printf("\t\t\t我一定");Sleep(1000);printf("把你");Sleep(1000);printf("找");Sleep(1000);printf("回来！！\n");
	printf("\n\n\t\t\t按任意键继续\n");
	getch();
}  
 		//进度条
int load(void){
	int i=0,j=0,count=0;
	system("color 73");
	for(i=0;i<=50;i++){
		printf("\n\n\n\n\t\t\t\t     Installing%d%%\n",count);
		for(j=0;j<=count/2;j++){
			printf("_");
		}
		if(count!=100){
			count=count+2;
			Sleep(10);
			system("cls");
		}else {
			printf("\n");
			Sleep(500);
			system("cls");
			return 0;
		}
	}
} 
		//效果一
int actionOne(){
	Sleep(1000);
	system("color 75");
	Sleep(1000);
	system("color 71");
	Sleep(1000);
	system("color 72");
	Sleep(1000);
	system("color 74");
	Sleep(1000);
	system("color 70");
	system("cls");
} 
		//蘑菇
int monsterOne(){
	system("cls");
	printf("\n\n");
	printf("\t\t\t\t可爱的蘑菇甜甜\n\n"); 
	printf("\t\t\t           ''''''         	  \n");
	printf("\t\t\t        ''''''''''''         \n");
	printf("\t\t\t      '''''''''''''''§      \n");
	printf("\t\t\t    ''''''''''''''''''''     \n");
	printf("\t\t\t   ''''''''''''''''''''''''   \n");
	printf("\t\t\t  ''''''''灬灬灬灬灬 '''''''  \n");
	printf("\t\t\t  '''''''〞≯   ≮  〃''''''' \n");
	printf("\t\t\t   ''''''〞      ミ 〃''''''  \n");
	printf("\t\t\t      〃〃   ︺     〃〃      \n");
	printf("\t\t\t         ''''''''''''         \n");
	printf("\t\t\t         ''''''''''''         \n");
	printf("\t\t\t         ''''''''''''         \n");
	printf("\t\t\t         ''''''''''''         \n");
	printf("\t\t\t         ''''''''''''         \n");
	printf("\t\t\t          ''''''''''          \n");
} 
		//女巫
int monsterTwo(){
		system("cls");
		printf("\n\n");
		printf("\t\t\t      可恶的巫婆\n\n"); 
		printf("\t\t\t           @@@\n");
		printf("\t\t\t          #   #\n");
		printf("\t\t\t         / \\     \n");
		printf("\t\t\t       /  @-.\\\n");
		printf("\t\t\t     /_  )\\\\  _\\\n");
		printf("\t\t\t    /\\/\\/ | \\/\\/\\\n");
		printf("\t\t\t\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\n");
		printf("\t\t\t       /~~~~~\\\n");
		printf("\t\t\t      |  ^ ^  |\n");
		printf("\t\t\t      |   .   |\n");
		printf("\t\t\t      | (\\_/) |\n");
		printf("\t\t\t  / .-. \\___/ .-. \\\n");
		printf("\t\t\t @/` /.-.   .-.\\ `\\@\n");
		printf("\t\t\t    @`   \\ /   `@\n");
		printf("\n");
		printf("\n");
} 
			//厨师 
int monsterThree(){
	system("cls");
	printf("\n\n");
	printf("\t\t\t      奇厨师佳倩\n\n");
	printf("\t\t               〃〃〃         	\n");
	printf("\t\t             ≈≈≈≈№         \n");
	printf("\t\t           ≈≈≈≈ㄨ ξζ      \n");
	printf("\t\t          ≈≈灬灬灬灬灬ξξ    \n");
	printf("\t\t        √∫∫∫       ζξξ   \n");
	printf("\t\t       ∫∫∫∫ E    E   ζξξ \n");
	printf("\t\t       ∫∫∫∫~       ミζξξ \n");
	printf("\t\t       ∫∫∫∫    -     ζξξ \n");
	printf("\t\t       ∫∫∫∫      ㄨ         \n");
	printf("\n\n\n\n");
}
		//移动的总函数 
struct contain move(struct contain zd,int a[20][20]){
	for(;;){
		char position=getch();
	switch(position){
		case 'w':zd=moveUp(zd,a);
	 			 system("cls");
	 			 zd=ShowMap(zd,a);
				 break;
	 	case 'a':zd=moveLeft(zd,a);
	 	         system("cls");
	 			 zd=ShowMap(zd,a);
				 break;
	 	case 's':zd=moveDown(zd,a);
	 			 system("cls");
	 			 zd=ShowMap(zd,a);
				 break;
	 	case 'd':zd=moveRight(zd,a);
	 		if(zd.person.is_over==0){
		 	   	 system("cls");
	 			 zd=ShowMap(zd,a);
		 	} 
		 		 break;
	 	case 'c':		//查看人物信息 
		 	if(zd.person.actor==1){
	 			zd=information(zd,a);
	 			 system("cls");
	 			 zd=ShowMap(zd,a);
	 		}
				 break;
 		case 'p':		//进入商店 
		 	if(zd.person.shop==1){
	 			zd=SHOP(zd);
	 			 system("cls");
	 			 zd=ShowMap(zd,a);
	 		}
				 break;
	 	case 'b':		//查看怪物图谱 
  			if(zd.person.backpack==1){
			  	zd=monsterBP(zd,a);
	 			 system("cls");
	 			 zd=ShowMap(zd,a);
			  }
				 break;
	}	
	if(zd.person.is_over==1){
		return zd;
	}
	}
	return zd;
} 
		//向上移动 
struct contain moveUp(struct contain zd,int a[20][20]){
	if(a[zd.person.z_x-1][zd.person.z_y]==3||a[zd.person.z_x-1][zd.person.z_y]==13){//下一步是空格 
		a[zd.person.z_x][zd.person.z_y]=3;
		a[zd.person.z_x-1][zd.person.z_y]=2;
		zd.person.z_x=zd.person.z_x-1;
	}else if(a[zd.person.z_x-1][zd.person.z_y]==4){			//收集镇魂之玉 
		a[zd.person.z_x-1][zd.person.z_y]=3;
		system("cls");
		zd.person.jade++;
		printf("\n\n\t\t收集到%d个镇魂之玉\n\t\t集齐4个镇魂之玉才可以救王子",zd.person.jade);
		if(zd.person.jade==4){
			getch();
			system("cls");
			printf("\n\n\t\t你已集齐4颗镇魂之玉\n\t\t快去救你的王子吧\n");
		}
		getch();
	}else if(a[zd.person.z_x-1][zd.person.z_y]==10){		//激活怪物图谱 
		system("cls");
		printf("\n\n\t\t\t智者：\n\t\t\t    恭喜你获得怪物图谱一本，\n\t\t\t    游戏中按b键可随时查看怪物信息\n");
		zd.person.backpack=1;
		a[zd.person.z_x-1][zd.person.z_y]=3;
		getch();
	}else if(a[zd.person.z_x-1][zd.person.z_y]==14){//下一步是小史莱姆怪 
		if(zd.person.hp>zd.ms.m1Lose){
			a[zd.person.z_x-1][zd.person.z_y]=3;
			zd=fightM1(zd); 
		}else {
			faild(zd);
		} 
	}else if(a[zd.person.z_x-1][zd.person.z_y]==15){//下一步是大史莱姆怪 
		if(zd.person.hp>zd.ms.m2Lose){
			a[zd.person.z_x-1][zd.person.z_y]=3;
			zd=fightM2(zd); 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x-1][zd.person.z_y]==16){//下一步是邪恶巫师 
		if(zd.person.hp>zd.ms.m3Lose){
			a[zd.person.z_x-1][zd.person.z_y]=3;
			zd=fightM3(zd); 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x-1][zd.person.z_y]==17){//下一步是双剑武士 
		if(zd.person.hp>zd.ms.m4Lose){
			a[zd.person.z_x-1][zd.person.z_y]=3;
			zd=fightM4(zd); 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x-1][zd.person.z_y]==100){//下一步是大法师 
		if(zd.person.hp>zd.ms.m5Lose){
			a[zd.person.z_x-1][zd.person.z_y]=3;
			zd=fightM5(zd);
			zd.person.is_over=1;
			return zd; 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x-1][zd.person.z_y]==18){//下一步是加攻击力2点 
		zd=addCarry(zd);
		a[zd.person.z_x-1][zd.person.z_y]=3;
	}
	else if(a[zd.person.z_x-1][zd.person.z_y]==19){//下一步是加防御力2点 
		zd=addDefend(zd);
		a[zd.person.z_x-1][zd.person.z_y]=3;
	}
	else if(a[zd.person.z_x-1][zd.person.z_y]==23){//下一步是加攻击力10点 
		zd=addCarry10(zd);
		a[zd.person.z_x-1][zd.person.z_y]=3;
	}
	else if(a[zd.person.z_x-1][zd.person.z_y]==24){//下一步是加防御力10点 
		zd=addDefend10(zd);
		a[zd.person.z_x-1][zd.person.z_y]=3;
	}else if(a[zd.person.z_x-1][zd.person.z_y]==7){//下一步是加血200 
		zd=addHp(zd);
		a[zd.person.z_x-1][zd.person.z_y]=3;
	}
	return zd;
}
 		//向下移动 
struct contain moveDown(struct contain zd,int a[20][20]){
	if(a[zd.person.z_x+1][zd.person.z_y]==3||a[zd.person.z_x+1][zd.person.z_y]==13){//向下一步是空格 
		a[zd.person.z_x][zd.person.z_y]=3;
		a[zd.person.z_x+1][zd.person.z_y]=2;
		zd.person.z_x=zd.person.z_x+1;
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==12){//下一步是下一楼 
		zd.person.floor=1;
		ShowMap(zd,map2);
		zd.person.z_x=1;
		zd.person.z_y=1; 
		zd=move(zd,map2);
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==21){//下一步是上三楼 
		zd.person.floor=3;
		ShowMap(zd,map4);
		zd.person.z_x=17;
		zd.person.z_y=9;
		zd=move(zd,map4);
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==22){//下一步是下二楼 
		zd.person.floor=2;
		ShowMap(zd,map3);
		zd.person.z_x=17;
		zd.person.z_y=17;
		zd=move(zd,map3);
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==31){//下一步是上四楼 
		zd.person.floor=4;
		ShowMap(zd,map5);
		zd.person.z_x=17;
		zd.person.z_y=2;
		zd=move(zd,map5);
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==32){//下一步是下三楼 
		zd.person.floor=3;
		ShowMap(zd,map4);
		zd.person.z_x=17;
		zd.person.z_y=2;
		zd=move(zd,map4);
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==41){//下一步是上五楼 
		zd.person.floor=5;
		ShowMap(zd,map6);
		zd.person.z_x=17;
		zd.person.z_y=17;
		zd=move(zd,map6);
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==42){//下一步是下四楼 
		zd.person.floor=4;
		ShowMap(zd,map5);
		zd.person.z_x=17;
		zd.person.z_y=17;
		zd=move(zd,map5);
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==5) {		//向下一步是第一个怪物 (1)
		jiazai();
		monsterOne();
		sceneFirst();
		a[zd.person.z_x+1][zd.person.z_y]=3;
	}else if(a[zd.person.z_x+1][zd.person.z_y]==50) {		//向下一步是第一个怪物 (2)
		jiazai();
		monsterOne();
		sceneFirstII();
		a[zd.person.z_x+1][zd.person.z_y]=3;
	}else if(a[zd.person.z_x+1][zd.person.z_y]==8) {		//向下一步是第二个怪物 
		jiazai();
		monsterTwo();
		sceneSecond();
		a[zd.person.z_x+1][zd.person.z_y]=3;
	}else if(a[zd.person.z_x+1][zd.person.z_y]==9) {		//向下一步是第三个怪物 
		jiazai();
		monsterThree();
		sceneThird();
		a[zd.person.z_x+1][zd.person.z_y]=3;
	}else if(a[zd.person.z_x+1][zd.person.z_y]==14){//下一步是小史莱姆怪 
		if(zd.person.hp>zd.ms.m1Lose){
			a[zd.person.z_x+1][zd.person.z_y]=3;
			zd=fightM1(zd); 
		}else {
			faild(zd);
		} 
	}else if(a[zd.person.z_x+1][zd.person.z_y]==15){//下一步是大史莱姆怪 
		if(zd.person.hp>zd.ms.m2Lose){
			a[zd.person.z_x+1][zd.person.z_y]=3;
			zd=fightM2(zd); 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==16){//下一步是邪恶巫师 
		if(zd.person.hp>zd.ms.m3Lose){
			a[zd.person.z_x+1][zd.person.z_y]=3;
			zd=fightM3(zd); 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==17){//下一步是双剑武士 
		if(zd.person.hp>zd.ms.m4Lose){
			a[zd.person.z_x+1][zd.person.z_y]=3;
			zd=fightM4(zd); 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==18){//下一步是加攻击力2点 
		zd=addCarry(zd);
		a[zd.person.z_x+1][zd.person.z_y]=3;
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==19){//下一步是加防御力2点 
		zd=addDefend(zd);
		a[zd.person.z_x+1][zd.person.z_y]=3;
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==23){//下一步是加攻击力10点 
		zd=addCarry10(zd);
		a[zd.person.z_x+1][zd.person.z_y]=3;
	}
	else if(a[zd.person.z_x+1][zd.person.z_y]==24){//下一步是加防御力10点 
		zd=addDefend10(zd);
		a[zd.person.z_x+1][zd.person.z_y]=3;
	}else if(a[zd.person.z_x+1][zd.person.z_y]==7){//下一步是加血200 
		zd=addHp(zd);
		a[zd.person.z_x+1][zd.person.z_y]=3;
	}else if(a[zd.person.z_x+1][zd.person.z_y]==4){
		a[zd.person.z_x+1][zd.person.z_y]=3;
		system("cls");
		zd.person.jade++;
		printf("\n\n\t\t收集到%d个镇魂之玉\n\t\t集齐4个镇魂之玉才可以救王子",zd.person.jade);
		if(zd.person.jade==4){
			getch();
			system("cls");
			printf("\n\n\t\t你已集齐4颗镇魂之玉\n\t\t快去救你的王子吧\n");
		}
		getch();
	}
	return zd;
}
 		//向左移动 
struct contain moveLeft(struct contain zd,int a[20][20]){
	if(a[zd.person.z_x][zd.person.z_y-1]==3||a[zd.person.z_x][zd.person.z_y-1]==13){//下一步是空格 
		a[zd.person.z_x][zd.person.z_y]=3;
		a[zd.person.z_x][zd.person.z_y-1]=2;
		zd.person.z_y=zd.person.z_y-1;
	}else if(a[zd.person.z_x][zd.person.z_y-1]==11){//下一步是上二楼 
		zd.person.floor=2;
		ShowMap(zd,map3);
		zd.person.z_x=17;
		zd.person.z_y=2;
		zd=move(zd,map3);
	}else if(a[zd.person.z_x][zd.person.z_y-1]==14){//下一步是小史莱姆怪 
		if(zd.person.hp>zd.ms.m1Lose){
			a[zd.person.z_x][zd.person.z_y-1]=3;
			zd=fightM1(zd); 
		}else {
			faild(zd);
		} 
	}else if(a[zd.person.z_x][zd.person.z_y-1]==15){//下一步是大史莱姆怪 
		if(zd.person.hp>zd.ms.m2Lose){
			a[zd.person.z_x][zd.person.z_y-1]=3;
			zd=fightM2(zd); 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x][zd.person.z_y-1]==16){//下一步是邪恶巫师 
		if(zd.person.hp>zd.ms.m3Lose){
			a[zd.person.z_x][zd.person.z_y-1]=3;
			zd=fightM3(zd); 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x][zd.person.z_y-1]==17){//下一步是双剑武士 
		if(zd.person.hp>zd.ms.m4Lose){
			a[zd.person.z_x][zd.person.z_y-1]=3;
			zd=fightM4(zd); 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x][zd.person.z_y-1]==18){//下一步是加攻击力2点 
		zd=addCarry(zd);
		a[zd.person.z_x][zd.person.z_y-1]=3;
	}
	else if(a[zd.person.z_x][zd.person.z_y-1]==19){//下一步是加防御力2点 
		zd=addDefend(zd);
		a[zd.person.z_x][zd.person.z_y-1]=3;
	}
	else if(a[zd.person.z_x][zd.person.z_y-1]==23){//下一步是加攻击力10点 
		zd=addCarry10(zd);
		a[zd.person.z_x][zd.person.z_y-1]=3;
	}
	else if(a[zd.person.z_x][zd.person.z_y-1]==24){//下一步是加防御力10点 
		zd=addDefend10(zd);
		a[zd.person.z_x][zd.person.z_y-1]=3;
	}else if(a[zd.person.z_x][zd.person.z_y-1]==7){//下一步是加血200 
		zd=addHp(zd);
		a[zd.person.z_x][zd.person.z_y-1]=3;
	}else if(a[zd.person.z_x][zd.person.z_y-1]==25){//下一步是商店
		zd=openshop(zd);
		a[zd.person.z_x][zd.person.z_y-1]=3;
	}
	return zd;
}
 		//向右移动 
struct contain moveRight(struct contain zd,int a[20][20]){
	if(a[zd.person.z_x][zd.person.z_y+1]==3||a[zd.person.z_x][zd.person.z_y+1]==13){//下一步是空格 
		a[zd.person.z_x][zd.person.z_y]=3;
		a[zd.person.z_x][zd.person.z_y+1]=2;
		zd.person.z_y=zd.person.z_y+1;
	}else if(a[zd.person.z_x][zd.person.z_y+1]==6&&zd.person.jade==4){		//游戏铺垫完毕 
		system("cls");
		last();
		gameBegin();
		zd.person.is_over=1;
		zd.person.z_x=18;
		zd.person.z_y=10;
		return zd;
	}else if(a[zd.person.z_x][zd.person.z_y+1]==14){//下一步是小史莱姆怪 
		if(zd.person.hp>zd.ms.m1Lose){
			a[zd.person.z_x][zd.person.z_y+1]=3;
			zd=fightM1(zd); 
		}else {
			faild(zd);
		} 
	}else if(a[zd.person.z_x][zd.person.z_y+1]==15){//下一步是大史莱姆怪 
		if(zd.person.hp>zd.ms.m2Lose){
			a[zd.person.z_x][zd.person.z_y+1]=3;
			zd=fightM2(zd); 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x][zd.person.z_y+1]==16){//下一步是邪恶巫师 
		if(zd.person.hp>zd.ms.m3Lose){
			a[zd.person.z_x][zd.person.z_y+1]=3;
			zd=fightM3(zd); 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x][zd.person.z_y+1]==17){//下一步是双剑武士 
		if(zd.person.hp>zd.ms.m4Lose){
			a[zd.person.z_x][zd.person.z_y+1]=3;
			zd=fightM4(zd); 
		}else {
			faild(zd);
		} 
	}
	else if(a[zd.person.z_x][zd.person.z_y+1]==18){//下一步是加攻击力2点 
		zd=addCarry(zd);
		a[zd.person.z_x][zd.person.z_y+1]=3;
	}
	else if(a[zd.person.z_x][zd.person.z_y+1]==19){//下一步是加防御力2点 
		zd=addDefend(zd);
		a[zd.person.z_x][zd.person.z_y+1]=3;
	}
	else if(a[zd.person.z_x][zd.person.z_y+1]==23){//下一步是加攻击力10点 
		zd=addCarry10(zd);
		a[zd.person.z_x][zd.person.z_y+1]=3;
	}
	else if(a[zd.person.z_x][zd.person.z_y+1]==24){//下一步是加防御力10点 
		zd=addDefend10(zd);
		a[zd.person.z_x][zd.person.z_y+1]=3;
	}else if(a[zd.person.z_x][zd.person.z_y+1]==7){//下一步是加血200 
		zd=addHp(zd);
		a[zd.person.z_x][zd.person.z_y+1]=3;
	}
	return zd;
}
		//查看人物信息
struct contain information(struct contain zd,int a[20][20]){
	system("cls");
	printf("\n\n\t\t\t    人物属性\n");
	printf("\t\t\t昵称  ：%s\n",zd.person.name);
	printf("\t\t\t生命值：%d\n",zd.person.hp);
	printf("\t\t\t攻击  ：%d\n",zd.person.carry);
	printf("\t\t\t防御  ：%d\n",zd.person.defend);
	printf("\t\t\t金币  ：%d\n",zd.person.fortune);
	printf("\n\t\t\t按任意键返回\n");
	getch();
	return zd;
} 
		//怪物图谱
struct contain monsterBP(struct contain zd,int a[20][20]){
	system("cls");
	printf("\n\t\t\t\t    <怪物图谱>\n\n");
	printf("\t○:%-10s   血量：%4d  攻击：%-4d   防御：%-4d   损血：%s\n\n",zd.ms.m1_name,zd.ms.m1_hp,zd.ms.m1_carry,zd.ms.m1_defend,zd.ms.m1_lose); 
	printf("\t◎:%-10s   血量：%4d  攻击：%-4d   防御：%-4d   损血：%s\n\n",zd.ms.m2_name,zd.ms.m2_hp,zd.ms.m2_carry,zd.ms.m2_defend,zd.ms.m2_lose); 
	printf("\t☆:%-10s   血量：%4d  攻击：%-4d   防御：%-4d   损血：%s\n\n",zd.ms.m3_name,zd.ms.m3_hp,zd.ms.m3_carry,zd.ms.m3_defend,zd.ms.m3_lose); 
	printf("\t¤:%-10s   血量：%4d  攻击：%-4d   防御：%-4d   损血：%s\n\n",zd.ms.m4_name,zd.ms.m4_hp,zd.ms.m4_carry,zd.ms.m4_defend,zd.ms.m4_lose); 
	printf("\t№:%-10s   血量：%4d  攻击：%-4d   防御：%-4d   损血：%s\n\n",zd.ms.m5_name,zd.ms.m5_hp,zd.ms.m5_carry,zd.ms.m5_defend,zd.ms.m5_lose); 
	getch();
	return zd;
} 
		//商店 
struct contain SHOP(struct contain zd){
	for(;;){
		system("cls");
		printf("\n\t\t\t\t  <魔法商店>\n\n");
		printf("\t\t\t亲爱的%s，花%d金币你可以购买\n\n",zd.person.name,zd.person.money);
		printf("\t\t\t\tj 、2点攻击力\n\n"); 
		printf("\t\t\t\tk 、2点防御力\n\n");
		printf("\t\t\t\tl 、离开\n\n"); 
		printf("\t\t\t您当前金币余额为：%d\n\n\t\t\t请输入你选择的项目代号（如 j ）：\n\n",zd.person.fortune);
		char num1=getchar();
		char num=getchar();
		switch(num){
			case 'j':if(zd.person.fortune>=zd.person.money){		//加攻击力2点 
				system("cls");
				zd.person.fortune=zd.person.fortune-zd.person.money;
				zd.person.carry=zd.person.carry+2;
				zd.person.money=zd.person.money*2;
				printf("\n\n\t\t\t您的攻击力提升了2点\n\n");
				printf("\t\t\t当前攻击力为：%d\n\n",zd.person.carry);
				printf("\t\t\t您还剩下金币：%d\n\n",zd.person.fortune);
				printf("\t\t\t按任意键返回\n");
				getch();
				return zd;
			}else {
				system("cls");
				printf("\n\n\t\t\t很抱歉，您没有足够的金币\n\n");
				printf("\t\t\t按任意键返回\n");
				getch();
				return zd;
			}break;
			case 'k':if(zd.person.fortune>=zd.person.money){		//加防御力2点 
				system("cls");
				zd.person.fortune=zd.person.fortune-zd.person.money;
				zd.person.defend=zd.person.defend+2;
				zd.person.money=zd.person.money*2;
				printf("\n\n\t\t\t您的防御力提升了2点\n\n");
				printf("\t\t\t当前防御力为：%d\n\n",zd.person.defend);
				printf("\t\t\t您还剩下金币：%d\n\n",zd.person.fortune);
				printf("\t\t\t按任意键返回\n");
				getch();
				return zd;
			}else {
				system("cls");
				printf("\n\n\t\t\t很抱歉，您没有足够的金币\n\n");
				printf("\t\t\t按任意键返回\n");
				getch();
				return zd;
			}break;
			case 'l': return zd;								//返回 
					break;
			default:system("cls");							//输入错误 
					printf("\n\n\t\t\t输入错误！！！\n\n");
					printf("\t\t\t按任意键返回\n");
					getch();
					return zd; 
		}	
	}
	return zd;
} 
int sceneFirst(void){
	getch();
	system("cls");
	printf("\t\t===============================\n");
	printf("\t\t\t路遇野生蘑菇一枚\n");
	printf("\t\t===============================\n\n");getch();
	printf("\t\t公主(嗨森)：\n\t\t\t好可爱啊！\n");getch();
	printf("\t\t蘑菇甜甜（微笑）：\n\t\t\t带我回家吧，我会陪你度过很多美好时光.\n");getch();
	printf("\t\t公主（皱眉）：\n\t\t\t对不起哦，我已经有陪我度过美好时光的人了，我要去找他\n");getch();
	printf("\t\t蘑菇甜甜（难过）：\n\t\t\t那你只有把我杀了才可以过去\n");getch();
	printf("\t\t公主带着浅浅笑意，缓缓起身\n");getch();
	printf("\t\t轻轻合上刀剑，徐徐前行\n");getch();
	system("cls");
	return 0;
} 
int sceneFirstII(void){
	getch();
	system("cls");
	printf("\t\t===============================\n");
	printf("\t\t\t路遇野生蘑菇一枚\n");
	printf("\t\t===============================\n\n");getch();
	printf("\t\t蘑菇甜甜（平静）：\n\t\t\t如果再给你一次机会，你会选我吗？\n");getch();
	printf("\t\t公主（冷漠）：\n\t\t\t不会\n");getch();
	printf("\t\t蘑菇甜甜（难过）：\n\t\t\t去拿下一个镇魂之玉吧，早点救到王子。\n");getch();
	system("cls");
	return 0;
}
int sceneSecond(void){
	getch();
	system("cls");
	printf("\t\t===============================\n");
	printf("\t\t\t遭遇到可恶的巫婆\n");
	printf("\t\t===============================\n\n");getch();
	printf("\t\t巫婆（笑盈盈）：\n\t\t\t年轻的公主哟，我有一件奇幻连衣裙，穿上它，\n");getch();
	printf("\t\t你将成为举世瞩目的人，倾国倾城\n");
	printf("\t\t公主（警觉）：\n\t\t\t交换条件是什么？\n");getch();
	printf("\t\t巫婆（笑盈盈）：\n\t\t\t你只需要原路返回，王子的身体供我享乐\n");getch();
	printf("\t\t公主（大怒）：\n\t\t\t淫邪的巫婆，我要杀了你\n");getch();
	printf("\t\t巫婆（阴险地笑）：\n\t\t\t那就没办法了，出手吧！\n");getch();
	printf("\t\t公主轻笑，再一次展示了杀手素养。\n");getch();
	system("cls");
	return 0; 
}
int sceneThird(void){
	getch();
	system("cls");
	printf("\t\t===============================\n");
	printf("\t\t\t 遇到西国奇厨师\n");
	printf("\t\t===============================\n\n");getch();
	printf("\t\t某某（冷漠）：\n\t\t\t能走到这儿，我想你已经很清楚，\n");getch();
	printf("\t\t要通过去古堡的路，必须...除掉我们这群暧昧党\n");
	printf("\t\t公主拔剑：\n\t\t\t来吧\n");getch();
	printf("\t\t空气中弥漫着各种情仇的味道\n");getch();
	printf("\t\t公主举剑，直刺向某某心脏\n");getch();
	printf("\t\t20cm,某某没有动静\n");getch();
	printf("\t\t10cm,某某没有动静\n");getch();
	printf("\t\t鲜血殷红了某某白色的衣服\n");getch();
	printf("\t\t某某：\n\t\t\t你过去吧\n");getch();
	printf("\t\t公主愣住两秒，用力抽出满是鲜血的剑\n");getch();
	printf("\t\t公主前行,她一句话，又停住脚步\n");getch();
	printf("\t\t某某：\n\t\t\t我和你有相似的过往\n");getch();
	system("cls");
	return 0;
}
int gameBegin(void){
	system("cls"); 
	system("color 07");
	char test[1000]="\n\n\n\t\t\t你 以 为 我 们 的 游 戏 已 经 结 束 了 ？那 只 是 背 景 介 绍， \n\t\t\t 游 戏 才 刚 刚 开 始\n";
	char *p ;
	p = strtok(test," ");
	while(p){
		printf("%s",p);
		p = strtok(NULL," ");
		Sleep(100);
	}
	printf("\n\t\t\t按任意键继续...\n");
	getch();
	system("cls");
}
		//正式的游戏
int theme(){
	int j=1;
	switch(j){
		case 1:one();printf("\t\t■======公主救王子======■\n");two();
		case 2:one();printf("\t\t■======公主救王  ======■\n");two();
		case 3:one();printf("\t\t■======公主救    ======■\n");two();
		case 4:one();printf("\t\t■======公主      ======■\n");two();
		case 5:one();printf("\t\t■======公        ======■\n");two();
		case 6:one();printf("\t\t■======          ======■\n");two();
		case 7:one();printf("\t\t■======王        ======■\n");two();
		case 8:one();printf("\t\t■======王子      ======■\n");two();
		case 9:one();printf("\t\t■======王子救    ======■\n");two();
		case 10:one();printf("\t\t■======王子救公  ======■\n");two();
		case 11:one();printf("\t\t■======王子救公主======■\n");two();
	}
	printf("\n\n\t\t■■■■■■■■■■■■■\n");
	printf("\t\t■======================■\n");
	printf("\t\t■====== 爱的征途 ======■\n");
	printf("\t\t■======================■\n");
	printf("\t\t■■■■■■■■■■■■■\n");
	printf("\n\n\t\t\t按任意键继续...\n");
	getch();
} 
int one(){
	printf("\n\n\t\t■■■■■■■■■■■■■\n");
	printf("\t\t■======================■\n");
}
int two(){
	printf("\t\t■======================■\n");
	printf("\t\t■■■■■■■■■■■■■\n");
	Sleep(150);
	system("cls");	
}
		//玩家注册
struct contain login(struct contain zd){
	int i=0;
	for(i=0;i<3;i++){
		printf("\n\n\n\t\t\t你是王子，请输入你的角色名：\n");
		Sleep(5);
		system("color f2"); 
		system("cls");
		printf("\n\n\n\t\t\t 你是王子，请输入你的角色名：\n");
		Sleep(5);
		system("color f4");
		system("cls");
	} 
	system("color f0");
	printf("\n\n\n\t\t\t你是王子，请输入你的角色名：\n\t\t\t\t");
	scanf("%s",&zd.person.name);
	system("cls");
	printf("\n\n\t\t\t    人物属性\n");
	printf("\t\t\t昵称  ：%s\n",zd.person.name);
	printf("\t\t\t生命值：%d\n",zd.person.hp);
	printf("\t\t\t攻击  ：%d\n",zd.person.carry);
	printf("\t\t\t防御  ：%d\n",zd.person.defend);
	printf("\t\t\t金币  ：%d\n",zd.person.fortune);
	printf("\n\t\t游戏过程中可按‘c’键查看人物属性\n");
	getch();
	zd.person.is_over=0;
	zd.person.actor=1;
	zd.person.floor=1;
	return zd;
} 
		//打不过
int faild(struct contain zd){
	system("cls");
	printf("\n\n\t\t亲爱的%s，你还打不过它！\n",zd.person.name);
	printf("\n\t\t按任意键返回\n");
	getch();
	return 0;
} 
		//和小史莱姆怪打斗 
struct contain fightM1(struct contain zd){
	zd.person.hp=zd.person.hp-zd.ms.m1Lose; 
	zd.person.fortune=zd.person.fortune+10;
	system("cls");
	printf("\n\n\t\t您损失了%d点血，打败了%s\n",zd.ms.m1Lose,zd.ms.m1_name);
	printf("\t\t获得金币：10\n"); 
	printf("\n\t\t按任意键返回\n");
	getch();
	return zd;
}
		//和大史莱姆怪打斗 
struct contain fightM2(struct contain zd){
	zd.person.hp=zd.person.hp-zd.ms.m2Lose; 
	zd.person.fortune=zd.person.fortune+20;
	system("cls");
	printf("\n\n\t\t您损失了%d点血，打败了%s\n",zd.ms.m2Lose,zd.ms.m2_name);
	printf("\t\t获得金币：20\n"); 
	printf("\n\t\t按任意键返回\n");
	getch();
	return zd;
}
		//和邪恶巫师打斗 
struct contain fightM3(struct contain zd){
	zd.person.hp=zd.person.hp-zd.ms.m3Lose; 
	zd.person.fortune=zd.person.fortune+50;
	system("cls");
	printf("\n\n\t\t您损失了%d点血，打败了%s\n",zd.ms.m3Lose,zd.ms.m3_name);
	printf("\t\t获得金币：50\n"); 
	printf("\n\t\t按任意键返回\n");
	getch();
	return zd;
}
		//和双剑武士打斗 
struct contain fightM4(struct contain zd){
	zd.person.hp=zd.person.hp-zd.ms.m4Lose; 
	zd.person.fortune=zd.person.fortune+100;
	system("cls");
	printf("\n\n\t\t您损失了%d点血，打败了%s\n",zd.ms.m4Lose,zd.ms.m4_name);
	printf("\t\t获得金币：100\n"); 
	printf("\n\t\t按任意键返回\n");
	getch();
	return zd;
}
		//和大法师打斗 
struct contain fightM5(struct contain zd){
	zd.person.hp=zd.person.hp-zd.ms.m5Lose; 
	zd.person.fortune=zd.person.fortune+1000;
	system("cls");
	printf("\n\n\t\t您损失了%d点血，打败了%s\n",zd.ms.m5Lose,zd.ms.m5_name);
	printf("\t\t获得金币：1000\n"); 
	printf("\n\t\t按任意键返回\n");
	getch();
	return zd;
}
		//加攻击力2点
struct contain addCarry(struct contain zd){
	zd.person.carry=zd.person.carry+2; 
	system("cls");
	printf("\n\n\t\t您的攻击力提升了2点\n");
	printf("\n\t\t按任意键返回\n");
	getch();
	return zd;
}	 
		//加防御力2点
struct contain addDefend(struct contain zd){
	zd.person.defend=zd.person.defend+2; 
	system("cls");
	printf("\n\n\t\t您的防御力提升了2点\n");
	printf("\n\t\t按任意键返回\n");
	getch();
	return zd;
}
		//加攻击力10点
struct contain addCarry10(struct contain zd){
	zd.person.carry=zd.person.carry+10; 
	system("cls");
	printf("\n\n\t\t您的攻击力提升了10点\n");
	printf("\n\t\t按任意键返回\n");
	getch();
	return zd;
}	 
		//加防御力10点
struct contain addDefend10(struct contain zd){
	zd.person.defend=zd.person.defend+10; 
	system("cls");
	printf("\n\n\t\t您的防御力提升了10点\n");
	printf("\n\t\t按任意键返回\n");
	getch();
	return zd;
}
		//加血 
struct contain addHp(struct contain zd){
	zd.person.hp=zd.person.hp+200;
	system("cls");
	printf("\n\n\t\t您的血量提升了200点\n");
	printf("\n\t\t按任意键返回\n");
	getch();
	return zd;
}
		//商店
struct contain openshop(struct contain zd){
	zd.person.shop=1;
	system("cls");
	printf("\n\n\t\t您已经激活商店\n\n");
	printf("\t\t在游戏进程中按'p'键可随时购买商品\n");
	printf("\n\t\t按任意键返回\n");
	getch();
	return zd;
}
		//全剧终
int gameover(){
	system("cls");
	printf("\n\n\t\t王子：我拿一生去信仰，赌注为我相信的爱情。梦琪，我们永远都不要分开了好吗？\n");
	printf("\n\t\t按任意键继续\n");
	getch();
	system("cls");
	printf("\n\n\t\t谢谢您的试玩\n");
	getch(); 
}	 

```