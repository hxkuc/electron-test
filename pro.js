/**
 * 打包流程
 * 1. 先打包文件资源到固定目录下
 * 2. 调用electron-builder进行一次性打包
 */


// 确定目录
const fs = require('fs-extra')
const path = require('path')
const buildPath = path.join(__dirname, 'dist')
const { buildMain, buildRendererPro } = require('./build')
const builder = require('electron-builder')

const build = {
  "appId": "your.id",
  "mac": {
    "category": "your.app.category.type"
  },
  "directories": {
    "app": "./build"
  }
}

// 清空目录
fs.removeSync(buildPath)

// 构建资源

function buildResources () {
  return Promise.all([buildMain(), buildRendererPro()])
}

function copyPackageJson () {
  const packagePath = path.join(__dirname, 'package.json')
  const buildPackagePath = path.join(__dirname, './build/package.json')
  return fs.copy(packagePath, buildPackagePath)
}

async function start () {
  await copyPackageJson()
  await buildResources()
  // 调用打包程序
  await builderPack()
}


function builderPack () {
  builder.build({
    config: build
  })
}


start()






