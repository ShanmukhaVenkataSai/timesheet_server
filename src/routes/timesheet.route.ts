import { Router } from "express";
import {
  postTimeSheet,
  getTimeSheet,
} from "../controllers/timesheet.controller";

const timeSheetRouter = Router();

timeSheetRouter.post("/postTimeSheet", postTimeSheet);

// timeSheetRouter.get("/updateData", updateData);

timeSheetRouter.get("/getTimeSheet", getTimeSheet);

export default timeSheetRouter;
