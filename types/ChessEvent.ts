import Event from "./Event";

export default interface ChessEvent extends Event<ChessScore> {
  winner?: {
    team: string;
    participants: string[];
  };
}

export interface ChessScore {
  teamA_points: number;
  teamB_points: number;
}

export const createChessDefaultScore = (): ChessScore => ({ teamA_points: 0, teamB_points: 0 });
