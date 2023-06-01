import { GlobalDataParsed } from "../types/global";
import styles from "../styles/sidebarListModuleItem.module.css";
import Accordion from "./Accordion";

interface ItemInterface {
  globalDataItem: GlobalDataParsed;
  handleClickSidebarItem: (
    e: React.MouseEvent,
    dataClicked: GlobalDataParsed
  ) => void;
  active: Boolean;
}

const SidebarListModuleItem: React.FC<ItemInterface> = (props): JSX.Element => {
  const { globalDataItem, handleClickSidebarItem, active } = props;
  const isThereCountries =
    globalDataItem.countries && globalDataItem.countries.length;
  const listOfCountries = isThereCountries ? (
    <ul>
      {globalDataItem.countryNames!.map((country) => (
        <li>{country}</li>
      ))}
    </ul>
  ) : (
    "no data"
  );

  return (
    <div
      className={`${styles.container} ${active ? styles.active : ""}`}
      onClick={(e) => handleClickSidebarItem(e, globalDataItem)}
      id={globalDataItem.videoId as string}
    >
      <ul>
        <li key="authorId">
          <strong>Author Id:</strong>
          {globalDataItem.authorId ? globalDataItem.authorId : "no data"}
        </li>
        <li key="authorName">
          <strong>Author Name:</strong>
          {globalDataItem.authorName ? globalDataItem.authorName : "no data"}
        </li>
        <li key="createTime">
          <strong>Created Time:</strong>
          {globalDataItem.createTime ? globalDataItem.createTime : "no data"}
        </li>
        <li key="description">
          <strong>Description:</strong>
          {globalDataItem.description ? globalDataItem.description : "no data"}
        </li>
        <li key="musicAuthor">
          <strong>Music Author:</strong>
          {globalDataItem.musicAuthor ? globalDataItem.musicAuthor : "no data"}
        </li>
        <li key="musicId">
          <strong>Music Id:</strong>
          {globalDataItem.musicId ? globalDataItem.musicId : "no data"}
        </li>
        <li key="musicTitle">
          <strong>Music Title:</strong>
          {globalDataItem.musicTitle ? globalDataItem.musicTitle : "no data"}
        </li>
        <li key="videoId">
          <strong>Video Id:</strong>
          {globalDataItem.videoId ? globalDataItem.videoId : "no data"}
        </li>
        <li key="countries">
          <div className={styles.accordion}>
            <Accordion
              title={"Countries"}
              content={listOfCountries}
              customClass={styles["fromCountries"]}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SidebarListModuleItem;
