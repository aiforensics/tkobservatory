import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "../styles/MyDateRangeStyles.css";
import styles from "../styles/dateRange.module.css";

export const DateRange = ({ dates, setDates }: any) => {
  const now = new Date();
  const defaultEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  return (
    <div className={styles.calendarContainer}>
      <h3>Choose Timeframe</h3>
      <DateRangePicker
        className={styles.dateRange}
        onChange={(val) => setDates(val)}
        value={dates}
        maxDate={defaultEnd}
      />
    </div>
  );
};
