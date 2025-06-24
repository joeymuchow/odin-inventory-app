import pool from "./pool.js";

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

export { getAllDevelopers };