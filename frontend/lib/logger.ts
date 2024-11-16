const isProd = process.env.NODE_ENV === 'production'

export const logger = {
  log: (...args: any[]) => {
    if (!isProd) {
      console.log(...args)
    }
  },
  error: (...args: any[]) => {
    console.error(...args)
  },
  warn: (...args: any[]) => {
    console.warn(...args)
  },
  info: (...args: any[]) => {
    if (!isProd) {
      console.info(...args)
    }
  }
}
