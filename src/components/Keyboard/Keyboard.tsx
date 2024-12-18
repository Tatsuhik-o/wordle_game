import styles from "./Keyboard.module.css";
import KeyboardLetter from "./KeyboardLetter";

export default function Keyboard() {
  const firstRow: string[] = "qwertyuiop".split("");
  const secondRow: string[] = "asdfghjkl".split("");
  const thirdRow: string[] = ["Enter", ..."zxcvbnm".split(""), "⌫"];
  return (
    <div className={styles.keyboard}>
      <div className={styles.first_row}>
        {firstRow.map((letter: string, idx: number) => {
          return <KeyboardLetter key={idx} letter={letter} />;
        })}
      </div>
      <div className={styles.second_row}>
        {secondRow.map((Letter: string, idx: number) => {
          return <KeyboardLetter key={idx} letter={Letter} />;
        })}
      </div>
      <div className={styles.third_row}>
        {thirdRow.map((Letter: string, idx: number) => {
          return <KeyboardLetter key={idx} letter={Letter} />;
        })}
      </div>
    </div>
  );
}
