import { Router } from "express";
import { body, oneOf } from "express-validator";
import {
  getGames,
  newGameGet,
  newGamePost,
  updateGameGet,
  updateGamePut,
} from "../controllers/gameController.js";

const gameRouter = Router();
const validateGenresAndPlatforms = [
  body("genres")
    .notEmpty()
    .withMessage("At least one genre must be selected."),
  body("platforms")
    .notEmpty()
    .withMessage("At least one platform must be selected."),
];

gameRouter.get("/", getGames);
gameRouter.get("/new", newGameGet);
gameRouter.post(
  "/new",
  validateGenresAndPlatforms,
  newGamePost
);

// update game routes
gameRouter.get("/:id/update", updateGameGet);
gameRouter.put(
  "/:id/update",
  validateGenresAndPlatforms,
  updateGamePut
);

export default gameRouter;
