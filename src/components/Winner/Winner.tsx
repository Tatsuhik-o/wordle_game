import styles from "./Winner.module.css";

export default function Winner() {
  return (
    <div className={styles.winner}>
      <img src="party.gif" alt="" />
      <h2>Congratulations !</h2>
      <p>Come back tomorrow to play again</p>
    </div>
  );
}
