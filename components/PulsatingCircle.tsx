import styles from "./PulsatingCircle.module.css";

export default function PulsatingCircle() {
  return (
    <span className="relative px-5">
      <span className={styles["pulsating-circle"]}></span>
    </span>
  );
}
