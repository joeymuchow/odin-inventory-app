import pool from "./pool.js";

async function getAllPlatforms() {
  const { rows } = await pool.query("SELECT * FROM platforms");
  return rows;
}

async function insertPlatform(name) {
  await pool.query("INSERT INTO platforms (name) VALUES ($1)", [name]);
}

async function updatePlatform(name, id) {
  await pool.query("UPDATE platforms SET name = $1 WHERE id = $2", [name, id]);
}

async function getSinglePlatform(name) {
  const { rows } = await pool.query("SELECT * FROM platforms WHERE name = $1", [name]);
  return rows;
}

async function insertGamePlatform(gameId, platformId) {
  await pool.query("INSERT INTO games_platforms (game_id, platform_id) VALUES ($1, $2)", [gameId, platformId]);
}

async function getGamePlatforms(gameId) {
  const { rows } = await pool.query("SELECT * FROM games_platforms WHERE game_id = $1", [gameId]);
  return rows;
}

export { getAllPlatforms, insertPlatform, updatePlatform, getSinglePlatform, insertGamePlatform, getGamePlatforms };