import { getDBConnection } from "./db.js"; // Explicit file extension

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const todayWordQuery = "SELECT word FROM wordlist WHERE id = ?";
  const todayDate = new Date().toISOString().split("T")[0];
  const randomID = Math.floor(Math.random() * process.env.DB_LENGTH) + 1;

  try {
    const db = await getDBConnection();
    const [results] = await db.execute(todayWordQuery, [randomID]);
    await db.end();

    if (results.length === 0) {
      return res.status(404).json({ message: "Word not found" });
    }

    return res.status(200).json({ word: results[0].word });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Server is Unreachable ..." });
  }
}
