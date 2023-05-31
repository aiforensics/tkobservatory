import { useState } from "react";
import SidebarListModuleItem from "./SidebarListModuleItem";
import { GlobalData } from "../types/global";

type Props = {
  parsedData: GlobalData[];
  handleClickSidebarItem: (e: React.MouseEvent, countries: String[]) => void;
};

const SidebarListModule = ({ parsedData, handleClickSidebarItem }: Props) => {
  const [activeItem, setActiveItem] = useState("");

  const handleHighlight = (e: React.MouseEvent, countries: Array<String>) => {
    console.log();
    setActiveItem(e.currentTarget.id);
    handleClickSidebarItem(e, countries);
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
                active={activeItem === globalDataItem.videoId}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SidebarListModule;
