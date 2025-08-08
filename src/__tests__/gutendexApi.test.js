import axios from 'axios'
import { fetchBooks } from '../api/gutendexApi'

jest.mock('axios')

beforeEach(() => {
    jest.clearAllMocks()
})

describe('fetchBooks', () => {
  it('calls axios.get with base URL and params on initial fetch', async () => {
    axios.get.mockResolvedValueOnce({ data: { results: [], next: null } })
    await fetchBooks({ topic: 'fiction', search: undefined, pageUrl: undefined })

    expect(axios.get).toHaveBeenCalledWith(
      'http://skunkworks.ignitesol.com:8000/books',
      { params: { topic: 'fiction', mime_type: 'image/' }, withCredentials: false }
    )
  })

  it('calls axios.get with normalized next URL on pagination', async () => {
    axios.get.mockResolvedValueOnce({ data: { results: [], next: null } })
    await fetchBooks({ topic: 'fiction', pageUrl: '/books/?page=2&topic=fiction' })
  
    const calls = axios.get.mock.calls
    const [url] = calls[calls.length - 1]
    expect(url).toBe('http://skunkworks.ignitesol.com:8000/books/?page=2&topic=fiction')
  })
})
