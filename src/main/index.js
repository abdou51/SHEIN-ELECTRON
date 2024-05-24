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
    await printReceipt()
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

async function printReceipt() {
  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: '//localhost/XP-80C',
    options: {
      timeout: 5e3
    }
  })
  const order = {
    reference: '202405150001',
    note: 'Please deliver between 10 AM and 5 PM.',
    shippingType: 'home',
    shippingPrice: 500,
    status: 'pending',
    fullName: 'John Doe',
    address: '123 Main St',
    wilaya: 'Wilaya Name',
    commune: 'Commune Name',
    phoneNumber1: '1234567890',
    phoneNumber2: '0987654321',
    reduction: 500,
    total: 7e3,
    verse: 7e3,
    rest: 0,
    orderItems: [
      {
        product: {
          _id: '6644c2157a66136026b4abc2',
          name: 'Chemise rouge'
        },
        hex: '#ff0000',
        size: 42,
        quantity: 2,
        price: 3500
      },
      {
        product: {
          _id: '6644c2157a66136026b4abc3',
          name: 'Pantalon bleu'
        },
        hex: '#0000ff',
        size: 40,
        quantity: 1,
        price: 4e3
      }
    ],
    createdAt: /* @__PURE__ */ new Date('2024-05-15T14:09:25.469Z')
  }
  const logoPath = path.join(__dirname, '../../resources/logo.png')
  const infoLogo = path.join(__dirname, '../../resources/BONSHEIN.png')
  printer.alignCenter()
  await printer.printImage(logoPath)
  printer.alignCenter()
  await printer.printImage(infoLogo)
  printer.drawLine()
  printer.bold(true)
  printer.alignCenter()
  printer.code128(`${order.reference}`)
  printer.println()
  printer.bold(true)
  printer.println(
    `Date: ${order.createdAt.toISOString().slice(0, 10)}   Heure : ${order.createdAt.toISOString().slice(11, 19)}`
  )
  printer.drawLine()
  printer.alignLeft()
  printer.tableCustom([
    { text: 'Produit', align: 'LEFT', width: 0.5 },
    { text: 'Quantite', align: 'CENTER', width: 0.25 },
    { text: 'Prix', align: 'RIGHT', width: 0.25 }
  ])
  printer.drawLine()
  order.orderItems.forEach((item) => {
    printer.tableCustom([
      { text: item.product.name, align: 'LEFT', width: 0.5 },
      { text: `${item.quantity}`, align: 'CENTER', width: 0.25 },
      { text: `${item.quantity * item.price} DA`, align: 'RIGHT', width: 0.25 }
    ])
    printer.drawLine()
  })
  printer.alignRight()
  printer.setTextSize(1, 1)
  printer.alignCenter()
  printer.bold(true)
  {
    printer.println(`Soustotal: ${order.total} DA`)
    printer.newLine()
    printer.println(`Reduction: ${order.reduction} DA`)
    printer.newLine()
  }
  printer.newLine()
  printer.setTextSize(2, 2)
  printer.println(`Total: ${order.total + order.shippingPrice} DA`)
  printer.setTextNormal()
  printer.drawLine()
  printer.setTextNormal()
  printer.drawLine()
  printer.alignLeft()
  printer.bold(true)
  printer.println('Client:')
  printer.println('Telephone: 0657898754')
  printer.drawLine()
  printer.alignCenter()
  printer.bold(true)
  printer.println('Merci pour votre visite , a bientot !')
  printer.drawLine()
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
