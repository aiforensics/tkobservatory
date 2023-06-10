import { GlobalDataParsed, TopByCountryData } from "../types/global";
import styles from "../styles/sidebarListModuleItem.module.css";
import Accordion from "./Accordion";

interface SidebarListModuleItemProps {
  globalDataItem: GlobalDataParsed | TopByCountryData;
  handleClickSidebarItem: (
    e: React.MouseEvent,
    dataClicked: GlobalDataParsed | TopByCountryData
  ) => void;
  active: Boolean;
  isGlobalDataItem: Boolean;
}

const SidebarListModuleItem: React.FC<SidebarListModuleItemProps> = (
  props
): JSX.Element => {
  const { globalDataItem, handleClickSidebarItem, active, isGlobalDataItem } =
    props;

  const listOfCountries = isGlobalDataItem ? (
    <ul>
      {globalDataItem.countryNames &&
        globalDataItem.countryNames.map((country) => <li>{country}</li>)}
    </ul>
  ) : (
    "no data"
  );

  const dateFormat = (date: string) => {
    const formattedData = new Date(date).toLocaleString();
    return formattedData;
  };

  return (
    <div
      className={`${styles.container} ${active ? styles.active : ""}`}
      onClick={(e) =>
        isGlobalDataItem ? handleClickSidebarItem(e, globalDataItem) : () => {}
      }
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
        {isGlobalDataItem && (
          <li key="comments">
            <strong>Comments:</strong>
            {globalDataItem.comments ? globalDataItem.comments : "no data"}
          </li>
        )}

        {isGlobalDataItem && (
          <li key="Likes">
            <strong>Likes:</strong>
            {globalDataItem.likes ? globalDataItem.likes : "no data"}
          </li>
        )}
        {isGlobalDataItem && (
          <li key="Shares">
            <strong>Shares:</strong>
            {globalDataItem.shares ? globalDataItem.shares : "no data"}
          </li>
        )}
        {isGlobalDataItem && (
          <li key="Sampling Time">
            <strong>Sampling Time:</strong>
            {globalDataItem.samplingTime
              ? dateFormat(globalDataItem.samplingTime)
              : "no data"}
          </li>
        )}
        <li key="createTime">
          <strong>Created Time:</strong>
          {globalDataItem.createTime
            ? dateFormat(globalDataItem.createTime)
            : "no data"}
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
        {isGlobalDataItem && (
          <li key="countries">
            <div className={styles.accordion}>
              <Accordion
                title={"Countries"}
                content={listOfCountries}
                customClass={styles["fromCountries"]}
              />
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SidebarListModuleItem;
