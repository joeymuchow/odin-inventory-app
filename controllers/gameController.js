import { getAllGames } from "../db/gameQueries.js";

async function getGames(req, res) {
  const games = await getAllGames();

  res.render("viewList",
    {
      title: "Games",
      category: "games",
      items: games
    }
  );
}

export { getGames };