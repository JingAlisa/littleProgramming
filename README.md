# littleProgramming
a little programming about movie
下载代码，通过小程序开发工具即可查看。主要功能：1、文章天地 2、调用豆瓣API实现电影相关页面

一、开发前准备

1、申请账号

2、安装开发工具

二、正式开发

.json配置文件 

    app.json:小程序的全局配置，包括小程序的所有页面路径、对window对象的属性进行设置、底部tab设置等

    project.config.json:对开发工具的个性化设置

    page.json：对小程序中每个页面进行相关配置，如果与app.json中的设置重复，则会进行覆盖

.wxml模板文件 

    存放页面内容结构，主要用到的标签包括:<view> <text> <image> <template>

    组件化思想：模板复用

    MVVM开发模式：渲染和逻辑分离，js不需要操作dom，只需要管理状态。利用WX:if  WX:for等这样的表达式，实现数据的绑定。

.wxss样式文件

    app.wxss：全局样式

    page.wxss：每个页面特有的样式

.js文件

    与用户交互：相应点击事件、获取用户位置等

    调用微信小程序提供的丰富的API
