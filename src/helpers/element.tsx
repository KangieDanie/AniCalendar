import { Event } from "@/components";
import styles from "@/styles/components/calendar/index.module.scss";
import dayjs from "dayjs";

const createWeekDaysList = (weekdays: string[]): JSX.Element[] => {
  return weekdays.map((day) => (
    <div className={styles["test-day-top"]} key={day}>
      <li>{day}</li>
    </div>
  ));
};

const createEvents = (data: any[], date: any) => {
  const results: any[] = data[date];
  if (results) {
    return results.map((an: Activity) => (
      <Event
        activity={an}
        total={results.length}
        key={an.anime_id + date + an.status}
      />
    ));
  }
};

const checkIfDateHasEvents = (data: any[], date: any) => {
  const results: any[] = data[date];
  if (results) {
    return results;
  } else return undefined;
};

const createDaysCells = (data: any[], days: CalendarDay[]): JSX.Element[] => {
  return days.map((day) => {
    const results = checkIfDateHasEvents(data, day.date);
    return (
      <li
        key={day.date + day.dayOfMonth}
        className={`${
          !day.isCurrentMonth
            ? styles.calendar_day__not_current
            : getClassByEventSize(data[day.date as any])
        } ${results ? styles.calendar_with_events : ""} ${
          results ? styles.calendar_with_events : ""
        }`}
        style={{
          backgroundImage:
            data[day.date as any] && data[day.date as any].length === 1
              ? `url(${data[day.date as any][0].coverImage.large})`
              : "",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <svg className={styles.svgCornerTL} id="svg4" viewBox="0 0 50 50">
          <path id="path1" d="M0 50L50 50L0 0" />
        </svg>
        <span>{day.dayOfMonth}</span>
        {createEvents(data, day.date)}
      </li>
    );
  });
};

const createDaysRow = (data: any[], days: CalendarDay[]): JSX.Element[] => {
  return days.map((day) => (
    <div className={styles.list} key={day.date + day.dayOfMonth}>
      <div className={styles.day}>
        {dayjs(day.date).format("ddd")} <br /> {day.dayOfMonth}
      </div>
      <div className={styles.events}>{createEvents(data, day.date)}</div>
    </div>
  ));
};

const getClassByEventSize = (events: any): string => {
  if (events) {
    if (events.length === 1) return styles["calendar-day-single-event"];
    else if (events.length === 2) return styles["calendar-day-two-event"];
    else if (events.length === 3) return styles["calendar-day-three-event"];
    else if (events.length === 4) return styles["calendar-day-three-event"];
  }

  return styles["calendar_day"];
};

export { createWeekDaysList, createDaysCells, createDaysRow };
