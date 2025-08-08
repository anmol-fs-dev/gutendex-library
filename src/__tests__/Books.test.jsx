import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import * as api from '../api/gutendexApi'
import Books from '../pages/Books'

jest.spyOn(api, 'fetchBooks').mockResolvedValue({
  results: [
    {
      id: 1,
      title: 'Sample',
      authors: [{ name: 'Author' }],
      formats: { 'image/jpeg': 'http://example.com/c.jpg', 'text/plain': 'http://example.com/txt' }
    }
  ],
  next: null
})

describe('Books page', () => {
  it('renders heading and search', async () => {
    render(
      <MemoryRouter initialEntries={['/books/fiction']}>
        <Routes>
          <Route path="/books/:category" element={<Books />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByText('FICTION')).toBeInTheDocument()
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
    expect(await screen.findByText('Sample')).toBeInTheDocument()
  })
})
