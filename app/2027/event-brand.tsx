import Link from "next/link";

import styles from "./event.module.css";

export function EventBrand({ home = false }: { home?: boolean }) {
  return (
    <Link className={styles.brand} href={home ? "#event-top" : "/2027"} aria-label={home ? "青春發聲中，回到頁首" : "青春發聲中，返回活動首頁"}>
      <span className={styles.voiceSticker} aria-hidden="true">
        <span className={styles.voiceCaption}>YOUTH ON AIR</span>
        <span className={styles.voiceWords}>青春發聲<span className={styles.voiceLive}>中</span></span>
        <span className={styles.voiceWaves}><i /><i /><i /></span>
      </span>
    </Link>
  );
}
