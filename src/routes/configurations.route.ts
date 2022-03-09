import { Router } from "express";
import {
  postConfig,
  getConfig,
} from "../controllers/configurations.controller";

const configurationsRouter = Router();

configurationsRouter.post("/postConfig", postConfig);

configurationsRouter.get("/getConfig", getConfig);

export default configurationsRouter;
