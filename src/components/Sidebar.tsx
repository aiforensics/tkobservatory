import { useState, useEffect, useRef } from "react";
import styles from "../styles/sidebar.module.css";
import SidebarListModule from "./SidebarListModule";
import {
  GlobalData,
  CountryCodes,
  GlobalDataParsed,
  TopByCountryData,
  DataItem,
} from "../types/global";
import { INITIAL_LOCATION } from "./../constants";

interface CountryInfo {
  name: String;
  dates: Date[];
  globalData: GlobalData[];
  globalCountryCodes: CountryCodes[];
  isLoadingData: Boolean;
  cleanSelection: Boolean;
  topByCountryData: TopByCountryData[];
  handleClickSidebarItem: (e: React.MouseEvent, dataClicked: DataItem) => void;
}

const SideBar: React.FC<CountryInfo> = ({
  name,
  dates,
  globalData,
  isLoadingData,
  globalCountryCodes,
  cleanSelection,
  topByCountryData,
  handleClickSidebarItem,
}: CountryInfo): JSX.Element => {
  const InitialDataClickedObject = {
    authorId: "",
    authorName: "",
    countries: [],
    countryNames: [],
    createTime: "",
    description: "",
    musicAuthor: "",
    musicId: "",
    musicTitle: "",
    occurrencies: 0,
    videoId: "",
  };

  const divRef = useRef<HTMLDivElement>(null);
  const [parsedData, setParsedData] = useState<
    GlobalDataParsed[] | TopByCountryData[]
  >([InitialDataClickedObject]);
  const formatDates =
    dates &&
    dates.map((dates) => {
      return dates.toLocaleDateString();
    });

  useEffect(() => {
    const parsedGlobalData: GlobalDataParsed[] =
      globalData &&
      globalData.map((data) => {
        const arrayCountriesParsed =
          data &&
          data.countries.map((country) => {
            const index =
              globalCountryCodes &&
              globalCountryCodes.findIndex((x) => x.three === country);
            return globalCountryCodes && globalCountryCodes[index].name;
          });
        return { ...data, countryNames: arrayCountriesParsed };
      });
    if (name === INITIAL_LOCATION) {
      setParsedData(parsedGlobalData);
    }
    if (name !== INITIAL_LOCATION) {
      const index = globalCountryCodes.findIndex((x) => x.name === name);
      const threeLetter = globalCountryCodes[index].three;
      const parsedTopByCountryData = topByCountryData.filter((data) => {
        return data.countryCode === threeLetter;
      });
      setParsedData(parsedTopByCountryData);
    }
  }, [name, topByCountryData, globalCountryCodes, globalData]);

  return (
    <div className={styles.container} ref={divRef}>
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
          parentDiv={divRef.current}
        />
      ) : (
        "Retrieving data..."
      )}
    </div>
  );
};

export default SideBar;
