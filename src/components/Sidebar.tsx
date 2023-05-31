import styles from "../styles/sidebar.module.css";
import SidebarListModule from "./SidebarListModule";
import { GlobalData, CountryCodes } from "../types/global";

interface CountryInfo {
  name: String;
  dates: Date[];
  globalData: GlobalData[];
  globalCountryCodes: CountryCodes[];
  isLoadingData: Boolean;
  cleanSelection: Boolean;
  handleClickSidebarItem: (
    e: React.MouseEvent,
    dataClicked: GlobalData
  ) => void;
}

const SideBar: React.FC<CountryInfo> = ({
  name,
  dates,
  globalData,
  isLoadingData,
  globalCountryCodes,
  cleanSelection,
  handleClickSidebarItem,
}: CountryInfo): JSX.Element => {
  const formatDates =
    dates &&
    dates.map((dates) => {
      return dates.toLocaleDateString();
    });

  const parsedData: GlobalData[] =
    globalData &&
    globalData.map((data) => {
      const arrayCountriesParsed = data.countries.map((country, i) => {
        const index = globalCountryCodes.findIndex((x) => x.three === country);
        return globalCountryCodes[index].name;
      });
      return { ...data, countryNames: arrayCountriesParsed };
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
          parsedData={parsedData}
          handleClickSidebarItem={handleClickSidebarItem}
          cleanSelection={cleanSelection}
        />
      ) : (
        "Retrieving data..."
      )}
    </div>
  );
};

export default SideBar;
