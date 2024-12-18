import styles from "./Word.module.css";
import Letter from "./Letter";

type WordProps = {
  word: string;
  wordOfTheDay: string;
  submitted: boolean;
};

export default function Word({ word, wordOfTheDay, submitted }: WordProps) {
  const emptyWord = "     ";

  return (
    <div className={styles.word}>
      {emptyWord.split("").map((letter, idx) => {
        return (
          <Letter
            letter={word[idx] || letter}
            key={idx}
            index={idx}
            wordOfTheDay={wordOfTheDay}
            submitted={submitted}
          />
        );
      })}
    </div>
  );
}
