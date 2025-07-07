import { getAllGames, insertGame, getGame } from "../db/gameQueries.js";
import { getAllDevelopers, getSingleDeveloper } from "../db/developerQueries.js";
import { getAllGenres, getSingleGenre, insertGameGenre } from "../db/genreQueries.js";
import { getAllPlatforms, getSinglePlatform, insertGamePlatform } from "../db/platformQueries.js";

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

async function newGamePost(req, res) {
  const { name, developer, genres, platforms } = req.body;

  // get developer id from developer name
  const dev = await getSingleDeveloper(developer);

  // insert new game
  await insertGame(name, dev[0].id);

  // get game id
  const game = await getGame(name);

  // insert genres for game
  for (const item of genres) {
    const genre = await getSingleGenre(item);
    await insertGameGenre(game[0].id, genre[0].id);
  }

  // insert platforms for game
  for (const item of platforms) {
    const platform = await getSinglePlatform(item);
    await insertGamePlatform(game[0].id, platform[0].id);
  }

  res.redirect("/");
}

export { getGames, newGameGet, newGamePost };
