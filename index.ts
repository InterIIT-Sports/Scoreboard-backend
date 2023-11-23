import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { Server } from "socket.io";
import { config } from "dotenv";

import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { SocketServer } from "./types/SocketServer";
import { connectToDatabase } from "./utils/DatabaseUtils";
import { CorsConfig } from "./config/CorsConfig";
import swaggerConfig from "./config/swagger.json";
import { addEvent, getLiveEvents, readEvents, toggleEventStarted } from "./utils/EventUtils";
import EventCatagories from "./types/EventCategories";
import FootballEvent from "./types/FootballEvent";
import { addSocketEvents } from "./utils/SocketUtils";
import { createAndStartServer } from "./utils/ServerUtils";
import EventRoutes from "./routes/EventRoutes";

config();

const app = express();

app.use(express.json());
app.use(cors(CorsConfig));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/auth", AuthRoutes);
app.use("/admin", AdminRoutes);
app.use("/events", EventRoutes);

createAndStartServer(app);
// .then(liveEvents => createSocketForEvents(liveEvents));

// addEvent<FootballEvent>(EventCatagories.FOOTBALL, {
//   endTime: Date.now(),
//   startTime: Date.now(),
//   event: EventCatagories.FOOTBALL,
//   roomID: EventCatagories.FOOTBALL,
//   isStarted: false,
//   teamA_score: 0,
//   teamB_score: 0,
//   teams: [
//     new mongoose.Types.ObjectId("655e4dbdbddc0c9ed41ad774"),
//     new mongoose.Types.ObjectId("655e4dc8992db97369908276"),
//   ],
//   title: "Test football match",
// });

// toggleEventStarted("655e5cad5d79240e556d346f")
//   .then(() => getLiveEvents())
//   .then(data => console.log(data));

// getLiveEvents().then(data => console.log(data));
