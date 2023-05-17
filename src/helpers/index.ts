import { parseActivities, groupActivitiesByDate } from "./activity";
import {
  createDaysForCurrentMonth,
  createDaysForPreviousMonth,
  createDaysForNextMonth,
  getNumberOfDaysInMonth,
} from "./calendar";

const WEEK_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export {
  parseActivities,
  groupActivitiesByDate,
  createDaysForCurrentMonth,
  createDaysForPreviousMonth,
  createDaysForNextMonth,
  getNumberOfDaysInMonth,
  WEEK_NAMES,
};
