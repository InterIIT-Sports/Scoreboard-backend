import mongoose from "mongoose";
import Team from "../types/Teams";
import TeamModel from "../schemas/TeamModel";

export const addTeam = async (name: string) => {
  const team: Team = { name };
  const newTeam = new TeamModel(team);
  await newTeam.save();
};

export const deleteTeam = async (id: string) => {
  await TeamModel.findByIdAndDelete(id);
};

export const getAllTeams = async () => {
  return await TeamModel.find<Team>();
};
