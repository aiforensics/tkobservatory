import { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import MapReact from "./components/MapReact";
import { Tooltip } from "react-tooltip";
import SideBar from "./components/Sidebar";
import "react-tooltip/dist/react-tooltip.css";
import ResetButton from "./components/ResetButton";
import { DateRange } from "./components/DateRange";
import { useApiGet, TApiResponse } from "./hooks/useApiHook";
import VideoPlayer from "./components/VideoPlayer";
import Search from "./components/Search";
import { GlobalDataParsed, searchResults } from "./types/global";
import {
  INITIAL_LOCATION,
  VIDEOS_REQUESTED,
  GLOBAL_RECOMMENDATIONS_API,
  TOP_COUNRTY_API,
} from "./constants";

function App() {
  const initialStateCountry = useMemo(() => {
    return { name: INITIAL_LOCATION, available: true };
  }, []);

  const now = new Date();
  const defaultBegin = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 14
  );
  const todayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );

  const InitialApiResponse = {
    status: 0,
    statusText: "String",
    data: [],
    error: [],
    loading: true,
    execute: () => {},
  };

  const InitialSearchResults = {
    searchKey: "",
    data: [],
    selected: "",
  };

  const [content, setContent] = useState("");
  const [countryInfo, setCountryInfo] = useState(initialStateCountry);
  const [dates, setDates] = useState([defaultBegin, todayEnd]);
  const [dataClicked, setDataClicked] = useState<GlobalDataParsed>(
    {} as GlobalDataParsed
  );
  const [loading, setLoading] = useState<Boolean>(false);
  let globalResponse: TApiResponse = InitialApiResponse;
  let topByCountry: TApiResponse = InitialApiResponse;
  const [searchResults, setSearchResults] =
    useState<searchResults>(InitialSearchResults);
  const [searchFocused, setSearchFocused] = useState(false);

  globalResponse = useApiGet(
    `${GLOBAL_RECOMMENDATIONS_API}?start=${dates[0].toISOString()}&end=${dates[1].toISOString()}&n=${VIDEOS_REQUESTED}`,
    dates
  );
  topByCountry = useApiGet(
    `${TOP_COUNRTY_API}?start=${dates[0].toISOString()}&end=${dates[1].toISOString()}&n=${VIDEOS_REQUESTED}`,
    dates
  );

  const globalCountryCodes = useApiGet("https://ttgo.trex.zone/api/world");

  useEffect(() => {
    setLoading(globalResponse.loading);
  }, [globalResponse.loading]);

  const clearCountryInfo = useCallback(() => {
    setCountryInfo(initialStateCountry);
    setDataClicked({} as GlobalDataParsed);
  }, [initialStateCountry]);

  useEffect(() => {
    if (searchFocused) {
      clearCountryInfo();
    }
  }, [searchFocused, clearCountryInfo]);

  const handleClickSidebarItem = (
    e: React.MouseEvent,
    dataClicked: GlobalDataParsed
  ) => {
    setDataClicked(dataClicked);
  };

  const cleanSearchResults = useCallback(() => {
    setSearchResults({ searchKey: "", data: [], selected: "" });
    setDataClicked({} as GlobalDataParsed);
  }, []);

  useEffect(() => {
    if (searchResults.searchKey && countryInfo.name !== INITIAL_LOCATION) {
      cleanSearchResults();
    }
  }, [countryInfo, searchResults.searchKey, cleanSearchResults]);

  const handleCountryClick = (info: any) => {
    setCountryInfo(info);
  };

  const userInteracted = Object.keys(dataClicked).length > 0;

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.maincontainer}>
        <div
          className={styles.mapcontainer}
          id="my-anchor-element"
          data-tooltip-float={true}
        >
          <div className={styles.datesearchContainer}>
            <Search
              handleSearchResults={useCallback(
                (fromSearch) => setSearchResults(fromSearch),
                []
              )}
              handleInputFocus={useCallback(
                (focus) => setSearchFocused(focus),
                []
              )}
              imputFocused={searchFocused}
              handleCleanSearch={useCallback(
                () => cleanSearchResults(),
                [cleanSearchResults]
              )}
              isSearchKey={!!searchResults.searchKey}
            />
            {!searchFocused && !searchResults.searchKey && (
              <DateRange
                todayEnd={todayEnd}
                setDates={setDates}
                dates={dates}
              />
            )}
          </div>
          <MapReact
            setTooltipContent={setContent}
            onClickedCountry={handleCountryClick}
            countryInfo={countryInfo}
            countriesClickedGlobal={dataClicked.countries}
            clearCountriesGlobal={clearCountryInfo}
            isSearching={!!searchResults.searchKey}
          />

          <Tooltip anchorSelect="#my-anchor-element" content={content} />
          {dataClicked.authorId && <VideoPlayer videoData={dataClicked} />}
          {(userInteracted || countryInfo.name !== INITIAL_LOCATION) &&
            !searchResults.searchKey && (
              <ResetButton unclickCountries={clearCountryInfo} />
            )}
        </div>
        <SideBar
          {...countryInfo}
          dates={dates}
          globalData={globalResponse.data}
          isLoadingData={loading}
          handleClickSidebarItem={useCallback(
            (e, dataClicked) => handleClickSidebarItem(e, dataClicked),
            []
          )}
          globalCountryCodes={globalCountryCodes.data}
          cleanSelection={!userInteracted}
          topByCountryData={topByCountry.data}
          searchResults={searchResults}
          searchFocused={searchFocused}
        />
      </main>
    </div>
  );
}

export default App;
