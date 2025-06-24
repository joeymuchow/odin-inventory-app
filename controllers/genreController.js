import { getAllGenres } from "../db/genreQueries.js";

async function getGenres(req, res) {
  const genres = await getAllGenres();

  console.log(genres);
  res.send(genres);
}

export { getGenres };