import styles from "./GameOver.module.css";
import Winner from "../Winner/Winner";
import Loser from "../Loser/Loser";

type GameOverProps = {
  player: boolean;
  reset: Function;
};

export default function GameOver({ player, reset }: GameOverProps) {
  return (
    <div className={styles.game_over}>
      {player && <Winner />}
      {!player && <Loser reset={reset} />}
    </div>
  );
}
