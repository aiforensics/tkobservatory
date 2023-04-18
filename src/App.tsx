import { useState } from "react";
import styles from "./App.module.css";
import MapReact from "./components/MapReact";
import { Tooltip } from "react-tooltip";
import SideBar from "./components/Sidebar";
import "react-tooltip/dist/react-tooltip.css";

function App() {
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

  const clearCountryInfo = () => {
    setCountryInfo(initialStateCountry);
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
          <MapReact
            setTooltipContent={setContent}
            onClickedCountry={setCountryInfo}
            clearCountryInfo={clearCountryInfo}
            dates={dates}
            setDates={setDates}
            yesterdayBegin={yesterdayBegin}
          />
          <Tooltip anchorSelect="#my-anchor-element" content={content} />
        </div>
        <SideBar {...countryInfo} dates={dates} />
      </main>
    </div>
  );
}

export default App;
