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

async function getSingleGenre(name) {
  const { rows } = await pool.query("SELECT * FROM genres WHERE name = $1", [name]);
  return rows;
}

async function insertGameGenre(gameId, genreId) {
  await pool.query("INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2)", [gameId, genreId]);
}

export { getAllGenres, insertGenre, updateGenre, getSingleGenre, insertGameGenre };