var webpack = require("webpack");
var path = require("path");
var htmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
var pxtorem = require('postcss-pxtorem');

var config = require('./config');

module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    },{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    },{
        test: /\.css$/,
        use: ['style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [require('autoprefixer'),
                            pxtorem({
                              rootValue: 75,
                              propWhiteList: [],
                            })
                  ]
                }
              }
             ]
      },{
        test: /\.less$/,
        use: ['style-loader', 'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [require('autoprefixer'),
                            pxtorem({
                              rootValue: 75,
                              propWhiteList: [],
                            })
                  ]
                }
              },
              'less-loader'
             ]
      },
    ]
  },
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'index.html',
      title: config.title
    // minify: {
    //   removeComments: true,
    //   collapseWhitespace: true
    // }
    }),

    // 热加载
    new webpack.HotModuleReplacementPlugin(), // Enable HMR

    // 自动打开浏览器
    new openBrowserWebpackPlugin({
      url: 'http://localhost:8080'
    })
  ],

  devServer: {
    contentBase: __dirname + '/build', //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
    hot: true,
  // proxy: {
  //   "/api": {
  //     target: config.api,
  //     changeOrigin: true,
  //     pathRewrite: {"/api" : ""}
  //   },
  //   // 图片转发
  //   "/snp": {
  //     target: config.api,
  //     changeOrigin: true
  //   },
  //   // 图片转发
  //   "/uploading/snp": {
  //     target: config.api,
  //     changeOrigin: true
  //   }
  // }
  }
};
