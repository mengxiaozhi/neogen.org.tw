import { ArrowUpRight } from "lucide-react";
import { REGISTRATION_FORM_URL } from "@/lib/event-registration";
import styles from "./registration.module.css";

export function RegistrationForm() {
  return (
    <section id="event-registration" className={styles.section} aria-labelledby="registration-heading">
      <div className={styles.intro}>
        <h3 id="registration-heading">把你的名字，<br /><span>留給下一個現場。</span></h3>
        <p className={styles.date}>2027 年 1 月 25 日至 27 日，一起走進公共現場。</p>
        <div className={styles.ticket} aria-hidden="true"><strong>01.25 — 01.27</strong><span>2027 青年參議院</span></div>
        <p className={styles.description}>從認識你，到聽見你的想法。<br />請依表單指引完成報名，活動安排以表單內的說明及主辦單位公告為準。</p>
      </div>
      <div className={styles.panel}>
        <header className={styles.header}><h4>2027 青年參議院 · 報名資料</h4><span>GOOGLE FORMS</span></header>
        <div className={styles.guide}>
          <p className={styles.introduction}>請至 Google 表單填寫報名資料。</p>
          <a className={styles.submit} href={REGISTRATION_FORM_URL} target="_blank" rel="noopener noreferrer" aria-describedby="registration-help">填寫報名表單 <ArrowUpRight size={21} aria-hidden="true" /></a>
          <p id="registration-help" className={styles.externalHint}>另開新分頁，需登入 Google 帳號。</p>
        </div>
      </div>
    </section>
  );
}
