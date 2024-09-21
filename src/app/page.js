'use client'
import String from '@/components/String';
import styles from './page.module.css'
import Ukulele from '@/components/Ukulele';

export default function Home() {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            {/* <String /> */}
            <Ukulele width="100%"/>
        </div>
    </div>
  )
}
