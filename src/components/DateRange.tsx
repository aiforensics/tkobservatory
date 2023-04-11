import { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import styles from "../styles/dateRange.module.css";

export const DateRange = () => {
  const now = new Date();
  const yesterdayBegin = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );
  const todayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );

  const [value, setVal] = useState([yesterdayBegin, todayEnd]);
  return (
    <DateRangePicker
      className={styles.dateRange}
      onChange={(val: Date[]) => setVal(val)}
      value={value}
      maxDate={todayEnd}
    />
  );
};
