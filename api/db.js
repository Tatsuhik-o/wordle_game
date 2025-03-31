import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export async function getDBConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.PORT,
    });
    return connection;
  } catch (error) {
    console.error("DB Connection Error:", error);
    throw error;
  }
}
