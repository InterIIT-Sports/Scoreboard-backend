import express from "express";

const router = express.Router();

router.get("/", () => {}); // get all teams

router.post("/", () => {}); // create a team

router.delete("/:id", () => {}); // delete a team

export default router;
