import express from "express";
import { TeamControllers } from "../controllers/TeamController";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await new TeamControllers().getAllTeams());
}); // get all teams

router.post("/", async (req, res) => {
  res.json(await new TeamControllers().addTeam(req.body));
}); // create a team

router.delete("/:id", async (req, res) => {
  res.json(await new TeamControllers().deleteTeam(req.params.id));
}); // delete a team

export default router;
