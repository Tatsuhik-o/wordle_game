import styles from "./Letter.module.css";

type LetterProp = {
  letter: string | "";
  index: number;
  wordOfTheDay: string;
  submitted: boolean;
};

export default function Letter({
  letter,
  index,
  wordOfTheDay,
  submitted,
}: LetterProp) {
  const customStyle = !submitted
    ? {}
    : wordOfTheDay[index] === letter
    ? { backgroundColor: "#538D4E" }
    : wordOfTheDay.split("").includes(letter)
    ? { backgroundColor: "#B59F3B" }
    : {};

  return (
    <div className={styles.letter} style={customStyle}>
      {letter}
    </div>
  );
}
