import axios from 'axios'

const BASE_URL = 'http://skunkworks.ignitesol.com:8000/books'
const BASE = new URL(BASE_URL)

export const normalizeNextUrl = (pageUrl) => {
  const u = new URL(pageUrl, BASE_URL)
  u.protocol = BASE.protocol
  u.host = BASE.host
  return u.toString()
}

export const fetchBooks = async ({ topic, search, pageUrl }, opts = {}) => {
  let url = BASE_URL
  const params = {}

  if (pageUrl) {
    url = normalizeNextUrl(pageUrl)
  } else {
    if (topic) params.topic = topic
    if (search) params.search = search
    params.mime_type = 'image/'
  }

  const res = await axios.get(url, {
    params,
    withCredentials: false,
    signal: opts.signal // <-- accept AbortController signal
  })
  return res.data
}
