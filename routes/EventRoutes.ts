import express from "express";
import FootballRoutes from "./FootballRoutes";

const router = express.Router();

router.use("/football", FootballRoutes);

export default router;
