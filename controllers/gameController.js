import { getAllGames } from "../db/gameQueries.js";
import { getAllDevelopers } from "../db/developerQueries.js";
import { getAllGenres } from "../db/genreQueries.js";
import { getAllPlatforms } from "../db/platformQueries.js";

async function getGames(req, res) {
  const games = await getAllGames();

  res.render("viewList", {
    title: "Games",
    category: "games",
    items: games,
  });
}

async function newGameGet(req, res) {
  const developers = await getAllDevelopers();
  const genres = await getAllGenres();
  const platforms = await getAllPlatforms();

  res.render("newGame", {
    title: "New Game",
    url: "/games/new",
    developers: developers,
    genres: genres,
    platforms: platforms,
  });
}

export { getGames, newGameGet };
