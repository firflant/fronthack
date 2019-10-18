const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')


module.exports = {
  entry: './js/index.js',

  output: {
    path: path.join(__dirname, '/static'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, '/js'),
        use: ['babel-loader'],
      },
    ],
  },

  plugins: [
    new MinifyPlugin(),
  ]
}
