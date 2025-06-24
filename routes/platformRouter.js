import { Router } from "express";
import { getPlatforms } from "../controllers/platformController.js";

const platformRouter = Router();

platformRouter.get("/", getPlatforms);

export default platformRouter;