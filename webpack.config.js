// Generated using webpack-cli https://github.com/webpack/webpack-cli
import HtmlWebpackPlugin from 'html-webpack-plugin'
/* eslint-disable */
const isProduction = process.env.NODE_ENV === 'production';
/* eslint-enable */

const config = {
  entry: './src/index.js',
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  ignoreWarnings: [
    {
      module: /module2.js\?[34]/, // A RegExp
    },
    {
      module: /[13]/,
      message: /homepage/,
    },
    /warning from compiler/,
    () => true,
  ],
}

export default () => {
  if (isProduction) {
    config.mode = 'production'
  }
  else {
    config.mode = 'development'
  }
  return config
}
