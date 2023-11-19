import express from "express";

const router = express.Router();

router.get("/", () => {}); // get the current schedule

router.post("/", () => {}); // create a schedule entry (event)

router.patch("/:id", () => {}); // edit a schedule entry (event)

router.delete("/:id", () => {}); // delete a schedule entry (event)

export default router;
