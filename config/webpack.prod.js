const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制文件的plugin
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); // 打包分析
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将css提取到单独的文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 对css代码进行压缩
const globAll = require("glob-all");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin"); // 消除css未使用的代码
const CompressionPlugin = require("compression-webpack-plugin"); // webpack对文件的压缩

module.exports = {
  mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors", // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        // react: {
        //   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        //   filename: "js/[id]_react.js",
        //   chunks: "all",
        // },
        commons: {
          // 提取页面公共代码
          name: "commons", // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        },
      },
    },
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(process.cwd(), "./public"), // 复制public下文件
          to: path.resolve(process.cwd(), "./dist"), // 复制到dist目录中
          globOptions: {
            // 表示需要忽略的文件，不用复制
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new BundleAnalyzerPlugin(), //  打包分析
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
    }),
    // 清理无用css(打包发现暂时有些没有用到的class样式没清理掉，原因待查找)
    new PurgeCSSPlugin({
      //表示要检测哪些目录下的内容需要被分析，这里我们可以使用glob；
      paths: globAll.sync([`${path.join(__dirname, "../src")}/**/*.tsx`, path.join(__dirname, "../public/index.html")]),
      //默认情况下，Purgecss会将我们的html标签的样式移除掉，如果我们希望保留，可以添加一个safelist的属性；
      safelist: function () {
        return {
          standard: ["body", "html", /^ant-/],
        };
      },
    }),
    new CssMinimizerPlugin(), // 压缩css
    new CompressionPlugin({
      test: /\.(css|js)$/i, //  匹配哪些文件需要压缩
      threshold: 0, // 设置文件从多大开始压缩
      minRatio: 0.8, // 至少的压缩比例
      algorithm: "gzip", // 采用的压缩算法
    }),
  ],
};
