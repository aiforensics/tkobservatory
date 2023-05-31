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

  const handleHighlight = (e: React.MouseEvent, dataClicked: GlobalData) => {
    setActiveItem(e.currentTarget.id);
    handleClickSidebarItem(e, dataClicked);
  };
  return (
    <div>
      <ul>
        {parsedData &&
          parsedData.map((globalDataItem, i) => (
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
    </div>
  );
};

export default SidebarListModule;
