import { EVENT_TYPES } from "./constants";

export const findEventType = (format: string): IEventType => {
  const eventType = EVENT_TYPES.filter(
    (ev) => ev.name.toLowerCase() === format.toLowerCase()
  );

  return eventType[0];
};
