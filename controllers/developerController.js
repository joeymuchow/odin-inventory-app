import {
  getAllDevelopers,
  getSingleDeveloperById,
  insertDeveloper,
  updateDeveloper,
  deleteDeveloper,
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

async function updateDeveloperGet(req, res) {
  const { id } = req.params;
  const developer = await getSingleDeveloperById(id);
  res.render("updateItem", {
    title: "Update Developer",
    value: developer[0].name,
    url: `/developers/${id}/update`,
  });
}

async function updateDeveloperPut(req, res) {
  const { name } = req.body;
  const { id } = req.params;
  await updateDeveloper(name, id);
  res.redirect("/");
}

async function deleteDeveloperGet(req, res) {
  const { id } = req.params;
  await deleteDeveloper(id);
  res.redirect("/");
}

export {
  getDevelopers,
  newDeveloperGet,
  newDeveloperPost,
  updateDeveloperGet,
  updateDeveloperPut,
  deleteDeveloperGet,
};
