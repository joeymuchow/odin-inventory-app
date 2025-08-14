import {
  getAllPlatforms,
  getSinglePlatformById,
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

async function updatePlatformGet(req, res) {
  const { id } = req.params;
  const platform = await getSinglePlatformById(id);
  res.render("updateItem", {
    title: "Update Platform",
    value: platform[0].name,
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
