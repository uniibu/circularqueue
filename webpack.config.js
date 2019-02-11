const path = require('path')
module.exports = {
  mode: 'production',
  entry: './cbuffer.js',
  output: {
    library: 'CBuffer',
    libraryTarget: 'umd',
    filename: 'cbuffer.js',
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
