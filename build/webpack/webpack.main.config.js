const path = require('path')
const entry = path.join(__dirname, '../../main.js')

module.exports = {
  entry: entry,
  output: {
    filename: 'main.js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      }
    ]
  },
  target: 'electron-main'
}