import { Router } from "express";
import {
  getGenres,
  newGenreGet,
  newGenrePost,
  updateGenreGet,
  updateGenrePut,
  deleteGenreGet,
} from "../controllers/genreController.js";

const genreRouter = Router();

genreRouter.get("/", getGenres);
genreRouter.get("/new", newGenreGet);
genreRouter.post("/new", newGenrePost);
genreRouter.get("/:id/update", updateGenreGet);
genreRouter.put("/:id/update", updateGenrePut);
genreRouter.get("/:id/delete", deleteGenreGet);

export default genreRouter;
