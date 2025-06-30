import pool from "./pool.js";

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

async function insertGenre(name) {
  await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);
}

async function updateGenre(name, id) {
  await pool.query("UPDATE genres SET name = $1 WHERE id = $2", [name, id]);
}

export { getAllGenres, insertGenre, updateGenre };