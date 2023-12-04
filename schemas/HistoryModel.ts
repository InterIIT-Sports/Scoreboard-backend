import mongoose from "mongoose";
import HistoryItem from "../types/HistoryItem";

const HistoryItemSchema = new mongoose.Schema<HistoryItem<any>>({
  eventID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },

  prevScore: {
    // Football
    teamA_score: Number,
    teamB_score: Number,
  },
  currentScore: {
    // Football
    teamA_score: Number,
    teamB_score: Number,
  },
});
