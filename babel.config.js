const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage", // 代码中需要哪些polyfill, 就引用相关的api
      corejs: 3, // 还需要配置corejs的
    },
  ],
  ["@babel/preset-react"],
  ["@babel/preset-typescript"],
];

const plugins = [];
const isProduction = process.env.NODE_ENV === "production";

// React HMR -> 模块的热替换 必然是在开发时才有效果
if (!isProduction) {
  // console.log(isProduction, typeof isProduction, "---------");
  plugins.push(["react-refresh/babel"]);
} else {
}

module.exports = {
  presets,
  plugins
};
