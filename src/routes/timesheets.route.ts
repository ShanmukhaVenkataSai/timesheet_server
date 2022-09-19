import { Router } from "express";
import {
  postTimeSheet,
  getTimeSheet,
} from "../controllers/timesheets.controller";

const timeSheetRouter = Router();

timeSheetRouter.post("/postTimeSheet", postTimeSheet);

// timeSheetRouter.get("/updateData", updateData);

timeSheetRouter.post("/getTimeSheet", getTimeSheet);

export default timeSheetRouter;
