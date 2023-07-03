import styles from "../styles/header.module.css";

export interface HeaderProps {}

export default function App(props: HeaderProps) {
  return (
    <header className={styles.appHeader}>
      <h2>TikTok Global Observatory</h2>
      <a href="https://ttgo.trex.zone/docs" target="_blank" rel="noreferrer">
        README
      </a>
    </header>
  );
}
