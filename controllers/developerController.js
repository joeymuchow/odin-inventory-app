import { getAllDevelopers, insertDeveloper } from "../db/developerQueries.js";

async function getDevelopers(req, res) {
  const developers = await getAllDevelopers();

  res.render("viewList",
    {
      title: "Developers",
      items: developers
    }
  );
}

function newDeveloperGet(req, res) {
  res.render("newItem", {
    title: "Add Developer",
    url: "/developers/new"
  });
}

async function newDeveloperPost(req, res) {
  const { name } = req.body;
  await insertDeveloper(name);
  res.redirect("/");
}

export { getDevelopers, newDeveloperGet, newDeveloperPost };