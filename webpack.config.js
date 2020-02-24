const path = require('path') // ES5 import syntax
const WebpackBar = require('webpackbar')

module.exports = {
  entry: './src/app.js',
  output: {
    // __dirname targets root path of the project
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.scss$/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    noInfo: true,
    open: true,
    stats: 'minimal'
  },
  plugins: [new WebpackBar()]
}

// loader
