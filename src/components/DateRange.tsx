import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import styles from "../styles/dateRange.module.css";

export const DateRange = ({ todayEnd, dates, setDates }: any) => {
  return (
    <DateRangePicker
      className={styles.dateRange}
      onChange={(val: Date[]) => setDates(val)}
      value={dates}
      maxDate={todayEnd}
    />
  );
};
