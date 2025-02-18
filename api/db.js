// api/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export async function getDBConnection() {
  try {
    console.log("Connecting to DB...");
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("DB Connection Success!");
    return connection;
  } catch (error) {
    console.error("DB Connection Error:", error);
    throw error;
  }
}
