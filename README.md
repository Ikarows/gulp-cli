<div align="center">
<p><img width="150" src="https://avatars0.githubusercontent.com/u/25151659?s=460&v=4"></p>

<h1>Gulp-cli</h1>

<p>
   <strong>基于 gulp+webpack 搭建的前端自动化构建</strong>,
</p>

<p>
  <sub>Made with ❤︎ by
    <a href="https://github.com/Ikarows">Ikarows</a>
  </sub>
</p>

</div>

**适用于中小型项目，快速构建前端项目框架。**

## Build Setup

```bash

# install cnpm
npm install cnpm -g --registry=https://registry.npm.taobao.org;

# install gulp
cnpm install gulp -save-dev

# install dependencies
cnpm install

# common commands
开发环境： npm run dev
生产环境： npm run build
打包压缩： npm run zip
部署代码： npm run upload

# single task command
执行压缩： gulp zip
编译页面： gulp html
编译脚本： gulp script
编译样式： gulp styles
语法检测： gulp eslint
压缩图片： gulp images
合雪碧图： gulp sprite
```

## [项目地址](https://github.com/Ikarows/gulp-cli.git)

```
git clone https://github.com/Ikarows/gulp-cli.git
```

## 项目目录

```

├── config            # gulp路径配置
├── dist              # 打包路径
|
├── src               # 项目文件夹
│   ├── components    # 公用页面引入
│   ├── static        # 资源文件夹
│   │   ├── images    # 图库
│   │   ├── js        # 脚本
│   │   ├── sprite    # 雪碧图
│   │   └── styles    # 样式（scss, css, less）
│   └── default.html  # 基础模版
│
├── static            # 不编译直接打包到dist中static文件中
├── .babelrc          # es6 编译配置文件
├── .editorconfig     # 编辑器代码风格统一文件
├── .eslintignore     # eslint忽略文件
├── .eslintrc.js      # eslint配置
├── .postcssrc.js     # js转换css配置
├── gulpfile.js       # gulp配置文件
├── package.json      # 依赖包
├── README.md         # 项目说明
└── webpack.config.js # webpack配置文件
```

## 项目约定

1、 使用严格的 eslint 规范 [文档链接](https://github.com/airbnb/javascript)

-   如果不想使用 eslint，可以 gulpfile 文件中去掉该任务

2、合成雪碧图

-   雪碧图图片统一存放进/src/static/sprite 目录下，生成出来的图片和样式会对应生成到 images 和 css 文件夹

3、static 文件夹

-   一级目录中 static 文件夹，可以存放不需要编译的文件内容，比如一些插件，图片，字体文件等
-   每次 npm run dev or build 都会把 static 文件夹下的内容，打包到 dist/static 里

## 自动化部署

-   config/sftp.js 文件中配置

**例子如下**

```javascript
module.exports = {
    //部署服务器上,sftp
    devDist: {
        //部署到服务器的路径
        remotePath: "/usr/local/java/apache-tomcat-8.0.47/webapps/ROOT/demo",
        //ip地址
        host: "xxx.xxx.xxx.xx",
        //帐号
        user: "root",
        //密码
        pass: "xxx",
        //端口
        port: 22
    },
    //程序编译好路径
    publicPath: "/dist/"
};
```

```
* 执行 npm run upload 会自动把dist文件部署到服务器上
```

- config/index.js 文件

```
autoUploadSftp: false // 编译后是否自动部署代码
```


## 代理模式

-   config/index.js 文件中配置

**例子如下**

```javascript
middleware: [
    proxy.proxyPrase({
        target: "http://xxx.com:8000/api",
        route: "/api"
    })
];
```

## 集成 ejs

可使用 ejs 语法，官方文档：[http://www.embeddedjs.com/](http://www.embeddedjs.com/)

## 使用 Eslint

config/index.js 文件

```
useEslint: false // 是否启用eslint
```

## 使用 webpack

-   集成 webpack 功能，可以自行选择

config/index.js 文件

```
useWebpack: true // 是否启用webpack
```

## 使用 px转rem

config/index.js 文件

```
px3rem: false // 是否启用px转rem

-不打算转换原始值，例如：1px border，/*no*/声明后添加
-打算强制使用px，例如：font-size，/*px*/在声明后添加
```

For a detailed explanation on how things work, check out the guide [gulp](https://www.gulpjs.com.cn/).
