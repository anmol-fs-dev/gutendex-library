import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBooks } from '../api/gutendexApi.js'
import BookCard from '../components/BookCard/BookCard.jsx'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import Loader from '../components/Loader/Loader.jsx'
import styles from './Books.module.css'
import { debounce } from '../utils/bookUtils.js'
import { t } from '../i18n/strings.js'

const MIN_CHARS = 2

const Books = () => {
  const { category } = useParams()

  // raw user input (updates on every keystroke)
  const [rawQuery, setRawQuery] = useState('')
  // debounced query (used for fetching)
  const [query, setQuery] = useState('')

  const [books, setBooks] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sentinelRef = useRef(null)
  const abortRef = useRef(null)

  // stable debouncer for the raw input → debounced query
  const debouncedSetQuery = useMemo(() => debounce((val) => setQuery(val), 500), [])

  // when raw input changes, update debounced query
  useEffect(() => {
    debouncedSetQuery(rawQuery)
  }, [rawQuery, debouncedSetQuery])

  const loadBooks = useCallback(
    async (pageUrl) => {
      // cancel previous request if any
      if (abortRef.current) abortRef.current.abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        setLoading(true)
        const effectiveQuery = query.trim()

        const data = await fetchBooks(
          {
            topic: category,
            search:
              effectiveQuery.length === 0
                ? undefined
                : effectiveQuery.length < MIN_CHARS
                ? undefined // gate: don’t hit API for 1-char queries
                : effectiveQuery,
            pageUrl
          },
          { signal: controller.signal } // <-- pass abort signal
        )

        setBooks((prev) => [...prev, ...data.results])
        setNextUrl(data.next)
      } catch (e) {
        if (e.name === 'CanceledError' || e.name === 'AbortError') return
        console.error(e)
        setError(t('error_fetch'))
      } finally {
        setLoading(false)
      }
    },
    [category, query]
  )

  // reset + initial fetch when category or debounced query changes
  useEffect(() => {
    setBooks([])
    setNextUrl(null)
    setError('')
    loadBooks()
    return () => {
      if (abortRef.current) abortRef.current.abort()
    }
  }, [category, query, loadBooks])

  // infinite scroll
  useEffect(() => {
    if (!nextUrl) return
    const node = sentinelRef.current
    if (!node) return

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadBooks(nextUrl)
      }
    }, { rootMargin: '200px' })

    io.observe(node)
    return () => io.disconnect()
  }, [nextUrl, loadBooks])

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{category.toUpperCase()}</h2>
      <SearchBar value={rawQuery} onChange={setRawQuery} />
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.grid}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {loading && <Loader />}
      <div ref={sentinelRef} aria-hidden="true" />
    </div>
  )
}

export default Books
