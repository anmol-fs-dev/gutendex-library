import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BookCard from '../components/BookCard/BookCard'

describe('BookCard', () => {
  beforeEach(() => {
    window.open = jest.fn()
  })

  it('renders title and author and triggers open on click', () => {
    const book = {
      id: 1,
      title: 'My Book',
      authors: [{ name: 'Jane Doe' }],
      formats: {
        'image/jpeg': 'http://example.com/cover.jpg',
        'text/html': 'http://example.com/book.html'
      }
    }
    render(<BookCard book={book} />)

    expect(screen.getByText('My Book')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /open my book/i }))
    expect(window.open).toHaveBeenCalledWith('http://example.com/book.html', '_blank', 'noopener,noreferrer')
  })
})
