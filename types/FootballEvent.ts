import mongoose from "mongoose";
import Event from "./Event";

export default interface FootballEvent extends Event {
  winner?: mongoose.ObjectId;

  teamA_score: number;
  teamB_score: number;
}
