import CalendarEvent from "@/components/calendarEvent";
import styles from "@/styles/components/Calendar.module.scss";
import dayjs from "dayjs";

const createWeekDaysList = (weekdays: string[]): JSX.Element[] => {
  return weekdays.map((day) => <li key={day}>{day}</li>);
};

const createEvents = (data: any[], date: any) => {
  const results: any[] = data[date];
  if (results) {
    return results.map((an: Activity) => <CalendarEvent activity={an} total={results.length} key={an.anime_id + date + an.status} />);
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

const createDaysRow = (data: any[], days: CalendarDay[]): JSX.Element[] => {
  return days.map((day) => (
    <div className={styles.list} key={day.date + day.dayOfMonth}>
      <div className={styles.day}>
        {dayjs(day.date).format("ddd")} <br /> {day.dayOfMonth}
      </div>
      <div className={styles.events}>{createEvents(data, day.date)}</div>
    </div>

    // <li key={day.date + day.dayOfMonth} className={!day.isCurrentMonth ? styles.calendar_day__not_current : styles.calendar_day}>
    //   <span>{day.dayOfMonth}</span>
    //   {createEvents(data, day.date)}
    // </li>
  ));
};

export { createWeekDaysList, createDaysCells, createDaysRow };
