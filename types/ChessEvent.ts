import Event from "./Event";

export default interface ChessEvent extends Event<ChessScore> {
  winner?: string;
  score: ChessScore;
}

export interface ChessScore {
  teamA_score: number;
  teamB_score: number;
}
