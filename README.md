# ReactHook
创建react Hooks组件库
基于 react 封装的自定义 hooks

# 项目初始化
1. 生成 pacakge.json 文件
``` javascript
pnpm init
```
2. 接入 linter，使用的是 encode-fe-lint，印客学院提供的 lint 工具
 ```javascript  pnpm i -g encode-fe-lint
# 生成linter文件
encode-fe-lint init

```
3. 生成 typescript 配置文件
```javascript
 npm i -g typescript
 npx tsc --init
```
4. 根据 menorepo(多包项目) 的架构规则，创建文件
i.新建`pnpm-workspace.yaml`文件，定义工作目录 参考https://pnpm.nodejs.cn/pnpm-workspace_yaml
ii.新建`packages`文件，作为项目开发根目录
iii.在 packages 目录，新建hooks项目
```javascript
# 安装husky让钩子函数生效(使用-w需要先配置pnpm-workspace.yaml，否则会报错)
pnpm i -D -w husky
```
5. 新建.gitignore 文件，定义 `git` 忽略规则
6. git 仓库初始化，提交代码
```javascript
git init
git add .
git commit -m "init"
git push
```
7. dumi 初始化 演示项目使用的 dumi 是 1 版本，目前 dumi 已更新到 2 版本，因此可参考https://d.umijs.org/guide/upgrading 官方更新文档，按需更改配置文件
 ```javascript
npx create-dumi
pnpm i dumi
```
8. 初始化hooks项目
i.生成 package.json 文件，typescript 配置文件
 ```javascript
npx create-dumi
pnpm i dumi
```
tsconfig.json，参考案例项目配置即可
  ii.新建src目录，作为项目开发目录
  iii.安装库依赖库 react
 ```javascript
pnpm i react
```
9. gulp 配置
i.安装依赖
 ```javascript
pnpm i gulp gulp-babel gulp-typescript del -D -w
pnpm i -D fs-extra fast-glob gray-matter -w
```
ii.根目录新建 gulpfile.js 文件，配置 gulp 配置
iii. .babelrc 文件配置
 ```javascript
pnpm i -D @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime -w
```
@babel/preset-env 是一个智能预设，它可以根据你指定的目标环境（如浏览器版本、Node.js 版本等）自动确定需要使用的 Babel 插件

@babel/preset-react 是专门为 React 项目设计的预设，它包含了一系列用于转换 JSX 和 React 特定语法的插件。

@babel/plugin-transform-runtime 插件主要用于复用 Babel 注入的辅助函数，减少代码体积。

iv.安装 tslib 库，辅助 typescript 进行编译，如 async await,Promise 等
 ```javascript
pnpm i tslib -w
```
v.gulp 编译过程 根目录的 gulpfile.js 是公共 gulp 配置文件，每个项目可以单独定制 gulpfile.js，然后在项目的 package.json 的 scripts 中配置 gulp 命令，如：
 ```javascript
"scripts": {
  "gulp": "gulp"
}
```
这样当执行`pnpm run gulp`指令就会读取当前项目的 gulpfile.js 文件进行编译。

需要注意的是 gulp-typescript,调用它的 src 方法，他会以配置的 tsconfig.json 文件为基准，寻找入口文件，需要编译的文件，exclude 属性比较重要，决定了最终不打包哪些文件，如在项目中的test 目录以及 Demo 需要排除在外。
10. webpack 配置
i.根目录新建 webpack.common.js 文件，配置公共的 webpack 配置
ii.hooks 项目根目录新建 webpack.config.js 文件，配置该项目的 webpack 配置，继承自公共配置
iii.在根安装依赖
 ```javascript
pnpm i webpack webpack-cli webpack-merge -D -w
```
打包流程分析：首先通过 gulp 打包成 esm 包、cjs 包，然后通过 webpack 打包成 umd 包，因为 gulp 不能直接打包成 umd 包
11. jest 测试环境搭建
 ```javascript
# ts-jest @types/jest 继承typescript环境
# @testing-library/react @testing-library/jest-dom 集成react环境
# jest-localstorage-mock模拟浏览器storage
# jest-environment-jsdom node模拟浏览器环境
pnpm i jest ts-jest @types/jest @testing-library/react @testing-library/jest-dom jest-localstorage-mock jest-environment-jsdom -D -w

# 生成jest.config.js文件，一直点下去，然后根据需求配置即可。或者自己手动新建
npx jest --init
```
测试过程出问题可能是 react 版本不匹配，默认 react 版本是 19，改成 18 和@testing-library/react 库保持一致的 react 版本即可
12. 自动化部署流程配置
  本项目基于 github actions 实现自动化部署，所以需要有自己的 github 账号，生成自己的 ssh 密钥
  新建.github/workflows 文件，然后根据需求写 yaml 脚本 可参考：https://d.umijs.org/guide/faq#%E9%83%A8%E7%BD%B2%E6%96%87%E6%A1%A3
# 注意事项
在发布库时需要更改库的版本号，如果版本号一致，则默认不发布
