import { Router } from "express";
import { getDevelopers, newDeveloperGet, newDeveloperPost } from "../controllers/developerController.js";

const developerRouter = Router();

developerRouter.get("/", getDevelopers);
developerRouter.get("/new", newDeveloperGet);
developerRouter.post("/new", newDeveloperPost);

export default developerRouter;