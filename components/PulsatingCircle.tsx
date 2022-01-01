import styles from "./PulsatingCircle.module.css";

export default function PulsatingCircle() {
  return (
    <span className="relative px-5">
      <div className={styles["pulsating-circle"]}></div>
    </span>
  );
}
