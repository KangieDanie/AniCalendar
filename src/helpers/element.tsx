import { Event } from "@/components";
import styles from "@/styles/components/calendar/index.module.scss";
import dayjs from "dayjs";

const createWeekDaysList = (weekdays: string[]): JSX.Element[] => {
  return weekdays.map((day) => <li key={day}>{day.substring(0, 3)}</li>);
};

const getMinHeight = (eventCount: number): string => {
  // Dynamic height calculation based on number of events
  if (eventCount === 0) return "220px";
  if (eventCount === 1) return "240px";
  if (eventCount === 2) return "280px";
  if (eventCount === 3) return "360px";
  if (eventCount === 4) return "440px";
  if (eventCount === 5) return "520px";
  // For 6+ events
  return `${Math.min(140 * eventCount + 80, 800)}px`;
};

const getGap = (eventCount: number): string => {
  // Dynamic gap calculation to optimize space
  if (eventCount === 1) return "4px";
  if (eventCount === 2) return "6px";
  if (eventCount === 3) return "6px";
  if (eventCount === 4) return "5px";
  if (eventCount === 5) return "4px";
  // For 6+ events, minimal gap
  return "3px";
};

const getCardSpan = (total: number, index: number): number => {
  // Determine how many columns a card should span
  // This creates visual variety similar to the reference image
  if (total === 1) {
    return 1; // Single event takes normal space
  }

  // For multiple events, occasionally span 2 columns for visual interest
  // Use a simple pattern: every 3rd card in position 0 or 1 spans 2 columns
  if (index % 3 === 0 && index < 2) {
    return 2;
  }

  return 1;
};

const createEvents = (data: any[], date: any) => {
  const results: any[] = data[date];
  if (results) {
    return results.map((an: Activity, index: number) => {
      const span = getCardSpan(results.length, index);
      return (
        <Event
          activity={an}
          total={results.length}
          key={`${an.anime_id}-${date}-${an.status}-${an.progress}-${index}`}
          gridColumn={span > 1 ? `span ${span}` : undefined}
        />
      );
    });
  }
};

const createDaysCells = (data: any[], days: CalendarDay[]): JSX.Element[] => {
  return days.map((day, index) => {
    const events = data[day.date];
    const hasEvents = events && events.length > 0;
    const eventCount = hasEvents ? events.length : 0;

    return (
      <li
        key={day.date + day.dayOfMonth}
        className={
          !day.isCurrentMonth
            ? styles.calendar_day__not_current
            : styles.calendar_day
        }
        style={{
          minHeight: getMinHeight(eventCount),
        }}
      >
        <span>{day.dayOfMonth}</span>
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            gap: getGap(eventCount),
            flex: 1,
          }}
        >
          {createEvents(data, day.date)}
        </div>
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

export { createDaysCells, createDaysRow, createWeekDaysList };
