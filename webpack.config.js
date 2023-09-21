const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html", // to import index.html file inside index.js
    }),
  ],
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".json", ".wasm", ".mjs"],
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  devServer: {
    port: 3030, // you can change the port
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(c)ss$/, // styles files
        use: ["style-loader", "css-loader",],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset", // 根据大小自动判断，例如一下配置了parser则根据这个大小是否转换成base64
        generator: {
          filename: "img/[name].[contenthash:6][ext]", // 自定义文件输出的名字和输出目录
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片转化为base64
          },
        },
      },
      {
        test: /\.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: 'babel-loader',
          options: {
            // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ],
  },
};
