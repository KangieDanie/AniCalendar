import { parseActivities, groupActivitiesByDate } from "./activity";
import {
  createDaysForCurrentMonth,
  createDaysForPreviousMonth,
  createDaysForNextMonth,
  getNumberOfDaysInMonth,
} from "./calendar";

const WEEK_NAMES = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

export {
  parseActivities,
  groupActivitiesByDate,
  createDaysForCurrentMonth,
  createDaysForPreviousMonth,
  createDaysForNextMonth,
  getNumberOfDaysInMonth,
  WEEK_NAMES,
};
