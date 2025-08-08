import React from 'react'
import styles from './BookCard.module.css'
import { openBookInBrowser } from '../../utils/bookUtils'

const BookCard = ({ book }) => {
  const { title, authors = [], formats = {} } = book
  const authorNames = authors.map((a) => a.name).join(', ')

  return (
    <div
      className={styles.card}
      onClick={() => openBookInBrowser(formats)}
      onKeyDown={(e) => { if (e.key === 'Enter') openBookInBrowser(formats) }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${title}`}
    >
      <img src={formats['image/jpeg']} alt={title} className={styles.cover} loading="lazy" />
      <div className={styles.info}>
        <h3>{title}</h3>
        <p>{authorNames || 'Unknown Author'}</p>
      </div>
    </div>
  )
}

export default BookCard
