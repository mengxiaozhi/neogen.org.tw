import styles from "./schedule.module.css";

const times = ["09:00", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:00", "17:30"] as const;

type Session = {
  start: number;
  end: number;
  title: string;
  note?: string;
  shared?: boolean;
};

const checkIn: Session = { start: 0, end: 1, title: "報到", shared: true };
const lunch: Session = { start: 4, end: 5, title: "午餐、午休", shared: true };

const days: { date: string; label: string; weekday: string; sessions: Session[] }[] = [
  {
    date: "2027-01-25", label: "第一天", weekday: "01.25（一）",
    sessions: [
      checkIn,
      { start: 1, end: 2, title: "開幕式" },
      { start: 2, end: 3, title: "立院導覽參訪" },
      { start: 3, end: 4, title: "議事規則教學" },
      lunch,
      { start: 5, end: 7, title: "黨團會議", note: "依報名表填寫的政黨傾向分配" },
      { start: 7, end: 8, title: "青年議題座談" },
      { start: 8, end: 9, title: "院會—國是論壇" },
      { start: 9, end: 10, title: "院會—一讀會" },
    ],
  },
  {
    date: "2027-01-26", label: "第二天", weekday: "01.26（二）",
    sessions: [
      checkIn,
      { start: 1, end: 4, title: "委員會審查／逐條審查" },
      lunch,
      { start: 5, end: 10, title: "委員會審查／逐條審查／官員詢答" },
    ],
  },
  {
    date: "2027-01-27", label: "第三天", weekday: "01.27（三）",
    sessions: [
      checkIn,
      { start: 1, end: 4, title: "委員會審查／官員詢答／院會質詢" },
      lunch,
      { start: 5, end: 7, title: "院會—二讀會" },
      { start: 7, end: 8, title: "院會—三讀會" },
      { start: 8, end: 9, title: "院會—三讀後發言" },
      { start: 9, end: 10, title: "閉幕式" },
    ],
  },
];

function SessionContent({ session }: { session: Session }) {
  return (
    <>
      <span className={styles.sessionTitle}>{session.title}</span>
      {session.note && <span className={styles.sessionNote}>{session.note}</span>}
    </>
  );
}

export function EventSchedule() {
  return (
    <div className={styles.schedule}>
      <p className={styles.notice} id="schedule-note">實際流程仍將依會議室借用情形進行微調，請以錄取通知及後續公告為準。</p>
      <div className={styles.desktop}>
        <table className={styles.table} aria-describedby="schedule-note">
          <caption className={styles.caption}>2027 青年參議院｜1 月 25 日至 27 日活動時程表</caption>
          <thead>
            <tr>
              <th scope="col" className={styles.timeHeading}>時間</th>
              {days.map((day, index) => (
                <th key={day.date} scope="col" className={index === 1 ? styles.greenHeading : styles.orangeHeading}>
                  <span className={styles.dayLabel}>{day.label}</span>
                  <time dateTime={day.date}>2027.{day.weekday}</time>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.slice(0, -1).map((start, row) => {
              const sharedSession = days[0].sessions.find((session) => session.start === row && session.shared);
              return (
                <tr key={start}>
                  <th scope="row" className={styles.timeCell}>{start}–{times[row + 1]}</th>
                  {sharedSession ? (
                    <td colSpan={3} className={styles.sharedCell}><SessionContent session={sharedSession} /></td>
                  ) : days.map((day, index) => {
                    const session = day.sessions.find((item) => item.start === row);
                    return session ? (
                      <td key={day.date} rowSpan={session.end - session.start} className={index === 1 ? styles.greenCell : styles.creamCell}>
                        <SessionContent session={session} />
                      </td>
                    ) : null;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.mobile}>
        {days.map((day, index) => (
          <article key={day.date} className={styles.dayCard} aria-labelledby={`schedule-day-${index + 1}`}>
            <header className={index === 1 ? styles.greenHeading : styles.orangeHeading}>
              <h3 id={`schedule-day-${index + 1}`}>{day.label}</h3>
              <time dateTime={day.date}>2027.{day.weekday}</time>
            </header>
            <ol className={styles.sessions}>
              {day.sessions.map((session) => (
                <li key={session.start} className={session.shared ? styles.sharedSession : undefined}>
                  <span className={styles.sessionTime}>
                    <time dateTime={`${day.date}T${times[session.start]}:00+08:00`}>{times[session.start]}</time>
                    <span aria-hidden="true">—</span>
                    <time dateTime={`${day.date}T${times[session.end]}:00+08:00`}>{times[session.end]}</time>
                  </span>
                  <div><SessionContent session={session} /></div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}
