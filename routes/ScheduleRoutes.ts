import express from "express";
import { ScheduleController } from "../controllers/ScheduleController";

const router = express.Router();

router.patch("/", async (req, res) => {
  // do some shi
  res.json(await new ScheduleController().getNotCompletedEvents());
});

router.get("/", async (req, res) => {
  // send all the data
  await new ScheduleController().updateExistingEvents(req.body);
  res.sendStatus(204);
});

export default router;
