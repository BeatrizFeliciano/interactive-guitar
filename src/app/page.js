'use client'
import Line from '@/components/Line';
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <Line />
            <Line />
            <Line />
            <Line />
        </div>
    </div>
  )
}
