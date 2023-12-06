import Event from "./Event";
import AthleticsEventTypes from "./AthleticsEventTypes";

export default interface AthleticsEvent extends Event<AthleticsEventScore> {
  athleticsEventType: AthleticsEventTypes;
  sortAscending: boolean;
}

export interface AthleticsEventScore {}

export const createAthleticsDefaultScore = () => {};
