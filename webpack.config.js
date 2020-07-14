const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },
  resolve: {
    alias: {
      node_modules: path.join(__dirname, 'node_modules'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { context: 'src/', from: '**/*.html', to: '../dist' },
        { context: 'src/', from: 'img', to: '../dist/img' },
        { context: 'src/', from: 'css', to: '../dist/css' },
      ],
    }),
  ],
}
