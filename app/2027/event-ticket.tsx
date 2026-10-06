import styles from "./event-ticket.module.css";

export function EventTicket() {
  return (
    <div className={styles.ticket} aria-label="2027 青年參議院，1 月 25 日至 27 日">
      <strong>01.25 — 01.27</strong>
      <span>2027 青年參議院</span>
    </div>
  );
}
