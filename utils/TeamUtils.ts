import Team from "../types/Teams";
import TeamModel from "../schemas/TeamModel";

export const addTeam = async (name: string) => {
  const team: Team = { name, medals: { gold: 0, silver: 0, bronze: 0 }, points: 0 };
  const newTeam = new TeamModel(team);
  await newTeam.save();
};

export const deleteTeam = async (id: string) => await TeamModel.findByIdAndDelete<Team>(id);

export const getAllTeams = async () => await TeamModel.find<Team>();

export const getTeamID = async (name: string) => (await TeamModel.findOne({ name }))?.toString();
