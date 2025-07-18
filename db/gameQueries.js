import pool from "./pool.js";

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function insertGame(name, developerId) {
  await pool.query("INSERT INTO games (name, developer_id) VALUES ($1, $2)", [name, developerId]);
}

async function getGameByName(name) {
  const { rows } = await pool.query("SELECT * FROM games WHERE name = $1", [name]);
  return rows;
}

async function getGameById(id) {
  const { rows } = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
  return rows;
}

async function updateGameName(name, id) {
  await pool.query("UPDATE games SET name = $1 WHERE id = $2", [name, id]);
}

async function updateGameDeveloper(developerId, id) {
  await pool.query("UPDATE games SET developer_id = $1 WHERE id = $2", [developerId, id]);
}

export { getAllGames, insertGame, getGameByName, getGameById, updateGameName, updateGameDeveloper };