const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");
const apiMocker = require("mocker-api");

const path = require("path");
const config = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    compress: true,
    allowedHosts: "all",
    port: 9004,

    onBeforeSetupMiddleware(devServer) {
      apiMocker(
        devServer.app,
        path.resolve("./mocker/index.js")
        // {
        //   proxy: {
        //     "/api/(.*)": "https://jsonplaceholder.typicode.com/",
        //   },
        //   pathRewrite: {
        //     '^/api/': '/',
        //   },
        //   changeHost: true,
        // }
      );
    },
    // setupMiddlewares: require('../mocker/index')
    // onBeforeSetupMiddleware(app) {
    //   apiMocker(app, path.resolve("../mocker/index.js"), {
    //     proxy: {
    //       "/repos/(.*)": "https://api.github.com/",
    //     },
    //     changeHost: true,
    //   });
    // },
  },
});

module.exports = config;
