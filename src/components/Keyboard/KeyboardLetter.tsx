import styles from "./KeyboardLetter.module.css";

type KeyboardLetterProps = {
  letter: string;
  correctLetters: string[];
  changeLetters: string[];
  incorrectLetters: string[];
};

function triggerEvent(key: string) {
  let eventKey = key;
  let eventCode = "";
  if (key === "⌫") {
    eventKey = "Backspace";
    eventCode = "Backspace";
  } else if (key === "Enter") {
    eventKey = "Enter";
    eventCode = "Enter";
  } else {
    eventCode = `Key${key.toUpperCase()}`;
  }
  const event = new KeyboardEvent("keydown", {
    key: eventKey,
    code: eventCode,
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(event);
}

export default function KeyboardLetter({
  letter,
  correctLetters,
  changeLetters,
  incorrectLetters,
}: KeyboardLetterProps) {
  const customStyle = correctLetters.includes(letter)
    ? { backgroundColor: "#538D4E" }
    : changeLetters.includes(letter)
    ? { backgroundColor: "#B49F3B" }
    : incorrectLetters.includes(letter)
    ? { backgroundColor: "#121213" }
    : {};

  return (
    <div
      className={styles.keyboard_letter}
      onClick={() => triggerEvent(letter)}
      style={customStyle}
    >
      {letter.toUpperCase()}
    </div>
  );
}
