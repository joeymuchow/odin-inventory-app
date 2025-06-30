import { Router } from "express";
import {
  getDevelopers,
  newDeveloperGet,
  newDeveloperPost,
  updateDeveloperGet,
  updateDeveloperPut,
} from "../controllers/developerController.js";

const developerRouter = Router();

developerRouter.get("/", getDevelopers);
developerRouter.get("/new", newDeveloperGet);
developerRouter.post("/new", newDeveloperPost);
developerRouter.get("/update", updateDeveloperGet);
developerRouter.put("/:id/update", updateDeveloperPut);

export default developerRouter;
