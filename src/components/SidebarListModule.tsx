import SidebarListModuleItem from "./SidebarListModuleItem";
import { GlobalData } from "../types/global";

type Props = {
  parsedData: GlobalData[];
  handleClickSidebarItem: (e: React.MouseEvent, countries: String[]) => void;
};

const SidebarListModule = ({ parsedData, handleClickSidebarItem }: Props) => {
  return (
    <div>
      <ul>
        {parsedData &&
          parsedData.map((globalDataItem, i) => (
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
