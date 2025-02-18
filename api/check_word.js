import { getDBConnection } from "./db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { word } = req.body;
  console.log(word);
  if (!word) {
    return res.status(400).json({ message: "Word is required" });
  }

  const checkQuery = "SELECT id FROM wordlist WHERE word = ?";

  try {
    const db = await getDBConnection();
    const [results] = await db.execute(checkQuery, [word]);
    await db.end();

    return res.status(200).json({ message: results.length > 0 });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Server is Unreachable ..." });
  }
}
