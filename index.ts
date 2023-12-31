import express from "express";
import cors from "cors";
import { config } from "dotenv";
import swaggerUi from "swagger-ui-express";

import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { CorsConfig } from "./config/CorsConfig";
import swaggerConfig from "./config/swagger.json";
import { createAndStartServer } from "./utils/ServerUtils";
import EventRoutes from "./routes/EventRoutes";
import path from "path";

config();

const app = express();

app.use(express.json());
app.use(cors(CorsConfig));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(express.static(path.join(__dirname, "../client/build")));

app.use((req, res, next) => {
  console.log(`${req.ip} requested: ${req.url}`);
  next();
});

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

app.use("/api/auth", AuthRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/events", EventRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

createAndStartServer(app);
// .then(() =>
//   new EventController().setWinner("657587eb472deab4723148ec", {
//     participants: [
//       { name: "karan", team: "IITGN", time: 14 },
//       { name: "something", team: "IITB", time: 12 },
//     ],
//   })
// );
// .then(() => setWinner("656f1154c223ae2deba7cc4a", "655e4dbdbddc0c9ed41ad774"));
// addEvent<ChessEvent, ChessScore>(EventCatagories.CHESS, {
//   endTime: Date.now(),
//   startTime: Date.now(),
//   event: EventCatagories.CHESS,
//   teams: ["655e4dbdbddc0c9ed41ad774", "655e4dc8992db97369908276"],
//   title: "Test football match",
// });

// toggleEventStarted("655e5cad5d79240e556d346f")
//   .then(() => getLiveEvents())
//   .then(data => console.log(data));

// getLiveEvents().then(data => console.log(data));
