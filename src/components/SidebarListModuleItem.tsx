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
        globalDataItem.countryNames.map((country) => (
          <li key={`country-${country}`}>{country}</li>
        ))}
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
        <li key={`authorId-${globalDataItem.authorId}`}>
          <strong>Author Id: </strong>
          {globalDataItem.authorId ? globalDataItem.authorId : "no data"}
        </li>
        <li key={`authorName-${globalDataItem.authorId}`}>
          <strong>Author Name: </strong>
          {globalDataItem.authorName ? globalDataItem.authorName : "no data"}
        </li>
        {isGlobalDataItem && (
          <li key={`comments-${globalDataItem.authorId}`}>
            <strong>Comments: </strong>
            {globalDataItem.comments ? globalDataItem.comments : "no data"}
          </li>
        )}

        {isGlobalDataItem && (
          <li key={`likes-${globalDataItem.authorId}`}>
            <strong>Likes: </strong>
            {globalDataItem.likes ? globalDataItem.likes : "no data"}
          </li>
        )}
        {isGlobalDataItem && (
          <li key={`shares-${globalDataItem.authorId}`}>
            <strong>Shares: </strong>
            {globalDataItem.shares ? globalDataItem.shares : "no data"}
          </li>
        )}
        {isGlobalDataItem && (
          <li key={`samplingTime-${globalDataItem.authorId}`}>
            <strong>Sampling Time: </strong>
            {globalDataItem.samplingTime
              ? dateFormat(globalDataItem.samplingTime)
              : "no data"}
          </li>
        )}
        <li key={`createTime-${globalDataItem.authorId}`}>
          <strong>Created Time: </strong>
          {globalDataItem.createTime
            ? dateFormat(globalDataItem.createTime)
            : "no data"}
        </li>
        <li key={`description-${globalDataItem.authorId}`}>
          <strong>Description: </strong>
          {globalDataItem.description ? globalDataItem.description : "no data"}
        </li>
        <li key={`musicAuthor-${globalDataItem.authorId}`}>
          <strong>Music Author: </strong>
          {globalDataItem.musicAuthor ? globalDataItem.musicAuthor : "no data"}
        </li>
        <li key={`musicId-${globalDataItem.authorId}`}>
          <strong>Music Id: </strong>
          {globalDataItem.musicId ? globalDataItem.musicId : "no data"}
        </li>
        <li key={`musicTitle-${globalDataItem.authorId}`}>
          <strong>Music Title: </strong>
          {globalDataItem.musicTitle ? globalDataItem.musicTitle : "no data"}
        </li>
        <li key={`videoId-${globalDataItem.authorId}`}>
          <strong>Video Id: </strong>
          {globalDataItem.videoId ? globalDataItem.videoId : "no data"}
        </li>
        {isGlobalDataItem && (
          <li key={`countries-${globalDataItem.authorId}`}>
            <div className={styles.accordion}>
              <Accordion
                title={"Countries video appears in"}
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
