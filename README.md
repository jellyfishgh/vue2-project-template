# vue project

> 使用 vue 开发多系统的代码组织框架

## 命令

``` bash
# npm registry 设置为淘宝镜像
npm config set registry https://registry.npm.taobao.org

# install dependencies
npm install

# update dependencies
npm update

# serve with hot reload at localhost:8080
npm run dev `what`

# 创建新的项目,项目名为 what
npm run new `what`
eg: npm run new demo

# build for production with minification
gulp
```

## 问题

### node-sass 安装失败?

1. 访问 https://npm.taobao.org/mirrors/node-sass 找到版本最高的目录，浏览器 下载 win32-x64-51_binding.node（版本号最高的版本），下载完毕之后重命名为 binding.node
2. npm i --save-dev node-sass
3. 执行到 downloading binding.node 后 Ctrl+C 停止安装，进入 node_modules/node-sass/vendor/win32-x64-51 目录，拷贝 binding.node

