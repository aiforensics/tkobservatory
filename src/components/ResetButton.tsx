import styles from "../styles/resetButton.module.css";

const ResetButton = ({ unclickCountries }: any) => {
  return (
    <div className={styles.resetButton}>
      <button onClick={unclickCountries}>Reset map</button>
    </div>
  );
};

export default ResetButton;
