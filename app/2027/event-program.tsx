import styles from "./program.module.css";

const roles = [
  {
    number: "01", title: "立法委員", english: "LEGISLATOR",
    description: "參與法案撰寫、審查、質詢與院會協商。",
  },
  {
    number: "02", title: "國會記者", english: "PARLIAMENTARY PRESS",
    description: "體驗採訪、國會主播、新聞稿與短影音製作。",
  },
] as const;

const topics = [
  { number: "01", title: "善終醫療", bill: "《安樂死法》" },
  { number: "02", title: "體育政策", bill: "《國民體育法》" },
  { number: "03", title: "公共職務資格", bill: "《臺灣地區與大陸地區人民關係條例》" },
] as const;

const days = [
  {
    number: "01", date: "2027-01-25", label: "01.25（一）", title: "走進議場，理解規則",
    summary: "導覽議場、認識規則、組成黨團。",
  },
  {
    number: "02", date: "2027-01-26", label: "01.26（二）", title: "審查法案，展開協商",
    summary: "專家座談、法案審查、模擬質詢。",
  },
  {
    number: "03", date: "2027-01-27", label: "01.27（三）", title: "完成議案，帶走觀點",
    summary: "完成議案、院會表決、分享反思。",
  },
] as const;

export function EventProgram() {
  return (
    <div className={styles.program}>
      <section id="event-practical" tabIndex={-1} className={styles.block} aria-labelledby="practical-heading">
        <header className={styles.heading}><span>PLAN YOUR VISIT</span><h3 id="practical-heading">報名時程與費用</h3></header>
        <dl className={styles.timeline}>
          <div><dt>報名開始</dt><dd><time dateTime="2026-10-15">2026.10.15</time></dd></div>
          <div><dt>報名截止</dt><dd><time dateTime="2026-12-15">2026.12.15</time></dd></div>
          <div><dt>錄取名單公布</dt><dd><time dateTime="2026-12-25">2026.12.25</time></dd></div>
        </dl>
        <div className={styles.fees}>
          <article className={styles.fee}><p>不含住宿</p><h4><span>NT$</span> 2,000</h4><p>含兩天午餐、晚餐及保險。</p></article>
          <article className={`${styles.fee} ${styles.stay}`}><p>含住宿</p><h4><span>NT$</span> 4,000</h4><p>含兩天住宿、午餐、晚餐及保險。</p></article>
        </div>
        <p className={styles.note}>住宿地點待公布；錄取及繳費方式以電子郵件通知。</p>
      </section>

      <section id="event-roles" tabIndex={-1} className={styles.block} aria-labelledby="roles-heading">
        <header className={styles.heading}><span>TAKE YOUR ROLE</span><h3 id="roles-heading">換一個角色，看見公共決策。</h3></header>
        <div className={styles.roles}>
          {roles.map((role) => <article key={role.number} className={styles.role}><div className={styles.roleLabel}><span>{role.number}</span><span>{role.english}</span></div><h4>{role.title}</h4><p>{role.description}</p></article>)}
        </div>
        <div className={styles.topicHeading}><h4>三個委員會，三組討論議題。</h4></div>
        <div className={styles.topics}>
          {topics.map((topic) => <article key={topic.number} className={styles.topic}><span>{topic.number}</span><h5>{topic.title}</h5><p className={styles.bill}>模擬審議<br /><strong>{topic.bill}</strong></p></article>)}
        </div>
        <p className={styles.note}>議題資料與講師名單以錄取通知及後續公告為準。</p>
      </section>

      <section id="event-schedule" tabIndex={-1} className={styles.block} aria-labelledby="schedule-heading">
        <header className={styles.heading}><span>THREE DAYS IN ACTION</span><h3 id="schedule-heading">三天，把想法帶進議場。</h3></header>
        <div className={styles.days}>
          {days.map((day) => <article key={day.number} className={styles.day}><header><span>DAY {day.number}</span><time dateTime={day.date}>{day.label}</time></header><h4>{day.title}</h4><p>{day.summary}</p></article>)}
        </div>
        <p className={styles.note}>完整流程以錄取通知為準。</p>
      </section>
    </div>
  );
}
