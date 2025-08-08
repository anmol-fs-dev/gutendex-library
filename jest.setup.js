import '@testing-library/jest-dom'

class IO {
  constructor(cb) { this.cb = cb }
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = IO
if (!window.open) window.open = jest.fn()
if (!window.alert) window.alert = jest.fn()

const origWarn = console.warn
beforeAll(() => {
  console.warn = (...args) => {
    const msg = String(args[0] || '')
    if (
      msg.includes('React Router Future Flag Warning: React Router will begin wrapping state updates') ||
      msg.includes('React Router Future Flag Warning: Relative route resolution within Splat routes is changing')
    ) {
      return
    }
    origWarn(...args)
  }
})

afterAll(() => {
  console.warn = origWarn
})
