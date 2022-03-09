import { Router } from "express";
import timeSheetRouter from "./routes/timesheet.route";

const router = Router();

router.use("/", timeSheetRouter);

export default router;
