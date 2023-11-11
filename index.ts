import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { config } from "dotenv";
import { Route, Get } from "tsoa";

import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { connectToDatabase } from "./utils/DatabaseUtils";
import { CorsConfig } from "./config/CorsConfig";

import swaggerConfig from "./swagger.json";

config();
connectToDatabase();

const PORT = process.env.PORT || 5000;
const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(express.json());
app.use(cors(CorsConfig));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/auth", AuthRoutes);
app.use("/admin", AdminRoutes);

const server = app.listen(PORT, () => console.log("[S] Server started at port: " + PORT));
