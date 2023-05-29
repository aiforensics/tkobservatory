import { GlobalData } from "../types/global";
import styles from "../styles/sidebarListModuleItem.module.css";

interface ItemInterface {
  globalDataItem: GlobalData;
  handleClickSidebarItem: (e: React.MouseEvent, countries: string[]) => void;
}

const SidebarListModuleItem: React.FC<ItemInterface> = (props): JSX.Element => {
  const { globalDataItem, handleClickSidebarItem } = props;
  const isThereCountries =
    globalDataItem.countries && globalDataItem.countries.length;
  return (
    <div
      className={styles.container}
      onClick={(e) => handleClickSidebarItem(e, globalDataItem.countries)}
    >
      <ul>
        <li>
          <strong>Author Id:</strong>
          {globalDataItem.authorId ? globalDataItem.authorId : "no data"}
        </li>
        <li>
          <strong>Author Name:</strong>
          {globalDataItem.authorName ? globalDataItem.authorName : "no data"}
        </li>
        <li>
          <strong>Created Time:</strong>
          {globalDataItem.createTime ? globalDataItem.createTime : "no data"}
        </li>
        <li>
          <strong>Description:</strong>
          {globalDataItem.description ? globalDataItem.description : "no data"}
        </li>
        <li>
          <strong>Music Author:</strong>
          {globalDataItem.musicAuthor ? globalDataItem.musicAuthor : "no data"}
        </li>
        <li>
          <strong>Music Id:</strong>
          {globalDataItem.musicId ? globalDataItem.musicId : "no data"}
        </li>
        <li>
          <strong>Music Title:</strong>
          {globalDataItem.musicTitle ? globalDataItem.musicTitle : "no data"}
        </li>
        <li>
          <strong>Video Id:</strong>
          {globalDataItem.videoId ? globalDataItem.videoId : "no data"}
        </li>
        <li>
          <strong>Countries:</strong>
          {isThereCountries ? (
            <ul>
              {globalDataItem.countries.map((country) => (
                <li>{country}</li>
              ))}
            </ul>
          ) : (
            "no data"
          )}
        </li>
      </ul>
    </div>
  );
};

export default SidebarListModuleItem;
