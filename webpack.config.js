const path = require('path')
const forBrowser = {
  mode: 'production',
  entry: './cqueue.js',
  output: {
    library: 'CQueue',
    libraryTarget: 'umd',
    filename: 'cqueue-browser.js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
const forNode = {
  mode: 'production',
  entry: './cqueue.js',
  target: 'node',
  output: {
    library: 'CQueue',
    libraryTarget: 'umd',
    filename: 'cqueue.js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
module.exports = [forNode,forBrowser]