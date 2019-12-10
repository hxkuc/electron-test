// 先打包mainjs的主进程再打包renderer进程然后执行electron
const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const WebpackDevServer = require('webpack-dev-server')
const webpackDevServerConfig = Object.assign({}, webpackConfig.devServer, {
  contentBase: './dist',
  hot: true
})

// 构建主进程
exports.buildMain = async function () {
  // 当前只拷贝main文件到dist目录下
  console.log('buildMain')
  const mainJsPath = path.join(__dirname, 'main.js')
  const distMainJsPath = path.join(__dirname, 'dist/main.js')
  fs.copySync(mainJsPath, distMainJsPath)
}

// 构建子进程
exports.buildRenderer = function () {
  console.log('buildRenderer')
  return new Promise((resolve, reject) => {
    try {
      WebpackDevServer.addDevServerEntrypoints(webpackConfig, webpackDevServerConfig);
      const compiler = webpack(webpackConfig)
      const server = new WebpackDevServer(compiler, webpackDevServerConfig)
      server.listen(8080, '127.0.0.1', () => {
        console.log('Starting server on http://localhost:8080')
        resolve()
      })
      /* webpack(webpackConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
          // 在这里处理错误
          reject(err || stats.hasErrors())
        }
        // 处理完成
        resolve()
      }); */
    } catch (err) {
      reject(err)
    }
  })
}