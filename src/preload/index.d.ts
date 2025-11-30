import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronAPI: {
      showError: (message: string) => void,
      exit: () => void
    }
    cryptoApi: {
      generateKey: () => string,
      encrypt: (text: string, key: string) => { iv: string, encryptedData: string },
      decrypt: (iv: string, encryptedData: string, key: string) => string
    }
  }
}
