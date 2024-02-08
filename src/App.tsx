import { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import MapReact from "./components/MapReact";
import { Tooltip } from "react-tooltip";
import SideBar from "./components/Sidebar";
import "react-tooltip/dist/react-tooltip.css";
import ResetButton from "./components/ResetButton";
import { DateRange } from "./components/DateRange";
import { TApiResponse } from "./hooks/useApiHook";
import VideoPlayer from "./components/VideoPlayer";
import Search from "./components/Search";
import {
  GlobalDataParsed,
  searchResults,
  clickedCountryType,
} from "./types/global";
import { INITIAL_LOCATION, INITIAL_DATES } from "./constants";
import {
  useAPIGetTopByCountry,
  useAPIGetGlobalRecommendations,
} from "./apiService";

function App() {
  const [dates, setDates] = useState<Date[]>(INITIAL_DATES);

  // API calls
  let topByCountryResults: TApiResponse = useAPIGetTopByCountry(dates);
  let globalResults: TApiResponse = useAPIGetGlobalRecommendations(dates);

  const noCountrySelected = useMemo(() => {
    return { name: undefined, available: true, id: undefined };
  }, []);

  const InitialSearchResults = {
    searchKey: "",
    data: [],
    selected: "",
  };

  const [content, setContent] = useState("");
  const [selectedCountry, setSelectedCountry] =
    useState<clickedCountryType>(noCountrySelected);
  const [dataClicked, setDataClicked] = useState<GlobalDataParsed>(
    {} as GlobalDataParsed
  );

  const [loading, setLoading] = useState<Boolean>(false);

  const [searchResults, setSearchResults] =
    useState<searchResults>(InitialSearchResults);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    setLoading(globalResults.loading);
  }, [globalResults.loading]);

  const cleanSearchResults = useCallback(() => {
    setSearchResults({ searchKey: "", data: [], selected: "" });
    setDataClicked({} as GlobalDataParsed);
  }, []);

  // Clears country + Sidebar when: RESET MAP/NEW COUNTRY/SEARCH is clicked
  const clearCountryInfo = useCallback(() => {
    cleanSearchResults();
    setSelectedCountry(noCountrySelected);
  }, [noCountrySelected, cleanSearchResults]);

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

  useEffect(() => {
    if (!searchResults.searchKey && selectedCountry.name !== INITIAL_LOCATION) {
      cleanSearchResults();
    }
  }, [selectedCountry, searchResults.searchKey, cleanSearchResults]);

  const handleCountryClick = (clickedCountry: clickedCountryType) => {
    setSelectedCountry(clickedCountry);
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
              <DateRange setDates={setDates} dates={dates} />
            )}
          </div>
          <MapReact
            setTooltipContent={setContent}
            onClickedCountry={handleCountryClick}
            countryInfo={selectedCountry}
            countriesClickedGlobal={dataClicked.countries}
            clearCountriesGlobal={clearCountryInfo}
            isSearching={!!searchResults.searchKey}
          />

          <Tooltip anchorSelect="#my-anchor-element" content={content} />
          {dataClicked.authorName && <VideoPlayer videoData={dataClicked} />}
          {(userInteracted || selectedCountry.name !== INITIAL_LOCATION) &&
            !searchResults.searchKey && (
              <ResetButton unclickCountries={clearCountryInfo} />
            )}
        </div>
        <SideBar
          selectedCountry={selectedCountry}
          dates={dates}
          globalData={globalResults.data}
          isLoadingData={loading}
          handleClickSidebarItem={useCallback(
            (e, dataClicked) => handleClickSidebarItem(e, dataClicked),
            []
          )}
          cleanSelection={!userInteracted}
          topByCountryData={topByCountryResults.data}
          searchResults={searchResults}
          searchFocused={searchFocused}
        />
      </main>
    </div>
  );
}

export default App;
