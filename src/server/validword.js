import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err, results) => {
  if (err) {
    console.log("Failed to connect to Database : ", err);
    process.exit(1);
  }
  console.log("Connected to Database ...");
});

const checkWord = `
  SELECT id FROM word_list WHERE word = ?
`;

app.post("/check", (request, response) => {
  try {
    const { word } = request.body;
    db.query(checkWord, [word], (err, results) => {
      if (err) {
        return response.status(500).json({ message: "Error in Server" });
      }
      if (results.length) {
        return response.status(200).json({ message: true });
      }
      return response.status(200).json({ message: false });
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ message: false });
  }
});

app.listen(process.env.VALIDWORD_PORT, () => {
  console.log(
    `Valid Word is listening on port ${process.env.VALIDWORD_PORT} ...`
  );
});
