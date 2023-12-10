import HistoryModel from "../schemas/HistoryModel";
import HistoryItem from "../types/HistoryItem";
import { Score } from "../types/Event";

export const getScoreChangeLogs = async () => await HistoryModel.find();

export const saveHistory = async <T extends Score>(eventID: string, prevScore: T, currentScore: T, userName: string) => {
  const historyItem: HistoryItem<T> = { eventID, userName, prevScore, currentScore };
  const newHistoryItem = new HistoryModel(historyItem);

  return await newHistoryItem.save();
};
