import { getAllGenres, insertGenre } from "../db/genreQueries.js";

async function getGenres(req, res) {
  const genres = await getAllGenres();

  res.render("viewList",
    {
      title: "Genres",
      items: genres
    }
  );
}

function newGenreGet(req, res) {
  res.render("newItem", {
    title: "Add Genre",
    url: "/genres/new"
  });
}

async function newGenrePost(req, res) {
  const { name } = req.body;
  await insertGenre(name);
  res.redirect("/");
}

export { getGenres, newGenreGet, newGenrePost };