import { useState } from "react";
import styles from "../styles/accordion.module.css";

type Props = {
  title: String;
  content: String | JSX.Element;
  customClass: String;
};

const Accordion = ({ title, content, customClass }: Props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`${styles.container} ${customClass}`}>
      <div
        className={styles.containerTitle}
        onClick={() => setIsActive(!isActive)}
      >
        <div>{title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
};

export default Accordion;
