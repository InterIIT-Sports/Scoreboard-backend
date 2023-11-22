import mongoose from "mongoose";
import EventCatagories from "./EventCategories";

export default interface Event {
  _id?: string;
  title: string;
  event: EventCatagories;
  isStarted: boolean;
  startTime: Date;
  endTime: Date;
  teams: mongoose.ObjectId[]; // list of teams who are compeating
  roomID: EventCatagories; // event is the roomID for socketIO
}
