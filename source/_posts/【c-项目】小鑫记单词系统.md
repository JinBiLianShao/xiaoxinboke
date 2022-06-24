title: 【c++项目】小鑫记单词系统
author: 连思鑫
tags:
  - c++项目
  - 小鑫记单词系统
categories:
  - C++项目
date: 2022-06-24 11:52:00
---
# 【c++项目】小鑫记单词系统

## 前言
四级没过的我快哭了...因此开发了一个记单词的系统。可以录入单词，随机抽取单词记忆，显示单词本等功能。代码写的仓促，有点屎山代码的意味。所以在写代码之前，还是要事先写好开发文档。

话不多说，放代码。

## 代码
englishStudy.cpp
```c++
/*
    2022-6-24
    连思鑫
*/
#include <iostream>
#include "sendEnglish.h"
using namespace std;
int main() {
    int num;
    sendEnglish sendenglish;
    while (true)
    {
        cout << "************************" << endl;
        cout << "*     小鑫记单词系统      *" << endl;
        cout << "************************" << endl;
        cout << "*     1.录入单词         *" << endl;
        cout << "*     2.随机学单词       *" << endl;
        cout << "*     3.显示单词本       *" << endl;
        cout << "*     4.清空单词本       *" << endl;
        cout << "*     0.退出            *" << endl;
        cout << "************************" << endl;
        cout << "请根据编号选择：";
        cin >> num;
        switch (num) {
        case 1:
            sendenglish.show();
            break;
        case 2:
            sendenglish.rec();
            break;
        case 3:
            sendenglish.book();
            break;
        case 4:
            sendenglish.del_book();
            break;
        case 0:
            return 0;
        }
    }
    return 0;
}

```

sendEnglish.h
```c++
/*
    2022-6-24
    连思鑫
*/

#ifndef ENGLISHSTUDY_SENDENGLISH_H
#define ENGLISHSTUDY_SENDENGLISH_H
#define MAX 10000
#include <iostream>
#include <string>
#include <string.h>
#include <fstream>
#include <vector>
#include <sstream>
#include <ctime>

using namespace std;

//单词结构体
struct English {
    string english;
    string chinese;
};

//单词本结构体
struct Englishbook {

    int number; //单词个数
    English english[MAX];//一万个单词
};

class sendEnglish {
public:
    void show(); //显示
    void send(); //写入
    void rec(); //读取
    void book(); //单词本
    void del_book(); //清空单词本

private:
    //判断文件是否为空
    bool fileIsEmpty;

};


#endif //ENGLISHSTUDY_SENDENGLISH_H

```

