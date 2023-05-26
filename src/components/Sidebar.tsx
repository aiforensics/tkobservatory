import styles from "../styles/sidebar.module.css";
import SidebarListModule from "./SidebarListModule";
import { GlobalData } from "../types/global";

interface CountryInfo {
  name: string;
  dates: Date[];
  globalData: GlobalData[];
  handleClickSidebarItem: (e: React.MouseEvent, countries: string[]) => void;
}

const SideBar: React.FC<CountryInfo> = ({
  name,
  dates,
  globalData,
  handleClickSidebarItem,
}: CountryInfo): JSX.Element => {
  const formatDates =
    dates &&
    dates.map((dates) => {
      return dates.toLocaleDateString();
    });
  return (
    <div className={styles.container}>
      <h2>{name}</h2>
      {dates && (
        <h3>
          {formatDates[0]} - {formatDates[1]}
        </h3>
      )}
      <SidebarListModule
        globalData={globalData}
        handleClickSidebarItem={handleClickSidebarItem}
      />
    </div>
  );
};

export default SideBar;
