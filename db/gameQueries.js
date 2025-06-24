import pool from "./pool.js";

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

export { getAllGames };