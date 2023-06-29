import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "../styles/MyDateRangeStyles.css";
import styles from "../styles/dateRange.module.css";

export const DateRange = ({ todayEnd, dates, setDates }: any) => {
  return (
    <div className={styles.calendarContainer}>
      <h3>Choose Timeframe</h3>
      <DateRangePicker
        className={styles.dateRange}
        onChange={(val) => setDates(val)}
        value={dates}
        maxDate={todayEnd}
      />
    </div>
  );
};
