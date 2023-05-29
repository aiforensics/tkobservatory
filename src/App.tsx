import { useState, useEffect } from "react";
import styles from "./App.module.css";
import MapReact from "./components/MapReact";
import { Tooltip } from "react-tooltip";
import SideBar from "./components/Sidebar";
import "react-tooltip/dist/react-tooltip.css";
import ResetButton from "./components/ResetButton";
import { DateRange } from "./components/DateRange";
import { useApiGet, TApiResponse } from "./hooks/useApiHook";

function App() {
  const initialStateCountry = {
    name: "Global Recommendations",
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

  const [content, setContent] = useState("");
  const [countryInfo, setCountryInfo] = useState(initialStateCountry);
  const [dates, setDates] = useState([defaultBegin, todayEnd]);
  const [countries, setCountries] = useState<String[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  let globalResponse: TApiResponse = InitialApiResponse;
  globalResponse = useApiGet(
    `https://ttgo.trex.zone/foryourecommendations/global?start=${dates[0].toISOString()}&end=${dates[1].toISOString()}`,
    dates
  );

  const globalCountryCodes = useApiGet("https://ttgo.trex.zone/api/world");

  useEffect(() => {
    setLoading(globalResponse.loading);
  }, [globalResponse.loading]);

  const clearCountryInfo = () => {
    setCountryInfo(initialStateCountry);
  };

  const handleClickSidebarItem = (e: React.MouseEvent, countries: String[]) => {
    setCountries(countries);
  };

  return (
    <div className={styles.app}>
      <header className="App-header">
        <h2>Welcome to Tiktok Global</h2>
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
            countriesClickedGlobal={countries}
          />

          <Tooltip anchorSelect="#my-anchor-element" content={content} />
          <ResetButton unclickCountries={clearCountryInfo} />
        </div>
        <SideBar
          {...countryInfo}
          dates={dates}
          globalData={globalResponse.data}
          isLoadingData={loading}
          handleClickSidebarItem={(e, countries) =>
            handleClickSidebarItem(e, countries)
          }
          globalCountryCodes={globalCountryCodes.data}
        />
      </main>
    </div>
  );
}

export default App;
