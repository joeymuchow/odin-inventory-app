import { Router } from "express";
import { getGenres, newGenreGet, newGenrePost } from "../controllers/genreController.js";

const genreRouter = Router();

genreRouter.get("/", getGenres);
genreRouter.get("/new", newGenreGet);
genreRouter.post("/new", newGenrePost);

export default genreRouter;