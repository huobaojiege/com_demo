const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");
const TerserPlugin = require("terser-webpack-plugin");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = (env) => {
  const isAnaly = env.Analyzer === "Analyzer";
  isAnaly ? console.log("------------进入打包分析模式-------------") : "";
  return merge(baseConfig, {
    mode: "production",
    // mode: 'development',
    // devtool: 'inline-source-map',
    // optimization: {
    //   minimizer: [
    //     new TerserPlugin({
    //       terserOptions: {
    //         compress: {
    //           pure_funcs: ["console.log"]
    //         },
    //       },
    //     }),
    //   ],
    //   runtimeChunk: {
    //     name: "runtime",
    //   },
    //   splitChunks: {
    //     chunks: 'all',
    //     // include all types of chunks
    //     // cacheGroups: {
    //     //   libs: {
    //     //     test: /(react|react-dom|react-dom-router|babel-polyfill|axios|qs|intl|core-js)/,
    //     //     chunks: 'all',
    //     //     name: 'libs',
    //     //     priority: 10,
    //     //     enforce:true
    //     //   },
    //     // }
    //   },
    // }
    plugins: [
      // 进度条
      new ProgressBarPlugin({
        format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
      }),
      isAnaly ? new BundleAnalyzerPlugin() : () => {},
      new CleanWebpackPlugin(),
    ],
  });
};
