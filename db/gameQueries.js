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

export { getAllGames, insertGame, getGameByName, getGameById };