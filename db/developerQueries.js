import pool from "./pool.js";

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

async function insertDeveloper(name) {
  await pool.query("INSERT INTO developers (name) VALUES ($1)", [name]);
}

// async function getSingleDeveloper(id) {
//   const { rows } = await pool.query("SELECT * FROM developers WHERE id = $1", [id]);
//   return rows;
// }

export { getAllDevelopers, insertDeveloper };