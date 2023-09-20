const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    // 热更新HMR
    hot: true,
    //hotOnly是当代码编译失败时，是否刷新整个页面,如果不希望重新刷新整个页面，可以设置hotOnly为true
    // hotOnly: true,
    // 设置成0.0.0.0可以通过ip4地址访问到
    host: "0.0.0.0",
    //port设置监听的端口，默认情况下是8080
    port: 8000,
    // 自动打开浏览器
    open: true,
    // 是否开启压缩
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    // contentBase: path.resolve(__dirname, "./why"),
    // watchContentBase: true,
    // publicPath: "/abc",
    proxy: {
      "/api": {
        // 表示的是代理到的目标地址
        target: "http://123.207.32.32:8000",
        //默认情况下，我们的 /api 也会被写入到URL中，如果希望删除，可以使用pathRewrite
        pathRewrite: {
          "^/api": "",
        },
        //默认情况下不接收转发到https的服务器上，如果希望支持，可以设置为false
        secure: false,
        // 它表示是否更新代理后请求的headers中host地址【不太明白】
        changeOrigin: true,
      },
    },
    //historyApiFallback是开发中一个非常常见的属性，它主要的作用是解决SPA页面在路由跳转之后，进行页面刷新时，返回404的错误
    historyApiFallback: true,
    static: {
      directory: path.resolve(process.cwd(), "../public"), //托管静态资源public文件夹
    },
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};
