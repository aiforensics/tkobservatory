import styles from "../styles/header.module.css";
import aiflogo from ".././assets/aif-logo.svg";

export interface HeaderProps {}

export default function App(props: HeaderProps) {
  return (
    <header className={styles.appHeader}>
      <a
        className={styles.imageLink}
        href="https://aiforensics.org"
        target="_blank"
        rel="noreferrer"
      >
        <img src={aiflogo} className={styles.aiflogo} alt="aif-logo" />
      </a>
      <h2>TikTok Global Observatory</h2>
      <a
        className={styles.readmeLink}
        href="https://ttgo.trex.zone/docs"
        target="_blank"
        rel="noreferrer"
      >
        README
      </a>
    </header>
  );
}
