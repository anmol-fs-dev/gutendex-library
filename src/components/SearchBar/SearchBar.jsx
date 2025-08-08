import React from 'react'
import styles from './SearchBar.module.css'
import { t } from '../../i18n/strings'

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      className={styles.search}
      type="search"
      placeholder={t('search_placeholder')}
      aria-label={t('search_placeholder')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default SearchBar
