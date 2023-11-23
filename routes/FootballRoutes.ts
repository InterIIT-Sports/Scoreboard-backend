import express from "express";
import { FootballController } from "../controllers/FootballController";

const router = express.Router();

router.put("/:id", async (req, res) => {
  await new FootballController().updateScore(req.params.id, req.body);
  res.sendStatus(204);
});

export default router;
