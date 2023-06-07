import { useState, useEffect } from "react";
import styles from "./App.module.css";
import MapReact from "./components/MapReact";
import { Tooltip } from "react-tooltip";
import SideBar from "./components/Sidebar";
import "react-tooltip/dist/react-tooltip.css";
import ResetButton from "./components/ResetButton";
import { DateRange } from "./components/DateRange";
import { useApiGet, TApiResponse } from "./hooks/useApiHook";
import VideoPlayer from "./components/VideoPlayer";
import { DataItem } from "./types/global";
import { INITIAL_LOCATION } from "./constants";

function App() {
  const initialStateCountry = {
    name: INITIAL_LOCATION,
    available: true,
  };
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
  };

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

  const [content, setContent] = useState("");
  const [countryInfo, setCountryInfo] = useState(initialStateCountry);
  const [dates, setDates] = useState([defaultBegin, todayEnd]);
  const [dataClicked, setDataClicked] = useState<DataItem>(
    InitialDataClickedObject
  );
  const [loading, setLoading] = useState<Boolean>(false);
  const VIDEOS_REQUESTED = 30;
  let globalResponse: TApiResponse = InitialApiResponse;
  let topByCountry: TApiResponse = InitialApiResponse;

  globalResponse = useApiGet(
    `https://ttgo.trex.zone/foryourecommendations/global?start=${dates[0].toISOString()}&end=${dates[1].toISOString()}&n=${VIDEOS_REQUESTED}`,
    dates
  );
  topByCountry = useApiGet(
    `https://ttgo.trex.zone/foryourecommendations/topByCountry?start=${dates[0].toISOString()}&end=${dates[1].toISOString()}&n=${VIDEOS_REQUESTED}`,
    dates
  );

  const globalCountryCodes = useApiGet("https://ttgo.trex.zone/api/world");

  useEffect(() => {
    setLoading(globalResponse.loading);
  }, [globalResponse.loading]);

  const clearCountryInfo = () => {
    setCountryInfo(initialStateCountry);
    setDataClicked(InitialDataClickedObject);
  };

  const handleClickSidebarItem = (
    e: React.MouseEvent,
    dataClicked: DataItem
  ) => {
    setDataClicked(dataClicked);
  };

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h2>Welcome to TikTok Global Observatory</h2>
      </header>
      <main className={styles.maincontainer}>
        <div
          className={styles.mapcontainer}
          id="my-anchor-element"
          data-tooltip-float={true}
        >
          <DateRange todayEnd={todayEnd} setDates={setDates} dates={dates} />
          <MapReact
            setTooltipContent={setContent}
            onClickedCountry={setCountryInfo}
            countryInfo={countryInfo}
            countriesClickedGlobal={dataClicked.countries}
            clearCountriesGlobal={clearCountryInfo}
          />

          <Tooltip anchorSelect="#my-anchor-element" content={content} />
          {/* {dataClicked.authorId && <VideoPlayer videoData={dataClicked} />} */}
          <ResetButton unclickCountries={clearCountryInfo} />
        </div>
        <SideBar
          {...countryInfo}
          dates={dates}
          globalData={globalResponse.data}
          isLoadingData={loading}
          handleClickSidebarItem={(e, dataClicked) =>
            handleClickSidebarItem(e, dataClicked)
          }
          globalCountryCodes={globalCountryCodes.data}
          cleanSelection={
            dataClicked.videoId === InitialDataClickedObject.videoId
          }
          topByCountryData={topByCountry.data}
        />
      </main>
    </div>
  );
}

export default App;
