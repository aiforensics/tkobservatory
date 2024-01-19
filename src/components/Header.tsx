import styles from "../styles/header.module.css";
import aiflogo from ".././assets/aif_new_logo_complete.svg";
import { Link } from "../components/Link/Link";

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

      <Link
        anchor="ABOUT THE TOOL"
        size={"md"}
        disabled={false}
        href="https://tkgo.aiforensics.org/docs/"
        isDark={true}
      />
    </header>
  );
}
