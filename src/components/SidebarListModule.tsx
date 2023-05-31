import { useState } from "react";
import SidebarListModuleItem from "./SidebarListModuleItem";
import { GlobalData } from "../types/global";

type Props = {
  parsedData: GlobalData[];
  cleanSelection: Boolean;
  handleClickSidebarItem: (
    e: React.MouseEvent,
    dataClicked: GlobalData
  ) => void;
};

const SidebarListModule = ({
  parsedData,
  handleClickSidebarItem,
  cleanSelection,
}: Props) => {
  const [activeItem, setActiveItem] = useState("");
  const [resultsShown, setResultsShown] = useState(10);
  const handleShowMore = () => {
    setResultsShown(resultsShown + 10);
  };

  const handleHighlight = (e: React.MouseEvent, dataClicked: GlobalData) => {
    setActiveItem(e.currentTarget.id);
    handleClickSidebarItem(e, dataClicked);
  };
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
              />
            </li>
          ))}
      </ul>
      {resultsShown < 30 && <button onClick={handleShowMore}>show more</button>}
    </div>
  );
};

export default SidebarListModule;
