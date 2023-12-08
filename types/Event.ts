import EventCatagories from "./EventCategories";
import Participant from "./Participant";

export default interface Event<T extends Score> {
  _id?: string;
  subtitle?: string;
  title: string;
  event: EventCatagories;
  isStarted?: boolean;
  startTime: number;
  endTime: number;
  teams: string[]; // list of teamIDs who are compeating
  score?: T;
  isCompleted?: boolean;
  participants?: Participant[][];

  winner?: {
    team: string;
    participants?: Participant[];
  };
}

export interface Score {}
