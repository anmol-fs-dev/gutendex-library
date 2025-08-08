import { openBookInBrowser } from '../utils/bookUtils'

describe('openBookInBrowser', () => {
  beforeEach(() => {
    window.open = jest.fn()
    window.alert = jest.fn()
  })

  it('opens HTML when available', () => {
    const formats = {
      'text/html; charset=utf-8': 'http://example.com/book.html',
      'application/pdf': 'http://example.com/book.pdf'
    }
    openBookInBrowser(formats)
    expect(window.open).toHaveBeenCalledWith(
      'http://example.com/book.html',
      '_blank',
      'noopener,noreferrer'
    )
    expect(window.alert).not.toHaveBeenCalled()
  })

  it('falls back to PDF then TXT', () => {
    const formats = {
      'application/pdf': 'http://example.com/book.pdf',
      'text/plain': 'http://example.com/book.txt'
    }
    openBookInBrowser(formats)
    expect(window.open).toHaveBeenCalledWith(
      'http://example.com/book.pdf',
      '_blank',
      'noopener,noreferrer'
    )
  })
})
