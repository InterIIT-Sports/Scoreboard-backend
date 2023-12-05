import EventCatagories from "./EventCategories";

export default interface Event<T extends Score> {
  _id?: string;
  subtitle?: string;
  title: string;
  event: EventCatagories;
  isStarted?: boolean;
  startTime: number;
  endTime: number;
  teams: string[]; // list of teamIDs who are compeating
  roomID: EventCatagories; // event is the roomID for socketIO
  score?: T;
  isCompleted?: boolean;
}

export interface Score {}
