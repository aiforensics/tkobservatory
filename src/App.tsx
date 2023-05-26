import { useState } from "react";
import styles from "./App.module.css";
import MapReact from "./components/MapReact";
import { Tooltip } from "react-tooltip";
import SideBar from "./components/Sidebar";
import "react-tooltip/dist/react-tooltip.css";
import ResetButton from "./components/ResetButton";
import { DateRange } from "./components/DateRange";
import { useApiGet, TApiResponse } from "./hooks/useApiHook";

function App() {
  const globalResponse: TApiResponse = useApiGet(
    "http://localhost:8000/global"
  );

  const initialStateCountry = {
    name: "Worldwide",
    available: true,
  };
  const now = new Date();
  const yesterdayBegin = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
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
  const [content, setContent] = useState("");
  const [countryInfo, setCountryInfo] = useState(initialStateCountry);
  const [dates, setDates] = useState([yesterdayBegin, todayEnd]);
  const [countries, setCountries] = useState<string[]>([]);

  const clearCountryInfo = () => {
    setCountryInfo(initialStateCountry);
  };

  const handleClickSidebarItem = (e: React.MouseEvent, countries: string[]) => {
    setCountries(countries);
    console.log("countries--", countries);
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
          handleClickSidebarItem={(e, countries) =>
            handleClickSidebarItem(e, countries)
          }
        />
      </main>
    </div>
  );
}

export default App;
