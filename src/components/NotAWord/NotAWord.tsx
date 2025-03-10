import styles from "./NotAWord.module.css";

export default function NotAWord() {
  return (
    <div className={styles.not_a_word}>
      The word you submitted does not exist
    </div>
  );
}
