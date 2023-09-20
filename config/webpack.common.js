const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模板的plugin
const { DefinePlugin } = require("webpack"); // 定义常量的plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将css单独提取到独立的文件中
const WebpackBar = require("webpackbar"); // 显示编译进度

const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");

const commonConfig = isProduction => {
  return {
    entry: path.resolve(process.cwd(), "./src/index.tsx"), // ,
    output: {
      filename: "static/js/[name].[chunkhash:8].build.js", // 每个输出js的名称
      path: path.resolve(process.cwd(), "./dist"), // 打包结果输出路径
      clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
      publicPath: "/", // 打包后文件的公共前缀路径
    },
    resolve: {
      extensions: [".tsx", ".jsx", ".ts", ".js", ".json", ".wasm", ".mjs"],
      alias: {
        "@": path.resolve(process.cwd(), "./src"),
      },
      modules: [path.resolve(process.cwd(), "./node_modules")], // 查找第三方模块只在本项目的node_modules中查找,提升模块查找的速度，提升构建速度
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          include: [path.resolve(process.cwd(), "./src")], // 只对项目src文件的ts,tsx进行loader解析
          exclude: /node_modules/,
          use: [
            {
              loader: "thread-loader",
            },
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.css/,
          use: [
            isProduction ? { loader: MiniCssExtractPlugin.loader } : { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                // 如果在css文件中映入了其他css文件，则需要用这个属性表示引入的该文件需要回退两个loader处理，即用less-loader处理
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
            },
          ],
        },
        {
          test: /\.less/,
          use: [
            isProduction ? { loader: MiniCssExtractPlugin.loader } : { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                // 如果在css文件中映入了其他css文件，则需要用这个属性表示引入的该文件需要回退两个loader处理，即用less-loader处理
                importLoaders: 2,
              },
            },
            {
              loader: "postcss-loader",
            },
            {
              loader: "less-loader",
            },
          ],
        },
        {
          test: /.(png|jpe?g|gif|svg)$/,
          // type: "asset/resource", file-loader的效果直接复制
          // type: "asset/inline", url-loader的效果直接转化为base64
          // type: "asset/source", 导出资源的源代码。之前通过使用 raw-loader 实现
          type: "asset", // 根据大小自动判断，例如一下配置了parser则根据这个大小是否转换成base64
          generator: {
            filename: "static/imgs/[name].[contenthash:6][ext]", // 自定义文件输出的名字和输出目录
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 小于100kb的图片转化为base64
            },
          },
        },
        {
          test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
          type: "asset", // type选择asset
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 小于10kb转base64位
            },
          },
          generator: {
            filename: "static/fonts/[name].[contenthash:6][ext]", // 文件输出目录和命名
          },
        },
        {
          test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
          type: "asset", // type选择asset
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 小于10kb转base64位
            },
          },
          generator: {
            filename: "static/media/[name].[contenthash:6][ext]", // 文件输出目录和命名
          },
        },
      ],
    },
    plugins: [
      new WebpackBar({
        name: isProduction ? "正在打包" : "正在启动",
      }),
      new HtmlWebpackPlugin({
        title: "webpack-react-ts", // 模板文件里有用到title这个变量，将这里的变量名字注入到模板文件中
        template: path.resolve(process.cwd(), "./public/index.html"), // 模板文件的地址
        inject: true, // 自动注入静态资源
      }),
      new DefinePlugin({
        BASE_URL: '"/"',
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
      }),
    ],
    // 开启持久化存储缓存,第二次打包时间极大提升
    cache: {
      type: "filesystem", // 使用文件缓存
    },
  };
};

module.exports = function (env) {
  const isProduction = env.production;
  process.env.NODE_ENV = isProduction ? "production" : "development";
  process.env.BASE_ENV = env.BASE_ENV;

  const config = isProduction ? prodConfig : devConfig;
  const mergeConfig = merge(commonConfig(isProduction), config);

  console.log({ BASE_ENV: process.env.BASE_ENV, NODE_ENV: process.env.NODE_ENV });
  return mergeConfig;
};
module.exports.commonConfig = commonConfig;
