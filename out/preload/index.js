"use strict";
const require$$0 = require("electron");
var dist = {};
Object.defineProperty(dist, "__esModule", { value: true });
var electron = require$$0;
const electronAPI = {
  ipcRenderer: {
    send(channel, ...args) {
      electron.ipcRenderer.send(channel, ...args);
    },
    sendTo(webContentsId, channel, ...args) {
      electron.ipcRenderer.sendTo(webContentsId, channel, ...args);
    },
    sendSync(channel, ...args) {
      return electron.ipcRenderer.sendSync(channel, ...args);
    },
    sendToHost(channel, ...args) {
      electron.ipcRenderer.sendToHost(channel, ...args);
    },
    postMessage(channel, message, transfer) {
      if (!process.contextIsolated) {
        electron.ipcRenderer.postMessage(channel, message, transfer);
      }
    },
    invoke(channel, ...args) {
      return electron.ipcRenderer.invoke(channel, ...args);
    },
    on(channel, listener) {
      electron.ipcRenderer.on(channel, listener);
      return () => {
        electron.ipcRenderer.removeListener(channel, listener);
      };
    },
    once(channel, listener) {
      electron.ipcRenderer.once(channel, listener);
    },
    removeListener(channel, listener) {
      electron.ipcRenderer.removeListener(channel, listener);
      return this;
    },
    removeAllListeners(channel) {
      electron.ipcRenderer.removeAllListeners(channel);
    }
  },
  webFrame: {
    insertCSS(css) {
      return electron.webFrame.insertCSS(css);
    },
    setZoomFactor(factor) {
      if (typeof factor === "number" && factor > 0) {
        electron.webFrame.setZoomFactor(factor);
      }
    },
    setZoomLevel(level) {
      if (typeof level === "number") {
        electron.webFrame.setZoomLevel(level);
      }
    }
  },
  process: {
    get platform() {
      return process.platform;
    },
    get versions() {
      return process.versions;
    },
    get env() {
      return { ...process.env };
    }
  }
};
function exposeElectronAPI() {
  if (process.contextIsolated) {
    try {
      electron.contextBridge.exposeInMainWorld("electron", electronAPI);
    } catch (error) {
      console.error(error);
    }
  } else {
    window.electron = electronAPI;
  }
}
var electronAPI_1 = dist.electronAPI = electronAPI;
dist.exposeElectronAPI = exposeElectronAPI;
const api = {};
if (process.contextIsolated) {
  try {
    require$$0.contextBridge.exposeInMainWorld("electron", electronAPI_1);
    require$$0.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI_1;
  window.api = api;
}
