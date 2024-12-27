import styles from "./Keyboard.module.css";
import KeyboardLetter from "./KeyboardLetter";

type TKeyboardProps = {
  correctLetters: string[];
  changeLetters: string[];
  incorrectLetters: string[];
};

export default function Keyboard({
  correctLetters,
  changeLetters,
  incorrectLetters,
}: TKeyboardProps) {
  const firstRow: string[] = "qwertyuiop".split("");
  const secondRow: string[] = "asdfghjkl".split("");
  const thirdRow: string[] = ["Enter", ..."zxcvbnm".split(""), "⌫"];
  return (
    <div className={styles.keyboard}>
      <div className={styles.first_row}>
        {firstRow.map((letter: string, idx: number) => {
          return (
            <KeyboardLetter
              key={idx}
              letter={letter}
              correctLetters={correctLetters}
              changeLetters={changeLetters}
              incorrectLetters={incorrectLetters}
            />
          );
        })}
      </div>
      <div className={styles.second_row}>
        {secondRow.map((Letter: string, idx: number) => {
          return (
            <KeyboardLetter
              key={idx}
              letter={Letter}
              correctLetters={correctLetters}
              changeLetters={changeLetters}
              incorrectLetters={incorrectLetters}
            />
          );
        })}
      </div>
      <div className={styles.third_row}>
        {thirdRow.map((Letter: string, idx: number) => {
          return (
            <KeyboardLetter
              key={idx}
              letter={Letter}
              correctLetters={correctLetters}
              changeLetters={changeLetters}
              incorrectLetters={incorrectLetters}
            />
          );
        })}
      </div>
    </div>
  );
}
