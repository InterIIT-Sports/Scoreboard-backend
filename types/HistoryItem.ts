import { Score } from "./Event";

export default interface HistoryItem<T extends Score> {
  eventID: string;
  userID: string;
  prevScore: T;
  currentScore: T;
}
