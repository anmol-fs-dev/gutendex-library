import React from 'react'
import styles from './CategoryList.module.css'
import { useNavigate } from 'react-router-dom'
import { t } from '../../i18n/strings'

const categories = [
  'Fiction',
  'Drama',
  'Humor',
  'Politics',
  'Philosophy',
  'History',
  'Adventure'
]

const CategoryList = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('categories_title')}</h1>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={styles.button}
            onClick={() => navigate(`/books/${cat.toLowerCase()}`)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
