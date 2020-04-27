# WebGL三维落叶场景
## 简介
大四毕业设计，使用Three.js库做落叶场景的仿真，对原题目要求进行了扩展。
## 预览图
![](https://blog-1259762155.cos.ap-beijing.myqcloud.com/introduce/1589530592020-preview1.png)

![](https://blog-1259762155.cos.ap-beijing.myqcloud.com/introduce/1589530651314-preview2.png)
## 框架
+ Three.js
+ React
+ And-Design

## 主要功能
+ 落叶的自由落体
+ 无风时旋转、摇摆
+ 有风时随风运动
+ 叶子可以落地
+ 落地的叶子和空中的叶子都受风力影响
+ 风力风向可以控制, 加入了风声

## 存在的问题
+ 在服务器上部署后打开速度非常慢
+ 风向UI的第一个北方向有时失效
+ 调整风力风向后, 由于叶子到达边界会从另一个边界出现, 并重置速度, 会导致叶子聚集, 需要刷新页面

## 运行方法
1. 使用git命令`git clone https://github.com/iradw/fallen-leaves` 或直接在点击上方`Clone or download`按钮
2. 安装Node.js, 如果已安装跳转到步骤4
3. (可选)安装好Node后，更改npm下载源为国内镜像`npm config set registry http://registry.npm.taobao.org/`
4. 在项目的根目录`fallen-leaves`, 打开终端, 执行命令`npm install`以安装项目需要的依赖
5. 执行`npm start`或`yarn start`以开发模式运行
6. 浏览器中访问`localhost:3000`

## 其他
如需毕业设计文档可联系作者, qq: `1846988227`
