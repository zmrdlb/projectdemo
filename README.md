# 前言

开发一个项目，技术很重要，合理的工程目录安排更加重要。我根据这些年的经验，整理了一套认为比较完美的前端工程目录设计。

统一的工程目录设计有如下优点：

- 统一规划化

- 沟通术语化

- 快速上手

- 工作交接容易

- 工作流程化

此说明文档，以项目存放目录为D:\mycoderoot为例。即下载到本地的路径为：D:\mycoderoot\projectdemo

# 1. 工程目录说明

## 1.1 src和dist

- src: 开发期间源码存放区；
- dist: 提测或上线前，运行grunt脚本，将src中的代码编译到dist中，将dist目录下的代码放到提测或线上环境。

## 1.2 src下开发目录说明

### 1.2.1 css

- common: 此项目全局公共的css和公用的less方法和配置

>> 引用方式：common中的css会被引用到page/global.less中（继续往下看），无需各个页面自行引用。

> tool: 公用的less方法

> tool.less: 对于tool文件夹中的less方法整体引用

> reset.less: 浏览器样式统一reset.less。一般无需修改此文件

> config.less: 此项目的less变量配置。如图片存放根目录

> layout.less: 项目全局css存放区
 
>> 命名空间：.g-

> core.less: 引用了tool.less和config.less。要使用这些less方法或者配置时，则引用此文件。一般每个less编写的时候都会引用

- module: 存放各个业务css组件（不属于全局公共的，但是会被至少2个页面公用的css块）

>> 引用方式：所需页面的css通过import方式引用

>> 命名空间：.m-文件名-

- page: 页面上引用的css存放区。

> global.less: 引用common/reset.less和common/layout.less。

### 1.2.2 html-静态页面存放区

- common: 对应css/common下的样式demo

- module: 对应css/module下的样式demo

- 同级对应css/page下的样式，即各个业务静态页面

### 1.2.3 img-图片存放区

- common: 对应css/common下的样式图片，即对应css/page/global.less

- module: 对应css/module下的样式图片

- page: 对应css/page下的样式图片。为了方便区分页面，则每个页面也单独再建立一个文件夹

### 1.2.4 js

- widget: 用git submodule add方式引用的一套公共的js代码库。此项目以pc为准，则引用https://github.com/zmrdlb/widgetpc.git，如果要做h5，则改成引用https://github.com/zmrdlb/widgetwebapp.git

- common: 此项目公共的配置及组件

> config.js: 公共的一些变量配置。比如：接口域名（可能会区分不同环境下不同域名），登录页域名

> model.js: 使用了widget/io中的组件，对于接口请求进行统一管理。具体可查看model.js里面的代码，以及widget/io/ioconfig.js里面的配置说明

> userinfo.js: 获取用户信息，里面有对model.js的使用demo

> view.js: 所有页面js的统一入口，为了方便处理一些几乎所有页面都要用到的业务，但是每个页面单独组件处理又很麻烦的情况。具体见page/demo.js

- comp: 不是此项目公共的js组件，但是因为功能复杂则进行拆分

- page: 页面最终引用的js。编写每个页面的js前，请复制page/demo.js里面的代码，然后进行修改编写。

### 1.2.5 sectiontpl-类似于php blade模板引擎。这个通过grunt脚本来watch，将模板合并生成到section文件夹中

- include: 拆分的模板

- 其他文件为各个业务页面。demo.html则是模板使用demo。新建其他页面则可复制demo.html然后再进行修改。

### 1.2.6 section-模板sectiontpl最终生成的页面

# 2. 开发环境配置和调试

## 2.1 环境配置

可是使用fiddler等代理工具，配置如下：

- REGEX:http://http://web.dev.net/*   D:\mycoderoot\projectdemo\src\

如果要测试dist下的代码，则改成 D:\mycoderoot\projectdemo\dist\

## 2.2 运行

http://web.dev.net/section/index.html

## 2.3 grunt工具使用

为了达到多个项目共用同一份grunt npm包，所以请按照如下配置：

1. 在D:\mycoderoot下git clone https://github.com/zmrdlb/tool.git；

2. 在tool里执行npm install，安装grunt包。确保系统已安装node和grunt；

3. 在node.js command prompt中（或者系统cmd），定位到D:\mycoderoot\projectdemo\src；

4. 执行grunt develop --base=D:\mycoderoot\tool\node_modules。则会监听sectiontpl中的修改，然后自动生成到section中；

5. 开发中发现grunt watch有点问题，如果在sectiontpl中新建或删除了文件，没有监听到。则执行grunt includes:html --base=D:\mycoderoot\tool\node_modules 手动执行下。

# 3. 提测和上线

当我们提测或上线时，则需要把src中的代码编译到dist中，然后把dist中的代码cp（cp -av projectdemo/dist/* online/static）（目录自行修改）到测试或上线目录中。

进阶2.3的第3步，执行grunt -v --base=D:\mycoderoot\tool\node_modules

此时src中的代码已编译到dist中

# 4. 开发流程

工程目录设计了这么多，其中还规定了一下开发流程：

> 开发流水线：

>> 先让一部分人在html中开发静态页面，一部分人开发js公共组件

>> 然后再把html中的页面拆分到sectiontpl

>> 统一开发业务page/*.js

