const path = require("path");
const { merge } = require("webpack-merge");

const { commonConfig } = require("./webpack.common");
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");

module.exports = function (env) {
  const isProduction = env.production;
  process.env.NODE_ENV = isProduction ? "production" : "development";

  const config = isProduction ? prodConfig : devConfig;
  const mergeConfig = merge(commonConfig(isProduction), config);
  /**
   * 分析各个loader、plugin的打包耗时，与MiniCssExtractPlugin有冲突
   */
  return smp.wrap(mergeConfig);
  // return mergeConfig;
};
