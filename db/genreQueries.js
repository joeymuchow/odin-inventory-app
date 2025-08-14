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

async function getSingleGenreByName(name) {
  const { rows } = await pool.query("SELECT * FROM genres WHERE name = $1", [
    name,
  ]);
  return rows;
}

async function getSingleGenreById(id) {
  const { rows } = await pool.query("SELECT * FROM genres WHERE id = $1", [id]);
  return rows;
}

async function insertGameGenre(gameId, genreId) {
  await pool.query(
    "INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2)",
    [gameId, genreId]
  );
}

async function getGameGenres(gameId) {
  const { rows } = await pool.query(
    "SELECT * FROM games_genres WHERE game_id = $1",
    [gameId]
  );
  return rows;
}

async function deleteGameGenre(gameId, genreId) {
  await pool.query(
    "DELETE FROM games_genres WHERE game_id = $1 AND genre_id = $2",
    [gameId, genreId]
  );
}

async function deleteGameGenreByGame(gameId) {
  await pool.query(
    "DELETE FROM games_genres WHERE game_id = $1",
    [gameId]
  );
}

async function deleteGameGenreByGenre(genreId) {
  await pool.query(
    "DELETE FROM games_genres WHERE genre_id = $1",
    [genreId]
  );
}

async function deleteGenre(id) {
  await pool.query(
    "DELETE FROM genres WHERE id = $1",
    [id]
  );
}

export {
  getAllGenres,
  insertGenre,
  updateGenre,
  getSingleGenreByName,
  getSingleGenreById,
  insertGameGenre,
  getGameGenres,
  deleteGameGenre,
  deleteGameGenreByGame,
  deleteGameGenreByGenre,
  deleteGenre,
};
