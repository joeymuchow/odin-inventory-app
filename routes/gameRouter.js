import { Router } from "express";
import { getGames, newGameGet, newGamePost, updateGameGet } from "../controllers/gameController.js";

const gameRouter = Router();

gameRouter.get("/", getGames);
gameRouter.get("/new", newGameGet);
gameRouter.post("/new", newGamePost);

// TODO: update game routes
// the update shouldn't be too crazy? maybe? although updating a games developer, genre, or platform might be interesting
gameRouter.get("/update", updateGameGet);

export default gameRouter;