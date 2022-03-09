import { Router } from "express";
import configurationsRouter from "./routes/configurations.route";
import timeSheetRouter from "./routes/timesheets.route";

const router = Router();

router.use("/", timeSheetRouter);
router.use("/", configurationsRouter);

export default router;
