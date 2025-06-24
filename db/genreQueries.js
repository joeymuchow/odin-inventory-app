import pool from "./pool.js";

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

export { getAllGenres };