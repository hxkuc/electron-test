const { app, BrowserWindow } = require('electron')

function createWindow () {   
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载index.html文件
  // win.loadURL('http://127.0.0.1:8080')
  // 根据环境变量做出选择
  const url = process.env.NODE_ENV === 'production'
  ?
  `file://${__dirname}/index.html`
  :
  'http://127.0.0.1:8080';
  win.loadURL(url)
}

app.on('ready', createWindow)