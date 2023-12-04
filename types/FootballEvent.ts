import Event from "./Event";

export default interface FootballEvent extends Event<FootballScore> {
  winner?: string;
  score: FootballScore;
}

export interface FootballScore {
  teamA_score: number;
  teamB_score: number;
}
