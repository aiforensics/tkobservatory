import { useState, useEffect } from "react";
import SidebarListModuleItem from "./SidebarListModuleItem";
import { GlobalDataParsed, TopByCountryData, DataItem } from "../types/global";

type SidebarListModuleProps = {
  parsedData: GlobalDataParsed[] | TopByCountryData[];
  cleanSelection: Boolean;
  parentDiv: null | HTMLDivElement;
  handleClickSidebarItem: (e: React.MouseEvent, dataClicked: DataItem) => void;
};

const INITIAL_RESULTS = 10;
const SidebarListModule = ({
  parsedData,
  handleClickSidebarItem,
  cleanSelection,
  parentDiv,
}: SidebarListModuleProps) => {
  const [activeItem, setActiveItem] = useState("");
  const [resultsShown, setResultsShown] = useState(10);
  const handleShowMore = () => {
    setResultsShown(resultsShown + INITIAL_RESULTS);
  };

  useEffect(() => {
    setResultsShown(INITIAL_RESULTS);
    if (parentDiv) {
      parentDiv.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [parsedData, parentDiv]);

  const handleHighlight = (e: React.MouseEvent, dataClicked: DataItem) => {
    setActiveItem(e.currentTarget.id);
    handleClickSidebarItem(e, dataClicked);
  };

  const isGlobalData =
    parsedData && parsedData.length
      ? !parsedData[0].hasOwnProperty("countryCode")
      : false;

  return (
    <div>
      <ul>
        {parsedData &&
          parsedData.slice(0, resultsShown).map((globalDataItem, i) => (
            <li key={i}>
              <SidebarListModuleItem
                globalDataItem={globalDataItem}
                handleClickSidebarItem={handleHighlight}
                active={
                  cleanSelection ? false : activeItem === globalDataItem.videoId
                }
                isGlobalDataItem={isGlobalData}
              />
            </li>
          ))}
      </ul>
      {resultsShown < 30 && <button onClick={handleShowMore}>show more</button>}
    </div>
  );
};

export default SidebarListModule;
