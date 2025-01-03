import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";
import { createClient } from "redis";

dotenv.config();

const redisClient = createClient();
redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((error, results) => {
  if (error) {
    console.log("Failed to connect to database ...");
    process.exit(1);
  }
  console.log("Database Connected Successfully ...");
});

const checkQuery = `SELECT id FROM word_list WHERE word = ?`;
const todayWordQuery = `SELECT word FROM word_list WHERE id = ?`;
const todayDate = new Date().toISOString().split("T")[0];

app.post("/check_word", async (request, response) => {
  const { word } = request.body;
  db.query(checkQuery, word, (err, results) => {
    if (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Server is Unreachable ..." });
    }
    if (results.length) {
      return response.status(200).json({ message: true });
    }
    return response.status(200).json({ message: false });
  });
});

app.get("/today_word", async (request, response) => {
  const cacheWord = await redisClient.get(todayDate);
  if (cacheWord) {
    return response.status(200).json({ word: cacheWord });
  }
  const randomID = Math.floor(Math.random() * process.env.DB_LENGTH) + 1;
  db.query(todayWordQuery, randomID, async (err, results) => {
    if (err) {
      console.log("Error Reaching to Database", randomID);
      return response
        .status(500)
        .json({ message: "Server is Unreachable ..." });
    }
    await redisClient.set(`${todayDate}`, results[0].word, { EX: 86400 });
    return response.status(200).json({ word: results[0].word });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
