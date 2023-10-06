import React, { useState, useEffect } from "react";
import styles from "../styles/sidebar.module.css";
import SidebarListModule from "./SidebarListModule";
import {
  GlobalData,
  CountryCodes,
  GlobalDataParsed,
  TopByCountryData,
  TopByCountryDataParsed,
  searchResults,
  SearchDataParsed,
} from "../types/global";
import {
  INITIAL_LOCATION,
  CLICKED_LOCATION,
  GLOBAL_RECOMMENDATIONS_API,
  SEARCH_API,
} from "./../constants";

interface SidebarProps {
  name: String;
  dates: Date[];
  globalData: GlobalData[];
  globalCountryCodes: CountryCodes[];
  isLoadingData: Boolean;
  cleanSelection: Boolean;
  topByCountryData: TopByCountryData[];
  searchResults: searchResults;
  handleClickSidebarItem: (
    e: React.MouseEvent,
    dataClicked: GlobalDataParsed
  ) => void;
  searchFocused: Boolean;
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
  searchResults,
}: SidebarProps): JSX.Element => {
  const [parsedData, setParsedData] = useState<
    GlobalDataParsed[] | TopByCountryDataParsed[] | SearchDataParsed[]
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

    if (searchResults.searchKey) {
      setParsedData(searchResults.data as SearchDataParsed[]);
    }
  }, [
    name,
    topByCountryData,
    globalCountryCodes,
    globalData,
    globalView,
    searchResults,
  ]);

  /* this variables might be allocated with the clicked
   * country, and we need it to build the right CSV */
  let threeLetter: String = "";
  if (name !== INITIAL_LOCATION) {
    /* I don't like to repeat this pattern, it should be a variable that moves along
     * otherwise we need to keep to repeat the filtering */
    threeLetter = globalCountryCodes.filter((x) => x.name === name)[0].three;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>
          {searchResults.searchKey
            ? `SEARCH RESULTS for: ${searchResults.searchKey}`
            : globalView
            ? name
            : CLICKED_LOCATION + name}
        </h2>

        {dates && !searchResults.searchKey && (
          <h3>
            {formatDates[0]} - {formatDates[1]}
          </h3>
        )}
        {!isLoadingData && parsedData?.length ? (
          <a
            href={`${
              searchResults.searchKey
                ? searchResults.selected === "description"
                  ? `${SEARCH_API}/search?search=${searchResults.searchKey}&n=4000`
                  : `${SEARCH_API}/match?key=${searchResults.selected}&value=${searchResults.searchKey}`
                : globalView
                ? `${GLOBAL_RECOMMENDATIONS_API}?start=${dates[0].toISOString()}&end=${dates[1].toISOString()}`
                : `https://ttgo.trex.zone/foryourecommendations/country/${threeLetter}?start=${dates[0].toISOString()}&end=${dates[1].toISOString()}`
            }&format=csv`}
            download="filename.csv"
            className={`${styles.downloadLink} ${
              searchResults.searchKey
                ? styles.downloadSearch
                : globalView
                ? styles.downloadGlobal
                : styles.donwloadCountry
            }`}
          >
            Download CSV
          </a>
        ) : undefined}
      </div>
      <div className={styles.bottom}>
        {!isLoadingData ? (
          <SidebarListModule
            parsedData={parsedData}
            handleClickSidebarItem={handleClickSidebarItem}
            cleanSelection={cleanSelection}
            isSearching={!!searchResults.searchKey}
          />
        ) : (
          "Retrieving data, one moment please..."
        )}
      </div>
    </div>
  );
};

export default React.memo(SideBar);
