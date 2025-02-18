import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export async function getDBConnection() {
  try {
    console.log("Connecting to DB...");
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_USERNAME);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_NAME);
    console.log(process.env.PORT);
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.PORT,
    });
    console.log("DB Connection Success!");
    return connection;
  } catch (error) {
    console.error("DB Connection Error:", error);
    throw error;
  }
}
