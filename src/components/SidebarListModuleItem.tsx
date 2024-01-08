import {
  GlobalDataParsed,
  TopByCountryData,
  SearchDataParsed,
} from "../types/global";
import styles from "../styles/sidebarListModuleItem.module.css";
import Accordion from "./Accordion";

interface SidebarListModuleItemProps {
  globalDataItem: GlobalDataParsed | TopByCountryData | SearchDataParsed;
  handleClickSidebarItem: (
    e: React.MouseEvent,
    dataClicked: GlobalDataParsed | TopByCountryData | SearchDataParsed
  ) => void;
  active: Boolean;
  isGlobalDataItem: Boolean;
  isSearching: Boolean;
}

const SidebarListModuleItem: React.FC<SidebarListModuleItemProps> = (
  props
): JSX.Element => {
  const {
    globalDataItem,
    handleClickSidebarItem,
    active,
    isGlobalDataItem,
    isSearching,
  } = props;

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

  const authorNameParsed = globalDataItem.authorName
    ? typeof globalDataItem.authorName === "object"
      ? globalDataItem.authorName.nickname
      : globalDataItem.authorName
    : "no data";
  return (
    <div
      className={`${styles.container} ${
        active
          ? isSearching
            ? styles.searchActive
            : isGlobalDataItem
            ? styles.active
            : styles.coutryActive
          : ""
      }`}
      onClick={(e) => handleClickSidebarItem(e, globalDataItem)}
      id={globalDataItem.videoId as string}
    >
      <ul>
        {/* <li key={`authorId-${globalDataItem.authorId}`}>
          <strong>Author Id: </strong>
          {globalDataItem.authorId ? globalDataItem.authorId : "no data"}
        </li> */}
        {globalDataItem.authorName ? (
          <li key={`authorName-${globalDataItem.authorId}`}>
            <strong>Author Name: </strong>
            <span>{`${authorNameParsed}`}</span>
          </li>
        ) : null}
        {isGlobalDataItem && (
          <li key={`comments-${globalDataItem.authorId}`}>
            <strong>Comments: </strong>
            <span>{`${globalDataItem.comments || "no data"}`}</span>
          </li>
        )}

        {isGlobalDataItem && (
          <li key={`likes-${globalDataItem.authorId}`}>
            <strong>Likes: </strong>
            <span>{`${globalDataItem.likes || "no data"}`}</span>
          </li>
        )}
        {isGlobalDataItem && (
          <li key={`shares-${globalDataItem.authorId}`}>
            <strong>Shares: </strong>
            <span>{`${globalDataItem.shares || "no data"}`}</span>
          </li>
        )}
        {/* {isGlobalDataItem && (
          <li key={`samplingTime-${globalDataItem.authorId}`}>
            <strong>Sampling Time: </strong>
            {globalDataItem.samplingTime
              ? dateFormat(globalDataItem.samplingTime)
              : "no data"}
          </li>
        )} */}
        <li key={`createTime-${globalDataItem.authorId}`}>
          <strong>Created Time: </strong>
          <span>{`${
            globalDataItem.createTime
              ? dateFormat(globalDataItem.createTime)
              : "no data"
          }`}</span>
        </li>
        <li key={`description-${globalDataItem.authorId}`}>
          <strong>Description: </strong>
          <span>{`${globalDataItem.description || "no data"}`}</span>
        </li>
        {/* <li key={`musicAuthor-${globalDataItem.authorId}`}>
          <strong>Music Author: </strong>
          {globalDataItem.musicAuthor ? globalDataItem.musicAuthor : "no data"}
        </li>
        <li key={`musicId-${globalDataItem.authorId}`}>
          <strong>Music Id: </strong>
          {globalDataItem.musicId ? globalDataItem.musicId : "no data"}
        </li> */}
        <li key={`musicTitle-${globalDataItem.authorId}`}>
          <strong>Music Title: </strong>
          <span>{`${globalDataItem.musicTitle || "no data"}`}</span>
        </li>
        {/* <li key={`videoId-${globalDataItem.authorId}`}>
          <strong>Video Id: </strong>
          {globalDataItem.videoId ? globalDataItem.videoId : "no data"}
        </li> */}
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
