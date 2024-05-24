import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
const path = require('path')
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const ThermalPrinter = require('node-thermal-printer').printer
const PrinterTypes = require('node-thermal-printer').types

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    show: false,
    fullscreen: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on('print-request', async (event, arg) => {
    console.log('Received print request with:', arg)
    await printReceipt(arg)
    event.reply('print-reply', 'Printed successfully')
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

async function printReceipt(finalOrder) {
  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: '//localhost/XP-80C',
    options: {
      timeout: 5e3
    }
  })
  const logoPath = path.join(__dirname, '../../resources/logo.png')
  const infoLogo = path.join(__dirname, '../../resources/BONSHEIN.png')
  printer.alignCenter()
  await printer.printImage(logoPath)
  printer.alignCenter()
  await printer.printImage(infoLogo)
  printer.drawLine()
  printer.bold(true)
  printer.alignCenter()
  printer.code128(`${finalOrder.reference}`)
  printer.println()
  printer.bold(true)

  const finalOrderDate = new Date(finalOrder.date)
  finalOrderDate.setHours(finalOrderDate.getHours() + 1)

  const formattedDate = finalOrderDate.toISOString().slice(0, 10)
  const formattedTime = finalOrderDate.toISOString().slice(11, 19)

  printer.println(`Date: ${formattedDate}   Heure: ${formattedTime}`)
  printer.drawLine()
  printer.alignLeft()
  printer.tableCustom([
    { text: 'Produit', align: 'LEFT', width: 0.5 },
    { text: 'Reduction', align: 'CENTER', width: 0.25 },
    { text: 'Prix', align: 'RIGHT', width: 0.25 }
  ])
  printer.drawLine()
  finalOrder.orderItems.forEach((item) => {
    printer.tableCustom([
      { text: item.productName, align: 'LEFT', width: 0.5 },
      { text: `${item.discount} %`, align: 'CENTER', width: 0.25 },
      { text: `${item.finalPrice} DA`, align: 'RIGHT', width: 0.25 }
    ])
    printer.drawLine()
  })
  printer.alignRight()
  printer.setTextSize(1, 1)
  printer.alignCenter()
  printer.bold(true)
  // {
  //   printer.println(`Soustotal: ${finalOrder.total} DA`)
  //   printer.newLine()
  //   printer.println(`Reduction: ${finalOrder.reduction} DA`)
  //   printer.newLine()
  // }
  printer.newLine()
  printer.setTextSize(2, 2)
  printer.println(`Total: ${finalOrder.total} DA`)
  if (finalOrder.versement > 0) {
    printer.println(`Versee: ${finalOrder.versement} DA`)
    printer.println(`Reste: ${finalOrder.total - finalOrder.versement} DA`)
  }
  printer.setTextNormal()

  printer.bold(true)
  if (finalOrder.phone) {
    printer.drawLine()
    printer.alignLeft()
    printer.println('Client:')
    printer.println(`Telephone: ${finalOrder.phone}`)
  }

  printer.drawLine()
  printer.alignCenter()
  printer.bold(true)
  printer.println('Merci pour votre visite , a bientot !')
  printer.drawLine()

  printer.alignLeft()
  printer.bold(true)
  printer.println('Kadri TECH')
  printer.setTextNormal()
  printer.println('. Sponsor ( Facebook & Instagram). ')
  printer.println('. developpement Des sites web & logiciels. ')
  printer.println('. Publicite digitale.')
  printer.println('. 06.96.09.24.52')

  const minLines = 50
  const currentLines = printer.buffer.length
  const additionalLines = minLines - currentLines
  for (let i = 0; i < additionalLines; i++) {
    printer.println('')
  }
  printer.cut()
  try {
    await printer.execute()
    console.log('Print success.')
  } catch (error) {
    console.error('Print failed:', error)
  }
}
