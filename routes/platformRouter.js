import { Router } from "express";
import { getPlatforms, newPlatformGet, newPlatformPost } from "../controllers/platformController.js";

const platformRouter = Router();

platformRouter.get("/", getPlatforms);
platformRouter.get("/new", newPlatformGet);
platformRouter.post("/new", newPlatformPost);

export default platformRouter;