import CalendarEvent from "@/components/calendarEvent";
import styles from "@/styles/Calendar.module.css";

const createWeekDaysList = (weekdays: string[]): JSX.Element[] => {
  return weekdays.map((day) => <li key={day}>{day}</li>);
};

const getEventBgColor = (status: string): React.CSSProperties => {
  return {
    backgroundColor: status === "watched episode" ? "#e25b1d" : "#13be7b",
  };
};

const createEvents = (data: any[], date: any) => {
  const results: any[] = data[date];
  if (results) {
    return results.map((an: Activity) => (
      <CalendarEvent activity={an} total={results.length} key={an.anime_id + date + an.status} />
      // <a
      //   href={an.url}
      //   target="_blank"
      //   rel="noopener noreferrer"
      //   className={styles.calendar_event}
      //   style={getEventBgColor(an.status)}
      //   key={an.anime_id + date + an.status}
      // >
      //   {an.progress && `(EP ${an.progress})`} {an.anime_title}
      // </a>
    ));
  }
};

const createDaysCells = (data: any[], days: CalendarDay[]): JSX.Element[] => {
  return days.map((day) => (
    <li key={day.date + day.dayOfMonth} className={!day.isCurrentMonth ? styles.calendar_day__not_current : styles.calendar_day}>
      <span>{day.dayOfMonth}</span>
      {createEvents(data, day.date)}
    </li>
  ));
};

export { createWeekDaysList, createDaysCells };
