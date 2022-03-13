import { Router } from "express";
import configurationsRouter from "./routes/configurations.route";
import timeSheetRouter from "./routes/timesheets.route";
import usersRouter from "./routes/users.route";

const router = Router();

router.use("/", timeSheetRouter);
router.use("/", configurationsRouter);
router.use("/", usersRouter);

export default router;
