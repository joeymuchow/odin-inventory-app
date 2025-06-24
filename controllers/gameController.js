import { getAllGames } from "../db/gameQueries.js";

async function getGames(req, res) {
  const games = await getAllGames();

  console.log(games);
  res.send(games);
}

export { getGames };