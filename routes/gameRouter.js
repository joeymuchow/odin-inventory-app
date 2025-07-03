import { Router } from "express";
import { getGames, newGameGet } from "../controllers/gameController.js";

const gameRouter = Router();

gameRouter.get("/", getGames);
gameRouter.get("/new", newGameGet);
// TODO: new game routes
// these are a little more complicated than the other items
// also I want the form to allow you to choose which developer, genres, and platforms for the game
// the routes will handle updating the tables based on the above entries
// the query to add the game will need to happen first so the other tables have an id to use for their queries

// TODO: update game routes
// the update shouldn't be too crazy? maybe? although updating a games developer, genre, or platform might be interesting

export default gameRouter;