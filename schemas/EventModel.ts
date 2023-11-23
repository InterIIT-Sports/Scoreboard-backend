import mongoose from "mongoose";
import AllEvents from "../types/AllEvents";

const eventSchema = new mongoose.Schema<AllEvents>({
  title: { type: String, required: true },
  endTime: { type: Number, required: true },
  startTime: { type: Number, required: true },
  event: { type: String, required: true },
  isStarted: { type: Boolean, required: true },
  roomID: { type: String, required: true },
  teams: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Teams" }],

  // Football
  teamA_score: Number,
  teamB_score: Number,
  winner: mongoose.SchemaTypes.ObjectId,
});

const EventModel = mongoose.model("Events", eventSchema);

export default EventModel;
