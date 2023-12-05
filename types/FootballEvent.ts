import Event from "./Event";

export default interface FootballEvent extends Event<FootballScore> {
  winner?: {
    team: string;
    participant: string;
  };
}

export interface FootballScore {
  teamA_score: number;
  teamB_score: number;
}

export const createFootballDefaultScore = (): FootballScore => ({ teamA_score: 0, teamB_score: 0 });
