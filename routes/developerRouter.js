import { Router } from "express";
import {
  getDevelopers,
  newDeveloperGet,
  newDeveloperPost,
  updateDeveloperGet,
  updateDeveloperPut,
  deleteDeveloperGet,
} from "../controllers/developerController.js";

const developerRouter = Router();

developerRouter.get("/", getDevelopers);
developerRouter.get("/new", newDeveloperGet);
developerRouter.post("/new", newDeveloperPost);
developerRouter.get("/:id/update", updateDeveloperGet);
developerRouter.put("/:id/update", updateDeveloperPut);
developerRouter.get("/:id/delete", deleteDeveloperGet);

export default developerRouter;
