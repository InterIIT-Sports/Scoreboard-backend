import ChessEvent, { ChessScore } from "./ChessEvent";
import FootballEvent, { FootballScore } from "./FootballEvent";

type AllEvents = FootballEvent | ChessEvent;

export type AllScores = FootballScore | ChessScore;

export default AllEvents;
