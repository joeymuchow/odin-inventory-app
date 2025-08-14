import {
  getAllGenres,
  getSingleGenreById,
  insertGenre,
  updateGenre,
  deleteGameGenreByGenre,
  deleteGenre,
} from "../db/genreQueries.js";

async function getGenres(req, res) {
  const genres = await getAllGenres();

  res.render("viewList", {
    title: "Genres",
    category: "genres",
    items: genres,
  });
}

function newGenreGet(req, res) {
  res.render("newItem", {
    title: "Add Genre",
    url: "/genres/new",
  });
}

async function newGenrePost(req, res) {
  const { name } = req.body;
  await insertGenre(name);
  res.redirect("/");
}

async function updateGenreGet(req, res) {
  const { id } = req.params;
  const genre = await getSingleGenreById(id);
  res.render("updateItem", {
    title: "Update Genre",
    value: genre[0].name,
    url: `/genres/${id}/update`,
  });
}

async function updateGenrePut(req, res) {
  const { name } = req.body;
  const { id } = req.params;
  await updateGenre(name, id);
  res.redirect("/");
}

async function deleteGenreGet(req, res) {
  const { id } = req.params;
  await deleteGameGenreByGenre(id);
  await deleteGenre(id);
  res.redirect("/");
}

export {
  getGenres,
  newGenreGet,
  newGenrePost,
  updateGenreGet,
  updateGenrePut,
  deleteGenreGet,
};
