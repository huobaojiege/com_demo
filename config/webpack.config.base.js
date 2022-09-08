const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const webpack = require("webpack");
const ROOTPATH = path.join(process.cwd());
const APP_PATH = path.join(ROOTPATH, "/src");
const pageDir = path.resolve(ROOTPATH, "./entry");


function getEntry() {
  let entryMap = {};

  fs.readdirSync(pageDir).forEach((pathname) => {
    let fullPathName = path.resolve(pageDir, pathname);
    let stat = fs.statSync(fullPathName);
    if (stat.isDirectory()) {
      let fileName = path.resolve(fullPathName, "index.jsx");
      let ts_fileName = path.resolve(fullPathName, "index.tsx");
      if (fs.existsSync(fileName)) {
        entryMap[pathname] = fileName;
      }
      if (fs.existsSync(ts_fileName)) {
        entryMap[pathname] = ts_fileName;
      }
    }
    if (stat.isFile()) {
      let _arr = pathname.split(".");
      _arr.pop();
      entryMap[_arr.join(".")] = fullPathName;
    }
  });

  return entryMap;
}
module.exports = {
  entry: getEntry(),
  output: {
    path: path.resolve(ROOTPATH, "./dist"),
    filename: "js/[name].js?[chunkhash:8]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|less|css)$/,
        exclude: /\.module\.(scss|less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
          "sass-loader",
          'less-loader'
        ],
      },
      {
        test: /\.module\.(scss|less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
          "postcss-loader",
          "sass-loader",
          'less-loader'
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js"],
    alias: {
      react$: require.resolve("react"),
      "react-dom": require.resolve("react-dom"),
      "@": `${APP_PATH}/`,
    },
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        path.join(ROOTPATH, "/public/index.html")
      ),
      filename: "index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].css?[contenthash:8]",
      chunkFilename: "css/[name].css?[contenthash:8]",
      ignoreOrder: true,
    }),
    new friendlyErrorsWebpackPlugin(),
    /**
     * 这个用来区分打包js，弹窗js，需要额外新增qs的解析， 而react 项目中打包不需要。
     * indep 则表示需要打入 qs的解析。
     * */
    // new webpack.DefinePlugin({
    //   APPLY_MODE: '"unIndep"',
    // }),

    new webpack.DefinePlugin({
      "process.env.MODE_ENV": JSON.stringify(process.env.MODE_ENV),
      "process.env.IS_MOCK": JSON.stringify(process.env.IS_MOCK),
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    // runtimeChunk: {
    //   name: "runtime",
    // },
    splitChunks: {
      // chunks: 'all',
      cacheGroups: {
        libs: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: "libs",
          priority: 10,
          enforce: true,
        },
        // commoncss: {
        //   test: /(common.scss)/,
        //   chunks: "all",
        //   name: "common",
        //   priority: 10,
        //   enforce: true,
        // },
      },
    },
  },
  cache: {
    type: "filesystem",
    allowCollectingMemory: true,
  },
};
