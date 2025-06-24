import { getAllDevelopers } from "../db/developerQueries.js";

async function getDevelopers(req, res) {
  const developers = await getAllDevelopers();

  console.log(developers);
  res.send(developers);
}

export { getDevelopers };