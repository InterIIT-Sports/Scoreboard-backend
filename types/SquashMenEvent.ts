import Event from "./Event";

export default interface SquashMenEvent extends Event<SquashMenScore> {
  winner?: {
    team: string;
    participants: string[];
  };
}

export interface SquashMenScore {
  teamA_points: number;
  teamB_points: number;
}

export const createSquashMenDefaultScore = (): SquashMenScore => ({ teamA_points: 0, teamB_points: 0 });
