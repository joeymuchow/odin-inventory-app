import {
  getAllGames,
  insertGame,
  getGameByName,
  getGameById,
  updateGameName,
  updateGameDeveloper,
} from "../db/gameQueries.js";
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
  deleteGameGenre,
} from "../db/genreQueries.js";
import {
  getAllPlatforms,
  getGamePlatforms,
  getSinglePlatformByName,
  getSinglePlatformById,
  insertGamePlatform,
  deleteGamePlatforms,
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
  const idsInCurrentGenres = new Set(
    currentGenres.map((gameGenres) => gameGenres.genre_id)
  );
  const genres = allGenres.map((genre) => {
    if (idsInCurrentGenres.has(genre.id)) {
      genre.checked = true;
    }
    return genre;
  });

  // find the platforms the game has and set them to be checked on the form
  const idsInCurrentPlatforms = new Set(
    currentPlatforms.map((gamePlatforms) => gamePlatforms.platform_id)
  );
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
  const newGenres = typeof genres === "string" ? [genres] : genres;
  const newPlatforms = typeof platforms === "string" ? [platforms] : platforms;
  const game = await getGameById(id);
  const currentDeveloper = await getSingleDeveloperByName(developer);
  // get genres for game
  const currentGenreIds = await getGameGenres(id);
  const currentGenres = await Promise.all(currentGenreIds.map(async (value) => {
    const result = await getSingleGenreById(value.genre_id);
    return result[0].name;
  })).then((data) => {
    console.log(data);
    return data;
  });

  //get platforms for game
  const currentPlatformIds = await getGamePlatforms(id);
  const currentPlatforms = await Promise.all(currentPlatformIds.map(async (value) => {
    const result = await getSinglePlatformById(value.platform_id);
    return result[0].name;
  })).then((data) => {
    console.log(data);
    return data;
  });

  if (name !== game.name) {
    await updateGameName(name, id);
  }

  if (developer !== currentDeveloper.name) {
    const dev = await getSingleDeveloperByName(developer);
    await updateGameDeveloper(dev[0].id, id);
  }

  // check for differences with genre
  const genreDiffs = checkDifferences(currentGenres, newGenres);
  if (genreDiffs.changed) {
    // create and delete rows from games_genres to match new setup
    if (genreDiffs.itemsToAdd) {
      for (const genre of genreDiffs.itemsToAdd) {
        const genreRow = await getSingleGenreByName(genre);
        await insertGameGenre(id, genreRow[0].id);
      }
    }

    if (genreDiffs.itemsToDelete) {
      for (const genre of genreDiffs.itemsToDelete) {
        const genreRow = await getSingleGenreByName(genre);
        await deleteGameGenre(id, genreRow[0].id);
      }
    }
  }

  // check for differences with platforms
  const platformDiffs = checkDifferences(currentPlatforms, newPlatforms);
  if (platformDiffs.changed) {
    // create and delete rows from games_platforms to match new setup
    if (platformDiffs.itemsToAdd) {
      for (const platform of platformDiffs.itemsToAdd) {
        const platformRow = await getSinglePlatformByName(platform);
        await insertGamePlatform(id, platformRow[0].id);
      }
    }

    if (platformDiffs.itemsToDelete) {
      for (const platform of platformDiffs.itemsToDelete) {
        const platformRow = await getSinglePlatformByName(platform);
        await deleteGamePlatforms(id, platformRow[0].id);
      }
    }
  }

  res.redirect("/");
}

function checkDifferences(oldItems, newItems) {
  const result = {
    changed: false,
    itemsToDelete: [],
    itemsToAdd: [],
  };

  const toDelete = oldItems.filter((value) => {
    return !newItems.includes(value);
  });

  const toAdd = newItems.filter((value) => {
    return !oldItems.includes(value);
  });

  if (toDelete || toAdd) {
    result.changed = true;
    result.itemsToDelete.push(...toDelete);
    result.itemsToAdd.push(...toAdd);
  }

  return result;
}

export { getGames, newGameGet, newGamePost, updateGameGet, updateGamePut };
