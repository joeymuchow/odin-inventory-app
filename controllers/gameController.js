import { getAllGames, insertGame, getGameByName, getGameById } from "../db/gameQueries.js";
import {
  getAllDevelopers,
  getSingleDeveloperByName,
  getSingleDeveloperById,
} from "../db/developerQueries.js";
import {
  getAllGenres,
  getGameGenres,
  getSingleGenreByName,
  getSingleGenreById,
  insertGameGenre,
} from "../db/genreQueries.js";
import {
  getAllPlatforms,
  getGamePlatforms,
  getSinglePlatformByName,
  getSinglePlatformById,
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
  const game = await getGameByName(name);

  // insert genres for game
  for (const item of genres) {
    const genre = await getSingleGenreByName(item);
    await insertGameGenre(game[0].id, genre[0].id);
  }

  // insert platforms for game
  for (const item of platforms) {
    const platform = await getSinglePlatformByName(item);
    await insertGamePlatform(game[0].id, platform[0].id);
  }

  res.redirect("/");
}

async function updateGameGet(req, res) {
  const { name, id } = req.query;

  const game = await getGameByName(name);
  const currentDeveloper = await getSingleDeveloperById(game[0].developer_id);
  const developers = await getAllDevelopers();
  const currentGenres = await getGameGenres(game[0].id);
  const allGenres = await getAllGenres();
  const currentPlatforms = await getGamePlatforms(game[0].id);
  const allPlatforms = await getAllPlatforms();

  // find the genres the game has and set them to be checked on the form
  const idsInCurrentGenres = new Set(currentGenres.map((gameGenres) => gameGenres.genre_id));
  const genres = allGenres.map((genre) => {
    if (idsInCurrentGenres.has(genre.id)) {
      genre.checked = true;
    }
    return genre;
  });

  // find the platforms the game has and set them to be checked on the form
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

// TODO
// updateGamePut
// check if anything is different from what already exists? this could be a lot of checks
// update any changes and delete rows in games_genres or games_platforms that were unchecked
async function updateGamePut(req, res) {
  const { name, developer, genres, platforms } = req.body;
  const { id } = req.params;
  const game = await getGameById(id);
  // get genres for game
  const currentGenreIds = await getGameGenres(id);
  const currentGenres = currentGenreIds.map(async (value) => {
    const genre = await getSingleGenreById(value.genre_id);
    return genre.name;
  });

  //get platforms for game
  const currentPlatformIds = await getGamePlatforms(id);
  const currentPlatforms = currentPlatformIds.map(async (value) => {
    const platform = await getSinglePlatformById(value.platform_id);
    return platform.name;
  });
  
  // check for differences with name and update if diff

  // check for differences with developer and update if diff

  // check for differences with genre

  // create and delete rows from games_genres to match new setup

  // check for differences with platforms

  // create and delete rows from games_platforms to match new setup

  res.redirect("/");
}

export { getGames, newGameGet, newGamePost, updateGameGet, updateGamePut };
