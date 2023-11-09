'use strict'

import { app, protocol, BrowserWindow, dialog} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { autoUpdater } from "electron-updater"
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const { powerMonitor } = require('electron');
const isDevelopment = process.env.NODE_ENV !== 'production'
const { powerSaveBlocker } = require('electron');
import axios from "axios";
import { API_URL, TOKEN } from "./global";
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let globalAssistantId; 

async function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      enableRemoteModule: true, // <--- added
      nodeIntegration: true,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: false
    }
  })

  function getAssistantId(){
    win.webContents
    .executeJavaScript('({...localStorage});', true)
    .then(localStorage => {
      assistantId = localStorage.idAssistant; 
      globalAssistantId = assistantId
    });
  }

  let assistantId;
  getAssistantId();
  
  win.on('close', (event) => {
    event.preventDefault();
    getAssistantId();
    dialog.showMessageBox({
      type: 'question',
      buttons: ['Cancelar', 'Salir'],
      cancelId: 1,
      defaultId: 0,
      title: 'Confirmar salida',
      message: '¿Está seguro de que desea salir de la aplicación?'
    }).then(({ response }) => { 
      getAssistantId();
      if (response) {
        let headers = {
          Authorization: `Token ${TOKEN}`,
          "Content-Type": "application/json;charset=utf-8",
        };
        let path = `${API_URL}api/staff/assistant/${assistantId}/`;
        axios.patch(
          path, 
          {
            "is_busy": true,
            "in_break": true,
            "in_lunch": true,
          },
          { headers }
        ).then((response) => { 
          return response;
        }).catch((e) => {
          return e;
        });
        setTimeout(() => {
          assistantId = null
          win.destroy();
          app.quit();  
        }, 1000);
      }
    })
});

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    autoUpdater.checkForUpdatesAndNotify()
  }
}
autoUpdater.checkForUpdates();

autoUpdater.on("checking-for-update", () => {
  console.log("checking-for-update");
});

autoUpdater.on("update-available", () => {
  console.log("update-available");
});

autoUpdater.on("update-not-available", () => {
  console.log("update-not-available");
});

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Reiniciar'],
    title: 'Actualización de la aplicación',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail:
      'Se ha descargado una nueva versión. Reinicie la aplicación asistente para aplicar las actualizaciones.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
}) 

autoUpdater.on('error', (message) => {
  console.error('There was a problem updating the assistant-app')
  console.error(message)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  var updateApp = require('update-electron-app');
  console.log(updateApp, " update app ");
  updateApp({
      repo: '', // defaults to package.json
      updateInterval: '5 minutes',
      notifyUser: true
  });
  createWindow(); 
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  // Detectar cuando la PC está a punto de suspenderse
  powerMonitor.on("lock-screen", () => {
    powerSaveBlocker.start("prevent-display-sleep");
    console.log('La PC se está lockeando...', globalAssistantId);

  });

  powerMonitor.on('suspend', () => {
    const id = powerSaveBlocker.start('prevent-display-sleep')
    console.log(powerSaveBlocker.isStarted(id))
    // Realiza la llamada a la API
    axios.patch(`${API_URL}api/staff/assistant/${globalAssistantId}/`, {
      is_busy: true,
      in_break: true,
      in_lunch: true,
    }, {
      headers: {
        Authorization: `Token ${TOKEN}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }).then(() => {
      // Si la llamada a la API es exitosa, permite que la aplicación se suspenda
       
      powerSaveBlocker.stop(id)

    }).catch((e) => {
      // Si la llamada a la API falla, muestra un mensaje de error y permite que la aplicación se suspenda
      console.error(e);
      powerSaveBlocker.stop(id)

    });
  });

})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}