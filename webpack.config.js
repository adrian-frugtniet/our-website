'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

var webpack = require('webpack');
var path    = require('path'),
    join    = path.join,
    resolve = path.resolve;

const IS_PROD = NODE_ENV === 'production';

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
  name: "Client side",
  devServer: {
    hot: true,
    contentBase: './public/',
    proxy: {
      '/_api': {
        target: 'http://localhost:3000/',
        secure: false
      },
      '/app': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
  },
  devtool: 'source-map',
  module : {
    loaders : [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        include: /\.json$/,
        loaders: 'json'
      },
      {
        test: /\.(js|jsx)$/,
        include: [APP_DIR],
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.json', '.jsx', '.js']
  },
  entry: {
    main: APP_DIR + '/main.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    publicPath: "/js/"
  }
};

const defines = {
  "__NODE_ENV__": JSON.stringify(NODE_ENV),
  "process.env": {
    "NODE_ENV": JSON.stringify(NODE_ENV)
  }
}

config.plugins = [
  new webpack.DefinePlugin(defines)
].concat(config.plugins || []);

// if (isProd) {
//   config.plugins = [
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.UglifyJsPlugin({
//       minimize: true,
//       compress: { warnings: false }
//     })
//   ].concat(config.plugins || []);
// }

module.exports = config;
