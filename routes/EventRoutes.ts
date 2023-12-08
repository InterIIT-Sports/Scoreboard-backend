import * as jwt from "jsonwebtoken";
import express from "express";

import FootballRoutes from "./FootballRoutes";
import ChessRoutes from "./ChessRoutes";
import SquashMenRoutes from "./SquashMenRoutes";
import SquashWomenRoutes from "./SquashMenRoutes";
import TennisMenRoutes from "./TennisMenRoutes";
import TennisWomenRoutes from "./TennisMenRoutes";
import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { User } from "../types/User";
import { EventController } from "../controllers/EventController";
import { saveHistory } from "../utils/HistoryUtils";
import AllEvents, { AllScores } from "../types/AllEvents";
import { getEventByID } from "../utils/EventUtils";

const router = express.Router();

router.use((req: AuthenticatedRequest, res, next) => {
  // needs to be either admin or score editor
  if (req.url === "/") return next();
  if (!req.headers.authorization) return res.sendStatus(401);
  const [type, token] = req.headers.authorization.split(" ");
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
    if (error) return res.sendStatus(403);
    user = user as User;
    delete user?.iat;
    delete user?.exp;
    if (!!user) req.user = user as User;
    next();
  });
});

router.use((error: Error, _: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(error);
  res.sendStatus(500);
});

router.get("/", async (_, res) => {
  res.json(await new EventController().getAllEvents());
});

router.use("/football", FootballRoutes);
router.use("/chess", ChessRoutes);
router.use("/squashmen", SquashMenRoutes);
router.use("/squashwomen", SquashWomenRoutes);
router.use("/tennismen", TennisMenRoutes);
router.use("/tenniswomen", TennisWomenRoutes);

router.patch("/toggleLive/:id", async (req, res) => {
  await new EventController().toggleLive(req.params.id);
  res.sendStatus(204);
});

router.put("/updateScore/:id", async (req: AuthenticatedRequest, res) => {
  await saveHistory(req.params.id, (await getEventByID<AllEvents, AllScores>(req.params.id))?.score, req.body, req.user?.name as string);
  await new EventController().updateScore(req.params.id, req.body);
  res.sendStatus(204);
});

export default router;
