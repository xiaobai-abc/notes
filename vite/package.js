const package = {
  repository: "仓库地址", // repository 表示代码的存放仓库地址
  repository: {
    type: "git",
    url: "https://github.com/facebook/react.git",
  },
  bugs: {
    //bugs 表示项目提交问题的地址，该字段是一个对象，可以添加一个提交问题的地址和反馈的邮箱
    url: "https://github.com/facebook/react/issues",
    email: "xxxxx@xx.com",
  },

  //dependencies 字段中声明的是项目的生产环境中所必须的依赖包。当使用 npm 或 yarn 安装 npm 包时，该 npm 包会被自动插入到此配置项中
  //当在安装依赖时使用 --save 参数，也会将新安装的 npm 包写入 dependencies 属性。
  /*
   * 「主版本号. 次版本号. 修订号」的格式规定：
   * 「固定版本：」 上面的 react-scripts 的版本 4.0.3 就是固定版本，安装时只安装这个指定的版本；
   * 「波浪号：」 比如~ 4.0.3，表示安装 4.0.x 的最新版本（不低于 4.0.3），也就是说安装时不会改变主版本号和次版本号；
   * 「插入号：」 比如上面 react 的版本 ^17.0.2，表示安装 17.x.x 的最新版本（不低于 17.0.2），也就是说安装时不会改变主版本号。如果主版本号为 0，那么插入号和波浪号的行为是一致的；
   *   latest：安装最新的版本。
   */
  dependencies: {
    react: "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
  },
  //devDependencies 中声明的是开发阶段需要的依赖包，如 Webpack、Eslint、Babel 等，用于辅助开发。
  //它们不同于 dependencies，因为它们只需安装在开发设备上，而无需在生产环境中运行代码。
  //当打包上线时并不需要这些包，所以可以把这些依赖添加到 devDependencies 中，
  //这些依赖依然会在本地指定 npm install 时被安装和管理，但是不会被安装到生产环境中。
  devDependencies: {},
  //当我们维护一些旧项目时，可能对 npm 包的版本或者 Node 版本有特殊要求，如果不满足条件就可能无法将项目跑起来。
  //为了让项目开箱即用，可以在 engines 字段中说明具体的版本号
  engines: {
    node: ">=8.10.3 <12.13.0",
    npm: ">=6.9.0",
  },
  //scripts 是 package.json 中内置的脚本入口，是 key-value 键值对配置，key 为可运行的命令，可以通过 npm run 来执行命令。
  //除了运行基本的 scripts 命令，还可以结合 pre 和 post 完成前置和后续操作。先来看一组 scripts

  script: {
    dev: "node index.js",
    predev: "node beforeIndex.js",
    postdev: "node afterIndex.js",
  },
  // config 字段用来配置 scripts 运行时的配置参数
  // port 字段会映射到npm_package_config_port环境变量中
  /**
   * console.log(process.env.npm_package_config_port) // 3000
   */
  config: {
    port: 3000,
  },
};

// .env.development和.env.production
// NODE_ENV = 'production'
// process.env
// import.meta.env

// import.meta.env.MODE: {string} 应用运行的模式。

// import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定。

// import.meta.env.PROD: {boolean} 应用是否运行在生产环境。

// import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。

// import.meta.env.SSR: {boolean} 应用是否运行在 server 上
