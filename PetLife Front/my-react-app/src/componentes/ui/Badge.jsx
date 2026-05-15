import styles from './Badge.module.css'

/**
 * Badge de status
 * @param {'ok'|'warning'|'expired'|'blue'|'pink'} variant
 */
export default function Badge({ children, variant = 'ok' }) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {children}
    </span>
  )
}
