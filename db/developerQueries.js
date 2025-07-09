import pool from "./pool.js";

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

async function insertDeveloper(name) {
  await pool.query("INSERT INTO developers (name) VALUES ($1)", [name]);
}

async function updateDeveloper(name, id) {
  await pool.query("UPDATE developers SET name = $1 WHERE id = $2", [name, id]);
}

async function getSingleDeveloperByName(name) {
  const { rows } = await pool.query("SELECT * FROM developers WHERE name = $1", [name]);
  return rows;
}

async function getSingleDeveloperById(id) {
  const { rows } = await pool.query("SELECT * FROM developers WHERE id = $1", [id]);
  return rows;
}

export { getAllDevelopers, insertDeveloper, updateDeveloper, getSingleDeveloperByName, getSingleDeveloperById };