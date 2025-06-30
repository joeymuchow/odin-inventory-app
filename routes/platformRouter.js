import { Router } from "express";
import {
  getPlatforms,
  newPlatformGet,
  newPlatformPost,
  updatePlatformGet,
  updatePlatformPut,
} from "../controllers/platformController.js";

const platformRouter = Router();

platformRouter.get("/", getPlatforms);
platformRouter.get("/new", newPlatformGet);
platformRouter.post("/new", newPlatformPost);
platformRouter.get("/update", updatePlatformGet);
platformRouter.put("/:id/update", updatePlatformPut);

export default platformRouter;
