import styles from "../styles/sidebar.module.css";
import SidebarListModule from "./SidebarListModule";
import { GlobalData } from "../types/global";

interface CountryInfo {
  name: string;
  dates: Date[];
  globalData: GlobalData[];
  isLoadingData: Boolean;
  handleClickSidebarItem: (e: React.MouseEvent, countries: string[]) => void;
}

const SideBar: React.FC<CountryInfo> = ({
  name,
  dates,
  globalData,
  isLoadingData,
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
      {!isLoadingData ? (
        <SidebarListModule
          globalData={globalData}
          handleClickSidebarItem={handleClickSidebarItem}
        />
      ) : (
        "Retrieving data..."
      )}
    </div>
  );
};

export default SideBar;
