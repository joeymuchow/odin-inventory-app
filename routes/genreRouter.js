import { Router } from "express";
import {
  getGenres,
  newGenreGet,
  newGenrePost,
  updateGenreGet,
  updateGenrePut,
} from "../controllers/genreController.js";

const genreRouter = Router();

genreRouter.get("/", getGenres);
genreRouter.get("/new", newGenreGet);
genreRouter.post("/new", newGenrePost);
genreRouter.get("/update", updateGenreGet);
genreRouter.put("/:id/update", updateGenrePut);

export default genreRouter;
