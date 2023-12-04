import HistoryModel from "../schemas/HistoryModel";
import { Score } from "../types/Event";
import HistoryItem from "../types/HistoryItem";

export const saveHistory = async <T extends Score>(eventID: string, prevScore: T, currentScore: T, userName: string) => {
  const historyItem: HistoryItem<T> = { eventID, userName, prevScore, currentScore };
  const newHistoryItem = new HistoryModel(historyItem);

  return await newHistoryItem.save();
};
