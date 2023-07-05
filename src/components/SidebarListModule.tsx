import { useState, useEffect, useRef } from "react";
import SidebarListModuleItem from "./SidebarListModuleItem";
import { GlobalDataParsed, TopByCountryData } from "../types/global";
import styles from "../styles/sidebarListModule.module.css";

type SidebarListModuleProps = {
  parsedData: GlobalDataParsed[] | TopByCountryData[];
  cleanSelection: Boolean;
  handleClickSidebarItem: (
    e: React.MouseEvent,
    dataClicked: GlobalDataParsed
  ) => void;
};

const INITIAL_RESULTS = 10;
const SidebarListModule = ({
  parsedData,
  handleClickSidebarItem,
  cleanSelection,
}: SidebarListModuleProps) => {
  const [activeItem, setActiveItem] = useState("");
  const [resultsShown, setResultsShown] = useState(10);
  const handleShowMore = () => {
    setResultsShown(resultsShown + INITIAL_RESULTS);
  };
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setResultsShown(INITIAL_RESULTS);

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
      <ul className={styles.container_list} ref={ulRef}>
        {parsedData &&
          parsedData.slice(0, resultsShown).map((globalDataItem, i) => (
            <li className={styles.container_list_item} key={i}>
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
      {resultsShown < 30 && (
        <button className={styles.showmoreButton} onClick={handleShowMore}>
          show more
        </button>
      )}
    </div>
  );
};

export default SidebarListModule;
