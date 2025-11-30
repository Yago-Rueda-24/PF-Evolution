import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { CryptoService } from '../service/crypto_service'

// Custom APIs for renderer
const api = {
  cryptoService: new CryptoService()
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronAPI', {
      showError: (message: string) => ipcRenderer.invoke('show-error-dialog', message),
      exit: () => ipcRenderer.send('exit')
    })
    contextBridge.exposeInMainWorld('cryptoApi', {
      generateKey: () => api.cryptoService.generateKey(),
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
