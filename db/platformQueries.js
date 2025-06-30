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

export { getAllPlatforms, insertPlatform, updatePlatform };