mimall项目

## 预览

- 小米商城用户界面：[http://joeley.cn/](http://joeley.cn/)

- 小米商城后台管理：[http://admin.joeley.cn/](http://admin.joeley.cn/#/app/display/swiper)

## 项目结构

```text
|-- mimall
    |-- .alipay.config 支付配置
    |-- readme.md
    |-- settings.js 用户配置
    |-- admin   B端 管理员后台
    |   |-- public
    |   |-- scripts 脚本目录
    |   |-- src
    |       |-- App.tsx
    |       |-- Page.tsx
    |       |-- setupProxy.js 代理配置
    |       |-- components 页面
    |       |-- routes  路由
    |       |-- service 拦截器
    |       |-- style 样式
    |-- client  C端 小米商城用户端
    |   |-- babel.config.js
    |   |-- public
    |   |-- src
    |       |-- App.vue
    |       |-- main.js
    |       |-- permission.js 拦截器
    |       |-- api
    |       |   |-- index.js
    |       |-- assets 基础资源
    |       |-- components 通用组件
    |       |-- page  页面
    |       |-- router 路由
    |       |-- store  vuex
    |       |-- util  工具库
    |-- logs  日志
    |-- mock  数据模拟
    |-- models 数据模型
    |-- public 静态服务器根目录
    |-- routes 路由
    |   |-- init.js
    |   |-- admin  B端路由
    |   |-- api C端路由
    |   |-- routeTool  路由通用组件
    |-- services  Service逻辑处理层
    |-- util  通用方法

```

## 技术栈

- 服务端：nodejs + javascript + express

- C端 用户端：vue全家桶 + javascript

- B端 管理后台：react全家桶 + typescript 

- 数据库：mysql +  sequelize

- 认证：jwt

- 包管理：npm + yarn

## 数据库

- mysql

- squeeze与数据库对接

- 关于删除

  - 地址 商品  采用软删除 

  - 订单 不可删除 

- [表关系](./models/relation.js)



## 认证

- 前后台同一套账号系统，分级认证

- 后端接口拦截 前端路由拦截

- 一切重要数据交给服务器处理

- 支付接口加密

## 支付

- 采用支付宝沙盒支付

- 由于微信没有沙盒机制，所以没接入

## 接口

- 数据返回值：

  - code：状态值

  - msg：信息

  - data：数据

- code 返回值：

  - 0 成功  

  -  1 失败 code

  -  2 没权限 重新登录

- [接口列表](./extra/interface.json)

## 部署

- nignx反向代理node服务器

- express搭建图片服务器

- 配置如下
  * [xiaomi](./extra/xiaomi.conf)
  * [xiaomiAdmin](./extra/xiaomiadmin.conf)

## 优化

- 路由懒加载

- 图片实现本地缓存，防盗链

- 大量封装通用组件

- react的组件大量使用函数组件，使用Hook优化，且多数为纯组件



