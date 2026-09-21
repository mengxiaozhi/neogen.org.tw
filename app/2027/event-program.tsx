import styles from "./program.module.css";
import { LocationMap } from "./location-map";

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
  {
    number: "01", committee: "內政委員會",
    bill: "《臺灣地區與大陸地區人民關係條例》",
    question: "陸籍配偶取得身分證年限，是否應縮短？",
    background: [
      "以陸籍配偶在臺居留、定居及取得國民身分證的制度為起點，認識陸籍配偶與外籍配偶在法律規範上的差異。",
      "從婚姻移民權益、家庭團聚、平等原則與人口政策，延伸至國家安全及兩岸關係，討論縮短取得身分證年限的政策理由、疑慮與可能影響。",
    ],
  },
  {
    number: "02", committee: "社會福利及衛生環境委員會",
    bill: "《長期照顧保險法》",
    question: "長照財源應維持稅收制，還是轉型為全民共同負擔的社會保險？",
    background: [
      "面對高齡化、少子化與家庭照顧人力不足，從我國現行長照服務及主要財源架構出發，比較稅收制與社會保險制在財源穩定性、政府責任、世代負擔及使用者權益上的差異。",
      "探討由政府與民眾共同分擔長照風險，是否能建立更穩定、公平的制度，以及對青年、勞工與企業可能增加的經濟負擔，並嘗試提出政策方案及法案草案。",
    ],
  },
  {
    number: "03", committee: "司法及法制委員會",
    bill: "《中華民國刑法》第三十三條",
    question: "我國主刑制度，是否應納入身體刑（鞭刑）？",
    background: [
      "以現行刑法主刑中的死刑、無期徒刑、有期徒刑、拘役及罰金為起點，討論是否增列身體刑。從暴力犯罪、詐欺等社會矚目案件切入，釐清刑罰的應報、嚇阻、隔離與矯正目的，並比較支持與反對身體刑的主要論據。",
      "從犯罪被害人權益、社會安全、犯罪預防及再犯效果，討論刑罰比例原則、受刑人的人性尊嚴與身體權保障，並研讀相關憲法解釋與判決，探究刑罰執行方式與禁止酷刑的界線。",
      "進一步思考「國家為處罰犯罪，可以對犯罪人的身體施加到什麼程度？」並嘗試提出刑法第三十三條修正草案與相關配套制度。",
    ],
  },
] as const;

const days = [
  {
    number: "01", date: "2027-01-25", label: "01.25（一）", title: "走進議場，理解規則",
    summary: "導覽議場、認識規則、組成黨團。",
  },
  {
    number: "02", date: "2027-01-26", label: "01.26（二）", title: "審查法案，展開協商",
    summary: "各委員會分流討論、逐條審查及模擬官員詢答。",
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
        <header className={styles.heading}><span>PLAN YOUR VISIT</span><h2 id="practical-heading">報名時程與費用</h2></header>
        <dl className={styles.timeline}>
          <div><dt>報名開始</dt><dd><time dateTime="2026-09-23">2026.09.23</time></dd></div>
          <div><dt>報名截止</dt><dd><time dateTime="2026-12-15">2026.12.15</time></dd></div>
          <div><dt>錄取名單公布</dt><dd><time dateTime="2026-12-25">2026.12.25</time></dd></div>
        </dl>
        <p className={styles.applicationNote}>採先報名先書審，名額有限；如額滿，將提前截止報名。</p>
        <div className={styles.fees}>
          <article className={styles.fee}><p>不含住宿</p><h3><span>NT$</span> 2,000</h3><p>含兩天早餐、午餐及保險。</p></article>
          <article className={`${styles.fee} ${styles.stay}`}><p>含住宿</p><h3><span>NT$</span> 4,000</h3><p>含兩天住宿、早餐、午餐及保險。</p></article>
        </div>
        <div className={styles.accommodation}>
          <h3>住宿安排</h3>
          <p><strong>美亞商旅－台北車站</strong><br />臺北市中正區忠孝西路一段50號</p>
          <p>住宿僅提供代訂，不負管理責任。房型原則上為四人一間，以同委員會優先分配。</p>
          <LocationMap name="美亞商旅" address="臺北市中正區忠孝西路一段50號" embedUrl="https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1z576O5Lqe5ZWG5peFIOiHuuWMl-W4guS4reato-WNgOW_oOWtneilv-i3r-S4gOautTUw6Jmf!6i16!3m1!1szh-TW!5m1!1szh-TW" />
        </div>
        <p className={styles.note}>錄取及繳費方式以電子郵件通知。</p>
      </section>

      <section id="event-roles" tabIndex={-1} className={styles.block} aria-labelledby="roles-heading">
        <header className={styles.heading}><span>TAKE YOUR ROLE</span><h2 id="roles-heading">換一個角色，看見公共決策。</h2></header>
        <div className={styles.roles}>
          {roles.map((role) => <article key={role.number} className={styles.role}><div className={styles.roleLabel}><span>{role.number}</span><span>{role.english}</span></div><h3>{role.title}</h3><p>{role.description}</p></article>)}
        </div>
      </section>

      <section id="event-committees" tabIndex={-1} className={styles.block} aria-labelledby="committees-heading">
        <header className={styles.heading}><span>INSIDE THE COMMITTEES</span><h2 id="committees-heading">三個委員會，三組討論議題。</h2></header>
        <div className={styles.committeeIntro}>
          <h3>各委員會分流議題、委員會逐條審查及官員詢答</h3>
          <p>本次會議參照立法院委員會運作與時事議題，設置內政、社會福利及衛生環境、司法及法制三個模擬委員會，由籌備團隊學術部分別引導學員討論。</p>
          <p>學術部自活動前半年開始準備各委員會的議題背景文書，活動中結合議事規則教學與議事攻防，透過分流討論、逐條審查及模擬官員詢答，讓學員體會國會議員制定法律、修法時的思考與抉擇。</p>
        </div>
        <div className={styles.topics}>
          {topics.map((topic) => (
            <article key={topic.number} className={styles.topic} aria-labelledby={`committee-${topic.number}`}>
              <header className={styles.topicIdentity}>
                <span>{topic.number} / 模擬委員會</span>
                <h3 id={`committee-${topic.number}`}>{topic.committee}</h3>
                <p className={styles.bill}>模擬審議議題<strong>{topic.bill}</strong></p>
              </header>
              <div className={styles.topicBackground}>
                <h4>{topic.question}</h4>
                {topic.background.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          ))}
        </div>
        <p className={styles.note}>議題資料與講師名單以錄取通知及後續公告為準。</p>
      </section>

      <section id="event-schedule" tabIndex={-1} className={styles.block} aria-labelledby="schedule-heading">
        <header className={styles.heading}><span>THREE DAYS IN ACTION</span><h2 id="schedule-heading">三天，把想法帶進議場。</h2></header>
        <div className={styles.days}>
          {days.map((day) => <article key={day.number} className={styles.day}><header><span>DAY {day.number}</span><time dateTime={day.date}>{day.label}</time></header><h3>{day.title}</h3><p>{day.summary}</p></article>)}
        </div>
        <p className={styles.note}>完整流程以錄取通知為準。</p>
      </section>
    </div>
  );
}
