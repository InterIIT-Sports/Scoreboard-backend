import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { connectToDatabase } from "./utils/DatabaseUtils";
import { CorsConfig } from "./config/CorsConfig";

config();
connectToDatabase();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors(CorsConfig));

app.get("/", (req, res) => {
  res.send("Hello");
});

const server = app.listen(PORT, () => console.log("[S] Server started at port: " + PORT));
