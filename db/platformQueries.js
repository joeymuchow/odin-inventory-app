import pool from "./pool.js";

async function getAllPlatforms() {
  const { rows } = await pool.query("SELECT * FROM platforms");
  return rows;
}

export { getAllPlatforms };