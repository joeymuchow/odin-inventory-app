import { getAllGenres, insertGenre, updateGenre } from "../db/genreQueries.js";

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

function updateGenreGet(req, res) {
  const { name, id } = req.query;
  res.render("updateItem", {
    title: "Update Genre",
    value: name,
    url: `/genres/${id}/update`,
  });
}

async function updateGenrePut(req, res) {
  const { name } = req.body;
  const { id } = req.params;
  await updateGenre(name, id);
  res.redirect("/");
}

export { getGenres, newGenreGet, newGenrePost, updateGenreGet, updateGenrePut };