sendEnglish.cpp
```c++
/*
    2022-6-24
    连思鑫
*/
#include "sendEnglish.h"
Englishbook englishbook;


//随机数生成
int randomNumber(int num) {
    srand((int)time(0));
    return rand() % (num + 1);
}


//C++字符串切片，C++标准库里没有。。。只能自己去实现了。
static void _split(const string& s, char delim, vector<string>& elems) {
    stringstream ss(s);
    string item;

    while (getline(ss, item, delim))
    {
        elems.push_back(item);
    }
}

vector<string> split(const string& s, char delim) {
    vector<string> elems;
    _split(s, delim, elems);
    return elems;
}

//:~

void test() {
    for (int i = 0; i <= englishbook.number; ++i) {
        cout << "-----------------------------------" << endl;
        cout << i << " : " << englishbook.english[i].english << " " << englishbook.english[i].chinese << endl;
        cout << "-----------------------------------" << endl;
    }
}

void sendEnglish::show() {
    string s;
    int num = 0;
    cout << "*************************" << endl;
    cout << "* 请输入单词以及该单词的翻译 *" << endl;
    cout << "*     按回车即可保存       *" << endl;
    cout << "*     输入0按回车即可结束   *" << endl;
    cout << "*************************" << endl;
    while (true) {
        cout << "请输入您要输入的英语单词：";
        cin >> s;
        if (s == "0") {
            break;
        }
        englishbook.number = num;
        englishbook.english[num].english = s;
        cout << "请输入该英语的翻译：";
        cin >> englishbook.english[num].chinese;
        cout << "------------------------" << endl;
        num++;
        send();
    }
    test(); //测试单词写入结构体是否成功
    cout << "以上是您录入的新单词，已保存！！" << endl;
}

void sendEnglish::send() {

    ofstream ofs;
    ofs.open("english.csv", ios::out | ios::app); // 用追加的方式写文件
    if (!ofs.is_open()) {
        cout << "文件没有打开！" << endl;
    }
    ifstream ifs("english.csv", ios::in); //读文件
    if (!ifs.is_open())
    {
        this->fileIsEmpty = true;
        cout << "文件不存在" << endl;
        ifs.close();
        return;
    }
   int s = 0;
   string data;
   while (getline(ifs,data))
    {
            s++;
    }
   ifs.close();

    //将数据 写入到文件中
    for (int i = 0; i <= englishbook.number; i++)
    {
        ofs << s+i << "," << englishbook.english[i].english << "," << englishbook.english[i].chinese << endl;
    }
    //关闭
    ofs.close();
    //cout << "记录已经保存" << endl;

}

void sendEnglish::rec(){
    int num;
    //memset(&englishbook, 0, sizeof(englishbook)); 
    //清空结构体,这个地方加上有bug，字符串会乱码，没搞明白为什么。所以注释掉了，可能不是我这么用的。有知道的大佬可以指点一下。
    ifstream ifs("english.csv", ios::in); //读文件
    if (!ifs.is_open())
    {
        this->fileIsEmpty = true;
        cout << "文件不存在" << endl;
        ifs.close();
        return;
    }
    string buff;
    int s = 0;
    while (getline(ifs, buff))
    {
        vector<string> data = split(buff, ',');
        //for (auto it = begin(data); it != end(data); ++it)
        //{
        //    cout << *it << endl;
        //}
        englishbook.english[s].english = data[1];
        englishbook.english[s].chinese = data[2];
        s++;
    }
    englishbook.number = s-1;
    cout << "如果想要退出请按0." << endl;
    while (true)
    {
        string chinese;
        num = randomNumber(englishbook.number);
        //cout << num << endl;//测试随机数是否生成
        cout << "请写出" << englishbook.english[num].english << "的翻译：";
        cin >> chinese;
        if (chinese == "0")
        {
            break;

        }
        else if (englishbook.english[num].chinese == chinese) {
            cout << "回答正确！！" << endl;
        }
        else if (englishbook.english[num].chinese != chinese)
        {
            cout << "回答错误！！正确答案是：" << englishbook.english[num].chinese << endl;
        }
    }
}

void sendEnglish::book() {
    ifstream ifs("english.csv", ios::in); //读文件
    if (!ifs.is_open())
    {
        this->fileIsEmpty = true;
        cout << "文件不存在" << endl;
        ifs.close();
        return;
    }
    string buff;
    int s = 0;
    while (getline(ifs, buff))
    {
        vector<string> data = split(buff, ',');
        //for (auto it = begin(data); it != end(data); ++it)
        //{
        //    cout << *it << endl;
        //}
        englishbook.english[s].english = data[1];
        englishbook.english[s].chinese = data[2];
        s++;
    }
    englishbook.number = s - 1;
    cout << "已录入单词如下：" << endl;
    test();

}

void sendEnglish::del_book() {
    int num;
    cout << "************************" << endl;
    cout << "您确定要清空单词本吗？" << endl;
    cout << "是，请输入1" << endl;
    cout << "否，请输入0" << endl;
    cin >> num;
    if (num == 0)
    {
        return;
    }
    else if(num == 1) {
        remove("english.csv");
    }
}


```

## 效果展示


![uploaded!](/images/2022-6-24-0001.png)


![uploaded!](/images/2022-6-24-00002.png)


可执行程序：[点我下载](/download/englishStudy.exe)








