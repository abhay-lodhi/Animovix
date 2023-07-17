import React from 'react'
import Image from 'next/image'
import styles from '@/styles/Profile.module.css'

const Profilecard = () => {
  return (
    <div>
        <article className={styles.card}>
            <Image src="/kakashi.jpg" fill alt='Anime/Manga Image'/>
    {/* <div className={styles.temporary_text}>
        Place image here
    </div> */}
<div className={styles.card_content}>
    <span className={styles.card_title}>This is a Title</span>
        <span className={styles.card_subtitle}>Thsi is a subtitle of this page. Let us see how it looks on the Web.</span>
        <p className={styles.card_description}>Lorem ipsum dolor, sit amet  expedita exercitationem recusandae aut dolor tempora aperiam </p>
    
</div>
</article>
    </div>
  )
}

export default Profilecard