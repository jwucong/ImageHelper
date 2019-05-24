const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  mode: 'production',
  entry: './src/imageHelper.js',
  output: {
    path: resolve('dist'),
    filename: 'imageHelper.js',
    library: 'ImageHelper',
    libraryTarget: 'umd',
    libraryExport: "default",
    globalObject: 'this'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolve('src')],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
