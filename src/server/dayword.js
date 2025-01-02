import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const app = express();
app.use(express());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err, results) => {
  if (err) {
    console.log("Failed to connect to database ...");
    process.exit(1);
  }
  console.log("Connect to db successfully ...");
});

const query = `SELECT word FROM word_list WHERE id = ?`;
const randomID = Math.floor(Math.random() * process.env.DB_LENGTH) + 1;

app.get("/word", (request, response) => {
  console.log(randomID);
  try {
    db.query(query, [randomID], (err, results) => {
      if (err) {
        console.log("Failed to fetch word from database");
        return response.status(500).json({ word: "Error" });
      }
      if (results.length) {
        return response.status(200).json({ word: results[0].word });
      }
      console.log(results);
      return response.status(500).json({ word: "Error" });
    });
  } catch (err) {
    console.log("Error : ", err);
  }
});

app.listen(process.env.DAYWORD_PORT, () => {
  console.log("app is listening on ", process.env.DAYWORD_PORT);
});
