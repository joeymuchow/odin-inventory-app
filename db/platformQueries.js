import pool from "./pool.js";

async function getAllPlatforms() {
  const { rows } = await pool.query("SELECT * FROM platforms");
  return rows;
}

async function insertPlatform(name) {
  await pool.query("INSERT INTO platforms (name) VALUES ($1)", [name]);
}

export { getAllPlatforms, insertPlatform };