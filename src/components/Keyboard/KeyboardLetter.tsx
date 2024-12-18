import styles from "./KeyboardLetter.module.css";

type KeyboardLetterProps = {
  letter: string;
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

export default function KeyboardLetter({ letter }: KeyboardLetterProps) {
  return (
    <div
      className={styles.keyboard_letter}
      onClick={() => triggerEvent(letter)}
    >
      {letter.toUpperCase()}
    </div>
  );
}
