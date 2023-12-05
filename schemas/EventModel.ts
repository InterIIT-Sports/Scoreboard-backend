import mongoose from "mongoose";

import AllEvents from "../types/AllEvents";

const eventSchema = new mongoose.Schema<AllEvents>({
  title: { type: String, required: true },
  endTime: { type: Number, required: true },
  startTime: { type: Number, required: true },
  event: { type: String, required: true },
  isStarted: { type: Boolean, required: true },
  isCompleted: { type: Boolean, required: true },
  teams: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Teams" }],

  subtitle: String,
  score: {
    // Football
    teamA_score: Number,
    teamB_score: Number,
    // Chess
    teamA_points: Number,
    teamB_points: Number,
  },
  winner: {
    team: { type: mongoose.SchemaTypes.ObjectId, ref: "Teams" },
    participant: String,
  },
});

const EventModel = mongoose.model("Events", eventSchema);

export default EventModel;
