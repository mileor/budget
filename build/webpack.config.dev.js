const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    hot: true,
    watchOptions: {
      poll: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
              ],
              sourceMap: true,
            },
          },
          'sass-loader',
          {
            loader: 'sass-loader',
            options: {
              // eslint-disable-next-line quotes
              prependData: `@import "./src/assets/scss/app.scss";`,
            },
          },
        ],
      },
    ],
  },
});
