import styles from "./Button.module.css";

type ButtonProps = {
  contentText: string;
  reset: Function;
};

export default function Button({ contentText, reset }: ButtonProps) {
  return (
    <div
      className={styles.button}
      onClick={() => {
        reset();
      }}
    >
      {contentText}
    </div>
  );
}
