import SidebarListModuleItem from "./SidebarListModuleItem";
import { GlobalData } from "../types/global";

type Props = {
  globalData: GlobalData[];
  handleClickSidebarItem: (e: React.MouseEvent, countries: string[]) => void;
};

const SidebarListModule = ({ globalData, handleClickSidebarItem }: Props) => {
  return (
    <div>
      <ul>
        {globalData &&
          globalData.map((globalDataItem, i) => (
            <li key={i}>
              <SidebarListModuleItem
                globalDataItem={globalDataItem}
                handleClickSidebarItem={handleClickSidebarItem}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SidebarListModule;
