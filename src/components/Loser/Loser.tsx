import styles from "./Loser.module.css";
import Button from "../Button/Button";

type LoserProps = {
  reset: Function;
};

export default function Loser({ reset }: LoserProps) {
  return (
    <div className={styles.loser}>
      <img src="loser.gif" alt="" />
      <h2>Tough Luck</h2>
      <Button contentText="Try Again" reset={reset} />
    </div>
  );
}
