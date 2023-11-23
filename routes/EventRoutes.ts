import * as jwt from "jsonwebtoken";
import express from "express";
import FootballRoutes from "./FootballRoutes";
import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { User } from "../types/User";

const router = express.Router();

router.use((req: AuthenticatedRequest, res, next) => {
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

router.get("/", (_, res) => {
  res.send("Hello world from Events");
});

router.use("/football", FootballRoutes);

export default router;
