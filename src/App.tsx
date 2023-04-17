import { useState } from "react";
import styles from "./App.module.css";
import MapReact from "./components/MapReact";
import { Tooltip } from "react-tooltip";
import SideBar from "./components/Sidebar";
import "react-tooltip/dist/react-tooltip.css";

function App() {
  const [content, setContent] = useState("");
  const [countryInfo, setCountryInfo] = useState({ name: "", available: true });

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
          />
          <Tooltip anchorSelect="#my-anchor-element" content={content} />
        </div>
        <SideBar {...countryInfo} />
      </main>
    </div>
  );
}

export default App;
