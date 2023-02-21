import { parseActivities, groupActivitiesByDate } from "./activity";
import {
  createDaysForCurrentMonth,
  createDaysForPreviousMonth,
  createDaysForNextMonth,
  getNumberOfDaysInMonth,
} from "./calendar";

const WEEK_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export {
  parseActivities,
  groupActivitiesByDate,
  createDaysForCurrentMonth,
  createDaysForPreviousMonth,
  createDaysForNextMonth,
  getNumberOfDaysInMonth,
  WEEK_NAMES,
};
