## 基于gulp+webpack搭建的前端自动化构建

**适用于中小型项目，快速构建前端项目框架。**

## Build Setup
``` bash

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
├── static            # 打包到dist中static文件中
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
* 如果不想使用eslint，可以gulpfile文件中去掉该任务

2、合成雪碧图
* 雪碧图图片统一存放进/src/static/sprite目录下，生成出来的图片和样式会对应生成到images和css文件夹

3、static文件夹
* 一级目录中static文件夹，可以存放不需要编译的文件内容，比如一些插件，图片，字体文件等
* 每次npm run dev or build 都会把static文件夹下的内容，打包到dist/static里


## 代理模式
* config/index.js文件中配置

**例子如下**
``` javascript
 middleware: [
  proxy.proxyPrase(
    {
      target: 'http://xxx.com:8000/api',
      route: '/api'
    }
  )
]
```
## 集成 ejs

可使用ejs语法，官方文档：[http://www.embeddedjs.com/](http://www.embeddedjs.com/)

## 使用Eslint
config/index.js文件
```
useEslint: false // 是否启用eslint
```

## 使用webpack
* 集成webpack功能，可以自行选择

config/index.js文件
```
useWebpack: true // 是否启用webpack
```

For a detailed explanation on how things work, check out the guide [gulp](https://www.gulpjs.com.cn/).
