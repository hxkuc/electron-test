const path = require('path')
const electron = require('electron')
const { spawn } = require('child_process')
const { buildMain, buildRenderer } = require('./build')

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
.then(res => console.log(66, res))
.catch(err => console.log(err))