import styles from "../styles/sidebar.module.css";

interface CountryInfo {
  name: string;
  dates: Date[];
}

const SideBar: React.FC<CountryInfo> = ({
  name,
  dates,
}: CountryInfo): JSX.Element => {
  const formatDates = dates.map((dates) => {
    return dates.toLocaleDateString();
  });

  console.log("formatDates", formatDates);

  return (
    <div className={styles.container}>
      <h2>{name}</h2>
      <h3>
        {formatDates[0]} - {formatDates[1]}
      </h3>
    </div>
  );
};

export default SideBar;
