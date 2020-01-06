const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')


module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'main.js',
    publicPath: '/',
  },

  module: {
    rules: [

      {
        test: /\.s[ac]ss|css$/i,
        include: path.join(__dirname, '/src'),
        use: ['babel-loader'],
      },

      {
        test: /\.s[ac]ss|css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'),
                require('cssnano'),
              ],
            },
          },
          'sass-loader',
        ],
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },

    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

    new CopyWebpackPlugin([
      {
        from: '**/*.*',
        to: './',
        context: './public/',
        ignore: ['index.html'],
      },
    ]),

    new ManifestPlugin({
      seed: {
        short_name: 'Fronthack React App',
        name: 'Fronthack React App',
        theme_color: '#1fc59c',
        background_color: '#1fc59c',
        display: 'standalone',
      },
    }),

    new GenerateSW({
      clientsClaim: true,
      exclude: [/asset-manifest\.json$/],
    }),

    new WebpackCleanupPlugin(),

  ],
}
