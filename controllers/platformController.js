import {
  getAllPlatforms,
  insertPlatform,
  updatePlatform,
} from "../db/platformQueries.js";

async function getPlatforms(req, res) {
  const platforms = await getAllPlatforms();

  res.render("viewList", {
    title: "Platforms",
    category: "platforms",
    items: platforms,
  });
}

function newPlatformGet(req, res) {
  res.render("newItem", {
    title: "Add Platform",
    url: "/platforms/new",
  });
}

async function newPlatformPost(req, res) {
  const { name } = req.body;
  await insertPlatform(name);
  res.redirect("/");
}

function updatePlatformGet(req, res) {
  const { name, id } = req.query;
  console.log(name, id);
  res.render("updateItem", {
    title: "Update Platform",
    value: name,
    url: `/platforms/${id}/update`,
  });
}

async function updatePlatformPut(req, res) {
  const { name } = req.body;
  const { id } = req.params;
  await updatePlatform(name, id);
  res.redirect("/");
}

export {
  getPlatforms,
  newPlatformGet,
  newPlatformPost,
  updatePlatformGet,
  updatePlatformPut,
};
