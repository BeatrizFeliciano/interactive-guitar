'use client'
import Line from '@/components/Line';
import styles from './page.module.css'
import Ukulele from '@/components/Ukulele';

export default function Home() {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <Line />
            <Line />
            <Line />
            <Line />
            <Ukulele width="100%"/>
        </div>
    </div>
  )
}
