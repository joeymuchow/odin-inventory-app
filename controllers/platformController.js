import { getAllPlatforms } from "../db/platformQueries.js";

async function getPlatforms(req, res) {
  const platforms = await getAllPlatforms();

  console.log(platforms);
  res.send(platforms);
}

export { getPlatforms };