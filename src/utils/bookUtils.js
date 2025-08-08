import { t } from '../i18n/strings'

export const openBookInBrowser = (formats) => {
  const preferred = ['text/html', 'application/pdf', 'text/plain']

  for (const type of preferred) {
    for (const key in formats) {
      if (key.startsWith(type) && !key.includes('.zip')) {
        window.open(formats[key], '_blank', 'noopener,noreferrer')
        return
      }
    }
  }
  alert(t('no_viewable'))
}

export const debounce = (fn, delay = 400) => {
  let id
  return (...args) => {
    clearTimeout(id)
    id = setTimeout(() => fn(...args), delay)
  }
}
