import mongoose from "mongoose";

import HistoryItem from "../types/HistoryItem";
import { AllScores } from "../types/AllEvents";

const HistoryItemSchema = new mongoose.Schema<HistoryItem<AllScores>>({
  eventID: {
    type: String,
    required: true,
  },
  userName: {
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

  timestamp: {
    type: Number,
    immutable: true,
    default: () => Date.now(),
  },
});

const HistoryModel = mongoose.model("ScoreUpdateHistory", HistoryItemSchema);

export default HistoryModel;
