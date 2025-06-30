import {
  getAllDevelopers,
  insertDeveloper,
  updateDeveloper,
} from "../db/developerQueries.js";

async function getDevelopers(req, res) {
  const developers = await getAllDevelopers();

  res.render("viewList", {
    title: "Developers",
    category: "developers",
    items: developers,
  });
}

function newDeveloperGet(req, res) {
  res.render("newItem", {
    title: "Add Developer",
    url: "/developers/new",
  });
}

async function newDeveloperPost(req, res) {
  const { name } = req.body;
  await insertDeveloper(name);
  res.redirect("/");
}

function updateDeveloperGet(req, res) {
  const { name, id } = req.query;
  console.log(name, id);
  res.render("updateItem", {
    title: "Update Developer",
    value: name,
    url: `/developers/${id}/update`,
  });
}

async function updateDeveloperPut(req, res) {
  const { name } = req.body;
  const { id } = req.params;
  await updateDeveloper(name, id);
  res.redirect("/");
}

export {
  getDevelopers,
  newDeveloperGet,
  newDeveloperPost,
  updateDeveloperGet,
  updateDeveloperPut,
};
