import { useState, useEffect, useRef } from "react";
import styles from "../styles/sidebar.module.css";
import SidebarListModule from "./SidebarListModule";
import {
  GlobalData,
  CountryCodes,
  GlobalDataParsed,
  TopByCountryData,
  TopByCountryDataParsed,
} from "../types/global";
import {
  INITIAL_LOCATION,
  CLICKED_LOCATION,
  VIDEOS_REQUESTED,
  TOP_COUNRTY_API,
  GLOBAL_RECOMMENDATIONS_API,
} from "./../constants";

interface SidebarProps {
  name: String;
  dates: Date[];
  globalData: GlobalData[];
  globalCountryCodes: CountryCodes[];
  isLoadingData: Boolean;
  cleanSelection: Boolean;
  topByCountryData: TopByCountryData[];
  handleClickSidebarItem: (
    e: React.MouseEvent,
    dataClicked: GlobalDataParsed
  ) => void;
}

const SideBar: React.FC<SidebarProps> = ({
  name,
  dates,
  globalData,
  isLoadingData,
  globalCountryCodes,
  cleanSelection,
  topByCountryData,
  handleClickSidebarItem,
}: SidebarProps): JSX.Element => {
  const divRef = useRef<HTMLDivElement>(null);
  const [parsedData, setParsedData] = useState<
    GlobalDataParsed[] | TopByCountryDataParsed[]
  >([]);
  const formatDates =
    dates &&
    dates.map((dates) => {
      return dates.toLocaleDateString();
    });

  const globalView = name === INITIAL_LOCATION;
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

    if (globalView) {
      setParsedData(parsedGlobalData);
    }

    if (name !== INITIAL_LOCATION) {
      let index = globalCountryCodes.findIndex((x) => x.name === name);
      let threeLetter = globalCountryCodes[index].three;
      const parsedTopByCountryData: TopByCountryData[] =
        topByCountryData &&
        topByCountryData.filter((data) => {
          return data.countryCode === threeLetter;
        });
      setParsedData(parsedTopByCountryData as TopByCountryDataParsed[]);
    }
  }, [name, topByCountryData, globalCountryCodes, globalData, globalView]);

  /* this variables might be allocated with the clicked 
   * country, and we need it to build the right CSV */
  let threeLetter: String = "";
  if (name !== INITIAL_LOCATION) {
    /* I don't like to repeat this pattern, it should be a variable that moves along
     * otherwise we need to keep to repeat the filtering */
    threeLetter = 
      globalCountryCodes.filter((x) => x.name === name)[0].three;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>{globalView ? name : CLICKED_LOCATION + name}</h2>
        {dates && (
          <h3>
            {formatDates[0]} - {formatDates[1]}
          </h3>
        )}
        {!isLoadingData && (
          <a
            href={`${
              globalView ? GLOBAL_RECOMMENDATIONS_API :
              `https://ttgo.trex.zone/foryourecommendations/country/${threeLetter}`
            }?start=${dates[0].toISOString()}&end=${dates[1].toISOString()}&format=csv`}
            download="filename.csv"
            className={styles.downloadLink}
          >
            Download CSV
          </a>
        )}
      </div>
      <div className={styles.bottom}>
        {!isLoadingData ? (
          <SidebarListModule
            parsedData={parsedData}
            handleClickSidebarItem={handleClickSidebarItem}
            cleanSelection={cleanSelection}
          />
        ) : (
          "Retrieving data, one moment please..."
        )}
      </div>
    </div>
  );
};

export default SideBar;
