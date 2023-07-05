import styles from "../styles/mapControls.module.css";

export interface IAppProps {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

export default function App(props: IAppProps) {
  return (
    <div className={styles.container}>
      <button onClick={props.handleZoomOut}>-</button>
      <button onClick={props.handleZoomIn}>+</button>
    </div>
  );
}
