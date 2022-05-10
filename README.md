# gshop

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# 项目描述
1) 此项目为外卖 Web App (SPA)
2) 包括商家, 商品, 购物车, 用户等多个子模块
3) 使用 Vue 全家桶+ES6+Webpack 等前端最新最热的技术
4) 采用模块化、组件化、工程化的模式开发

# 项目结构分析
gshop
|-- build : webpack 相关的配置文件夹(基本不需要修改)
|-- config: webpack 相关的配置文件夹(基本不需要修改)
|-- index.js: 指定的后台服务的端口号和静态资源文件夹
|-- node
_modules
|-- src : 源码文件夹
|-- main.js: 应用入口 js
|-- static: 静态资源文件夹
|-- .babelrc: babel 的配置文件
|-- .editorconfig: 通过编辑器的编码/格式进行一定的配置
|-- .eslintignore: eslint 检查忽略的配置
|-- .eslintrc.js: eslint 检查的配置
|-- .gitignore: git 版本管制忽略的配置
|-- index.html: 主页面文件
|-- package.json: 应用包配置文件
|-- README.md: 应用描述说明的 readme 文件
