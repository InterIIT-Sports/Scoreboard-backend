import * as jwt from "jsonwebtoken";
import express from "express";
import { createUserWithUsernameAndPassword, deleteUser } from "../utils/AuthUtils";
import { User } from "../types/User";
import { UserRole } from "../types/UserRole";
import AuthenticatedRequest from "../requests/AuthenticatedRequest";

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
    if (user.role !== UserRole.ADMIN) res.sendStatus(403);
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
  await deleteUser(username);
  res.sendStatus(204);
});

router.post("/createUserWithUsernameAndPassword", async (req, res) => {
  const { name, username, password, role } = req.body;
  try {
    const tokens = await createUserWithUsernameAndPassword(name, username, password, role);
    res.json(tokens);
  } catch (error: any) {
    res.status(403);
    res.send({ message: error.message });
  }
});

export default router;
