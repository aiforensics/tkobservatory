import React, { useState, useEffect } from "react";
import styles from "../styles/sidebar.module.scss";
import SidebarListModule from "./SidebarListModule";
import {
  GlobalData,
  GlobalDataParsed,
  TopByCountryData,
  TopByCountryDataParsed,
  searchResults,
  SearchDataParsed,
  clickedCountryType,
} from "../types/global";
import { INITIAL_LOCATION, CLICKED_LOCATION } from "./../constants";

interface SidebarProps {
  selectedCountry: clickedCountryType;
  dates: Date[];
  globalData: GlobalData[];
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
  selectedCountry,
  dates,
  globalData,
  isLoadingData,
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

  const globalView = !selectedCountry.name;

  useEffect(() => {
    if (globalView) {
      setParsedData(globalData as GlobalDataParsed[]);
    } else {
      const parsedTopByCountryData: TopByCountryData[] =
        topByCountryData &&
        topByCountryData.filter((data) => {
          return data.countryCode === selectedCountry.id;
        });
      setParsedData(parsedTopByCountryData as TopByCountryDataParsed[]);
    }

    if (searchResults.searchKey) {
      setParsedData(searchResults.data as SearchDataParsed[]);
    }
  }, [
    searchResults,
    globalData,
    topByCountryData,
    globalView,
    selectedCountry,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>
          {searchResults.searchKey
            ? `SEARCH RESULTS for:${decodeURIComponent(
                searchResults.searchKey
              )}`
            : globalView
            ? INITIAL_LOCATION
            : CLICKED_LOCATION + selectedCountry.name}
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
                  ? `${process.env.REACT_APP_SEARCH_API}/search?search=${searchResults.searchKey}&n=4000`
                  : `${process.env.REACT_APP_SEARCH_API}/match?key=${searchResults.selected}&value=${searchResults.searchKey}`
                : globalView
                ? `${
                    process.env.REACT_APP_GLOBAL_RECOMMENDATIONS_API
                  }?start=${dates[0].toISOString()}&end=${dates[1].toISOString()}`
                : `https://ttgo.trex.zone/foryourecommendations/country/${
                    selectedCountry.id
                  }?start=${dates[0].toISOString()}&end=${dates[1].toISOString()}`
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
          <span className={styles.loader}>
            Retrieving data, one moment please...
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(SideBar);
