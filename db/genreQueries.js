import pool from "./pool.js";

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

async function insertGenre(name) {
  await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);
}

export { getAllGenres, insertGenre };