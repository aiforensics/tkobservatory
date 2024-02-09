import { useState, useEffect, useRef } from "react";
import SidebarListModuleItem from "./SidebarListModuleItem";
import {
  GlobalDataParsed,
  TopByCountryData,
  SearchDataParsed,
} from "../types/global";
import styles from "../styles/sidebarListModule.module.scss";

type SidebarListModuleProps = {
  parsedData: GlobalDataParsed[] | TopByCountryData[] | SearchDataParsed[];
  cleanSelection: Boolean;
  handleClickSidebarItem: (
    e: React.MouseEvent,
    dataClicked: GlobalDataParsed
  ) => void;
  isSearching: boolean;
};

const INITIAL_RESULTS = 10;
const SidebarListModule = ({
  parsedData,
  handleClickSidebarItem,
  cleanSelection,
  isSearching,
}: SidebarListModuleProps) => {
  const [activeItem, setActiveItem] = useState("");
  const [resultsShown, setResultsShown] = useState(10);
  const handleShowMore = () => {
    setResultsShown(resultsShown + INITIAL_RESULTS);
  };
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setResultsShown(INITIAL_RESULTS);
    if (parsedData?.length)
      ulRef!.current!.scrollIntoView({ behavior: "smooth" });
  }, [parsedData]);

  const handleHighlight = (
    e: React.MouseEvent,
    dataClicked: GlobalDataParsed
  ) => {
    setActiveItem(e.currentTarget.id);
    handleClickSidebarItem(e, dataClicked);
  };

  const isGlobalData =
    parsedData && parsedData.length
      ? !parsedData[0].hasOwnProperty("countryCode")
      : false;

  return (
    <div className={styles.container}>
      {parsedData?.length ? (
        <ul className={styles.container_list} ref={ulRef}>
          {parsedData.slice(0, resultsShown).map((globalDataItem, i) => (
            <li className={styles.container_list_item} key={i}>
              <SidebarListModuleItem
                isSearching={isSearching}
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
      ) : (
        <div className={styles.noresults}>{`${
          isSearching ? "No results for your search" : "No results"
        }`}</div>
      )}
      {resultsShown < 30 && parsedData?.length > 10 ? (
        <button className={styles.showmoreButton} onClick={handleShowMore}>
          show more
        </button>
      ) : null}
    </div>
  );
};

export default SidebarListModule;
