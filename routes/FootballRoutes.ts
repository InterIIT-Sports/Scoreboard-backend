import express from "express";
import { FootballController } from "../controllers/FootballController";
import { saveHistory } from "../utils/HistoryUtils";
import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { getEventByID } from "../utils/EventUtils";
import FootballEvent, { FootballScore } from "../types/FootballEvent";

const router = express.Router();

router.put("/:id", async (req: AuthenticatedRequest, res) => {
  await saveHistory(req.params.id, (await getEventByID<FootballEvent, FootballScore>(req.params.id))?.score, req.body, req.user?.name as string);
  await new FootballController().updateScore(req.params.id, req.body);
  res.sendStatus(204);
});

export default router;
