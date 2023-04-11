import styles from "../styles/sidebar.module.css";

interface CountryInfo {
  name: string;
}

const SideBar: React.FC<CountryInfo> = ({ name }: CountryInfo): JSX.Element => {
  return (
    <div className={styles.container}>
      <h2>{name}</h2>
    </div>
  );
};

export default SideBar;
