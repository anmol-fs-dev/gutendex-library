import React from 'react'
import styles from './Loader.module.css'
import { t } from '../../i18n/strings'

const Loader = () => (
  <div role="status" aria-live="polite" aria-label={t('loading')}>
    <div className={styles.loader}></div>
  </div>
)

export default Loader
