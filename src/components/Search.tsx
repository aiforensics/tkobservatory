import styles from "../styles/search.module.scss";
import React, {
  useRef,
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react";
import { useApiGet } from "../hooks/useApiHook";
import { searchResults } from "../types/global";

interface Props {
  handleSearchResults: (arg0: searchResults) => void;
  handleInputFocus: (arg0: boolean) => void;
  imputFocused: boolean;
  handleCleanSearch: () => void;
  isSearchKey: boolean;
}

const Search: React.FC<Props> = ({
  handleSearchResults,
  handleInputFocus,
  imputFocused,
  handleCleanSearch,
  isSearchKey,
}) => {
  const [val, setVal] = useState("");
  const [selected, setSelected] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [isSearchInProcess, setIsSearchInProcess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { loading, error, data, status, execute } = useApiGet(
    selected !== undefined && selected === "description"
      ? `${process.env.REACT_APP_SEARCH_API}/search?search=${searchKey}&n=4000`
      : `${process.env.REACT_APP_SEARCH_API}/match?key=${selected}&value=${searchKey}`,
    null,
    true
  );

  const submitHandler = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSearchKey(encodeURIComponent(inputRef.current?.value!));
      setIsSearchInProcess(true);
      execute();
    },
    [execute]
  );

  useEffect(() => {
    if (status === 200 && searchKey) {
      const myObj = { searchKey: searchKey, data: data, selected: selected };
      handleSearchResults(myObj);
    }
  }, [status, data, handleSearchResults, searchKey, selected]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setVal(newValue);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.target.value;
    setSelected(value);
  };

  // let element = document.getElementById("searchSelect") as HTMLSelectElement;
  const handleBlur = (e: any) => {
    // if (
    //   !e.currentTarget.contains(e.relatedTarget) &&
    //   (!isSearchInProcess || !isSearchKey)
    // ) {
    //   console.log("primer if");
    //   element.value = "default";
    //   setSelected("");
    //   setIsSearchInProcess(false);
    //   if (data === undefined || !isSearchKey) setVal("");
    //   handleInputFocus(false);
    // }
    if (!e.currentTarget.contains(e.relatedTarget)) {
      console.log("segund if");
      handleInputFocus(false);
    }
  };

  // Cleans the search input and data
  const handleCleanSearchData = useCallback(() => {
    let element = document.getElementById("searchSelect") as HTMLSelectElement;
    element.value = "default";
    setIsSearchInProcess(false);
    handleInputFocus(false);
    setSearchKey("");
    setSelected("");
    setVal("");
    handleCleanSearch();
  }, [handleCleanSearch, handleInputFocus]);

  useEffect(() => {
    if (!isSearchKey) {
      handleCleanSearchData();
    }
  }, [isSearchKey, handleCleanSearchData]);

  return (
    <div className={styles.searchParentContainer}>
      <form
        className={`${styles.searchContainer} ${
          ((isSearchInProcess && isSearchKey) || imputFocused) && styles.focus
        }`}
        onSubmit={submitHandler}
        onFocus={(e) => handleInputFocus(true)}
        onBlur={handleBlur}
      >
        <div className={styles.searchMainContainer}>
          <div className={styles.selectWrapper}>
            <select
              name="searchSelect"
              id="searchSelect"
              onChange={(e) => handleSelect(e)}
              defaultValue={"default"}
            >
              <option disabled value="default">
                SEARCH IN
              </option>
              <option value="authorName">authorName</option>
              <option value="description">description</option>
              <option value="musicAuthor">musicAuthor</option>
              <option value="musicTitle">musicTitle</option>
            </select>
          </div>
          {/* <i className={"icon-search"} /> */}
          <div className={styles.searchDeleteContainer}>
            <input
              ref={inputRef}
              type="text"
              id="searchin"
              name="searchin"
              value={val}
              placeholder="ENTER KEYWORD, HASHTAG, USERNAME..."
              onChange={onChange}
            />
            {/* {val && (
              <button onClick={() => setVal("")}>
                <i className={"icon-cancel"} />
              </button>
            )} */}
          </div>
        </div>
        <button
          className={styles.searchButton}
          type="submit"
          disabled={val === "" || selected === ""}
        >
          SEARCH
        </button>
        <div className={styles.requestState}>
          {error ? (
            <span>Something went wrong</span>
          ) : loading ? (
            "Loading results..."
          ) : (
            ""
          )}
        </div>
      </form>
      {isSearchKey && !loading && !error && (
        <div className={styles.cleanSearch}>
          <button onClick={handleCleanSearchData}>CLEAR SEARCH</button>
        </div>
      )}
    </div>
  );
};

export default React.memo(Search);
