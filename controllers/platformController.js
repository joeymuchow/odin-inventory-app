import { getAllPlatforms, insertPlatform } from "../db/platformQueries.js";

async function getPlatforms(req, res) {
  const platforms = await getAllPlatforms();

  res.render("viewList",
    {
      title: "Platforms",
      items: platforms
    }
  );
}

function newPlatformGet(req, res) {
  res.render("newItem", {
    title: "Add Platform",
    url: "/platforms/new"
  });
}

async function newPlatformPost(req, res) {
  const { name } = req.body;
  await insertPlatform(name);
  res.redirect("/");
}

export { getPlatforms, newPlatformGet, newPlatformPost };