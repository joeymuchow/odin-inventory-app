import { Router } from "express";
import {
  getPlatforms,
  newPlatformGet,
  newPlatformPost,
  updatePlatformGet,
  updatePlatformPut,
  deletePlatformGet,
} from "../controllers/platformController.js";

const platformRouter = Router();

platformRouter.get("/", getPlatforms);
platformRouter.get("/new", newPlatformGet);
platformRouter.post("/new", newPlatformPost);
platformRouter.get("/:id/update", updatePlatformGet);
platformRouter.put("/:id/update", updatePlatformPut);
platformRouter.get("/:id/delete", deletePlatformGet);

export default platformRouter;
