import { getAllGames, insertGame, getGame } from "../db/gameQueries.js";
import {
  getAllDevelopers,
  getSingleDeveloperByName,
  getSingleDeveloperById,
} from "../db/developerQueries.js";
import {
  getAllGenres,
  getGameGenres,
  getSingleGenre,
  insertGameGenre,
} from "../db/genreQueries.js";
import {
  getAllPlatforms,
  getGamePlatforms,
  getSinglePlatform,
  insertGamePlatform,
} from "../db/platformQueries.js";

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
  const dev = await getSingleDeveloperByName(developer);

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

async function updateGameGet(req, res) {
  const { name, id } = req.query;

  const game = await getGame(name);
  const currentDeveloper = await getSingleDeveloperById(game[0].developer_id);
  const developers = await getAllDevelopers();
  const currentGenres = await getGameGenres(game[0].id);
  const allGenres = await getAllGenres();
  const currentPlatforms = await getGamePlatforms(game[0].id);
  const allPlatforms = await getAllPlatforms();

  const idsInCurrentGenres = new Set(currentGenres.map((gameGenres) => gameGenres.genre_id));
  const genres = allGenres.map((genre) => {
    if (idsInCurrentGenres.has(genre.id)) {
      genre.checked = true;
    }
    return genre;
  });

  const idsInCurrentPlatforms = new Set(currentPlatforms.map((gamePlatforms) => gamePlatforms.platform_id));
  const platforms = allPlatforms.map((platform) => {
    if (idsInCurrentPlatforms.has(platform.id)) {
      platform.checked = true;
    }
    return platform;
  });

  res.render("updateGame", {
    title: "Update Game",
    name,
    url: `/games/${id}/update`,
    currentDeveloper: currentDeveloper[0].name,
    developers,
    genres,
    platforms,
  });
}

export { getGames, newGameGet, newGamePost, updateGameGet };
