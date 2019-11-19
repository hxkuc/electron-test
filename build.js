// 先打包mainjs的主进程再打包renderer进程然后执行electron
const fs = require('fs-extra')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const electron = require('electron')
const { spawn } = require('child_process')
const path = require('path')
const WebpackDevServer = require('webpack-dev-server')
const webpackDevServerConfig = Object.assign({}, webpackConfig.devServer, {
  contentBase: './dist',
  hot: true
})

// 构建主进程
async function buildMain () {
  // 当前只拷贝main文件到dist目录下
  console.log('buildMain')
  const mainJsPath = path.join(__dirname, 'main.js')
  const distMainJsPath = path.join(__dirname, 'dist/main.js')
  fs.copySync(mainJsPath, distMainJsPath)
}

// 构建子进程
function buildRenderer () {
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

// 启动electron程序
function startElectron () {
  const args = [path.join(__dirname, 'dist/main.js')]
  console.log(111)
  spawn(electron, args)
}

// 程序启动流程
async function start () {
  await Promise.all([buildMain(), buildRenderer()])
  startElectron()
}

start()
.then(res => console.log(res))
.catch(err => console.log(err))