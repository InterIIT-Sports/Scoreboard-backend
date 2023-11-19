import { Schema, model } from "mongoose";
import Team from "../types/Teams";

const teamSchema = new Schema<Team>({
  name: {
    type: String,
    required: true,
  },
});

const TeamModel = model<Team>("Teams", teamSchema);
export default TeamModel;
