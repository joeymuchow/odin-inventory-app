import { Router } from "express";
import { getDevelopers } from "../controllers/developerController.js";

const developerRouter = Router();

developerRouter.get("/", getDevelopers);

export default developerRouter;