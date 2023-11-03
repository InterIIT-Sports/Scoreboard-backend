import * as jwt from "jsonwebtoken";
import express from "express";
import {
  createUserWithUsernameAndPassword,
  deleteUser,
  getAccessToken,
  getRefreshToken,
  loginWithUsernameAndPassword,
  revokeRefreshToken,
} from "../utils/AuthUtils";
import RefreshTokenModel from "../schemas/RefreshTokenModel";
import { User } from "../types/User";
import { UserRole } from "../types/UserRole";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Hello world from auth");
});

router.post("/loginWithUsernameAndPassword", async (req, res) => {
  const { username, password } = req.body;

  try {
    const tokens = await loginWithUsernameAndPassword(username, password);
    res.json(tokens);
  } catch (error: any) {
    res.status(403);
    res.send({ message: error.message });
  }
});

// This will return the access token
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

router.post("/accessToken", async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken == null) return res.sendStatus(401);
  const tokenExists = await RefreshTokenModel.findOne({ refreshToken });

  if (!tokenExists) return res.sendStatus(403);

  jwt.verify(refreshToken as string, process.env.REFRESH_TOKEN_SECRET as string, async (err, user) => {
    if (err) return res.sendStatus(403);
    user = user as User;
    delete user?.iat;
    const accessToken = getAccessToken(user as User);
    const newRefreshToken = await getRefreshToken(user as User);
    await revokeRefreshToken({ refreshToken });
    res.json({ ...accessToken, refreshToken: newRefreshToken.refreshToken });
  });
});

router.delete("/logout", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);
  revokeRefreshToken({ refreshToken });
  res.sendStatus(204);
});

// protected route
router.delete("/user", (req, res) => {
  if (!req.headers.authorization) return res.sendStatus(401);

  const [type, token] = req.headers.authorization.split(" ");
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (error, user) => {
    if (error) return res.sendStatus(403);
    // req.user = user as User;
    const { username } = req.body;
    user = user as User;

    console.log(user);

    if (user.role === UserRole.ADMIN) {
      await deleteUser(username);

      res.sendStatus(204);
    } else {
      res.sendStatus(403);
    }
  });
});

export default router;
