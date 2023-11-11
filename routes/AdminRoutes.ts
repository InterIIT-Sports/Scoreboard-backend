import * as jwt from "jsonwebtoken";
import express from "express";
import { deleteUser } from "../utils/AuthUtils";
import { User } from "../types/User";
import { UserRole } from "../types/UserRole";
import AuthenticatedRequest from "../types/AuthenticatedRequest";

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
  res.send("Hello world from Admin");
});

router.delete("/user", async (req: AuthenticatedRequest, res) => {
  const { username } = req.body;

  if (!!req.user && req.user.role === UserRole.ADMIN) {
    await deleteUser(username);

    res.sendStatus(204);
  } else {
    res.sendStatus(403);
  }
});

export default router;
