import { Router } from "express";
import { getGenres } from "../controllers/genreController.js";

const genreRouter = Router();

genreRouter.get("/", getGenres);

export default genreRouter;