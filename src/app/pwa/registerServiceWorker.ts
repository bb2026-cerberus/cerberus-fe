import { registerSW } from 'virtual:pwa-register'

const registerServiceWorker = () => {
  if (import.meta.env.DEV) {
    return
  }

  registerSW({
    immediate: true,
  })
}

export default registerServiceWorker
