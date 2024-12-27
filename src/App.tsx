import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";
import Word from "./components/Word/Word";
import NotAWord from "./components/NotAWord/NotAWord";
import GameOver from "./components/GameOver/GameOver";

type GlobalState = {
  currentCount: number;
  currentWord: string;
  allWords: string[];
  gameState: boolean;
  correctLetters: string[];
  incorrectLetters: string[];
  changeLetters: string[];
};

type ActionType =
  | { type: "new_letter"; payload: string }
  | { type: "new_word"; payload: string }
  | { type: "backspace" }
  | { type: "enter" }
  | { type: "game_over" }
  | { type: "reset" }
  | { type: "check_letters"; payload: string };

const initialState: GlobalState = {
  currentCount: 0,
  currentWord: "",
  allWords: ["", "", "", "", "", ""],
  gameState: false,
  correctLetters: [],
  incorrectLetters: [],
  changeLetters: [],
};

function reduceFunc(state: GlobalState, action: ActionType): GlobalState {
  switch (action.type) {
    case "new_letter":
      return {
        ...state,
        allWords: state.allWords.map((word, idx) => {
          if (idx !== state.currentCount) return word;
          return (word + action.payload).slice(0, 5);
        }),
      };
    case "backspace":
      return {
        ...state,
        allWords: state.allWords.map((word, idx) => {
          if (idx !== state.currentCount) return word;
          return word.slice(0, -1);
        }),
      };
    case "enter":
      return {
        ...state,
        currentCount: state.currentCount + 1,
      };
    case "check_letters":
      return {
        ...state,
        correctLetters: [
          ...state.correctLetters,
          ...state.allWords[state.currentCount]
            .split("")
            .filter(
              (letter, idx) =>
                action.payload.split("").includes(letter) &&
                action.payload.split("")[idx] === letter
            ),
        ],
        changeLetters: [
          ...state.changeLetters,
          ...state.allWords[state.currentCount]
            .split("")
            .filter(
              (letter, idx) =>
                action.payload.split("").includes(letter) &&
                action.payload.split("")[idx] !== letter
            ),
        ],
        incorrectLetters: [
          ...state.incorrectLetters,
          ...state.allWords[state.currentCount]
            .split("")
            .filter((letter) => !action.payload.split("").includes(letter)),
        ],
      };
    case "game_over":
      return {
        ...state,
        currentCount: state.currentCount + 1,
        gameState: true,
      };
    case "reset":
      return { ...initialState };
    default:
      return state;
  }
}

async function verifyWord(checkWord: string): Promise<boolean> {
  const API_URL = "https://api.frontendeval.com/fake/word/valid";
  const options: { method: "POST"; headers: HeadersInit; body: string } = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word: checkWord }),
  };

  try {
    const response = await fetch(API_URL, options);
    if (!response.ok) {
      console.error("Error response status:", response.status);
      return false;
    }

    const result: boolean = await response.json();
    return result;
  } catch (error) {
    console.error("Error verifying word:", error);
    return false;
  }
}

const alphabets = "abcdefghijklmnopqrstvuwxyz";

function App() {
  const [state, dispatch] = useReducer(reduceFunc, initialState);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [notDict, setNotDict] = useState<boolean>(false);
  const wordOfTheDay = useRef<string>("");

  const CaptureKeyPress = useCallback(
    async (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        dispatch({ type: "backspace" });
        return;
      }
      if (alphabets.includes(e.key.toLowerCase())) {
        dispatch({ type: "new_letter", payload: e.key.toLowerCase() });
        return;
      }
      if (e.key === "Enter") {
        if (state.allWords[state.currentCount].length === 5) {
          if (state.allWords[state.currentCount] === wordOfTheDay.current) {
            dispatch({ type: "game_over" });
          }
          const isValid = await verifyWord(state.allWords[state.currentCount]);
          if (isValid) {
            dispatch({
              type: "check_letters",
              payload: wordOfTheDay.current,
            });
            dispatch({ type: "enter" });
          } else {
            setNotDict(true);
            console.log("Invalid word!");
          }
        }
      }
    },
    [state, alphabets]
  );

  useEffect(() => {
    const notDictDelay = setTimeout(() => {
      setNotDict(false);
    }, 850);
    return () => {
      clearTimeout(notDictDelay);
    };
  }, [notDict]);

  useEffect(() => {
    document.addEventListener("keydown", CaptureKeyPress);
    return () => {
      document.removeEventListener("keydown", CaptureKeyPress);
    };
  }, [CaptureKeyPress]);

  useEffect(() => {
    async function fetchWordOfTheDay() {
      const response = await fetch("https://api.frontendeval.com/fake/word");
      if (response.ok) {
        const data = await response.text();
        wordOfTheDay.current = data;
      }
    }
    fetchWordOfTheDay();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (state.gameState || state.currentCount >= 6) setGameOver(true);
    }, 500);
    return () => {
      clearTimeout(delay);
    };
  }, [state.gameState, state.currentCount]);

  return (
    <div className="app">
      {gameOver && (
        <GameOver
          player={
            state.allWords[state.currentCount - 2] === wordOfTheDay.current
          }
          reset={() => {
            dispatch({ type: "reset" });
            setGameOver(false);
          }}
        />
      )}
      <Header />
      {notDict && <NotAWord />}
      <div className="words_placeholder">
        {state.allWords.map((word, idx) => (
          <Word
            key={idx}
            word={word}
            wordOfTheDay={wordOfTheDay.current}
            submitted={idx < state.currentCount}
          />
        ))}
      </div>
      <div className="keyboard">
        <Keyboard
          correctLetters={state.correctLetters}
          changeLetters={state.changeLetters}
          incorrectLetters={state.incorrectLetters}
        />
      </div>
    </div>
  );
}

export default App;
