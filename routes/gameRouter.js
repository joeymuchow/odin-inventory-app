import { Router } from "express";
import { getGames } from "../controllers/gameController.js";

const gameRouter = Router();

gameRouter.get("/", getGames);

export default gameRouter;