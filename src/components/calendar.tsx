/* eslint-disable react-hooks/exhaustive-deps */
import styles from "@/styles/Calendar.module.css";
import dayjs from "dayjs";
import * as React from "react";
import { GET_ACTIVITIES } from "@/queries";
import { parseActivities, groupActivitiesByDate, createDaysForCurrentMonth, createDaysForNextMonth, createDaysForPreviousMonth, getNumberOfDaysInMonth } from "@/helpers";

import { client } from "@/apolloClient";
import { useSession } from "next-auth/react";

const Calendar: React.FC<ICalendarProps> = ({ refElement, year, month }) => {
  const weekdays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const { data: session, status } = useSession();
  const [days, setDays] = React.useState<CalendarDay[]>([]);
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);

  const fetchAll = async () => {
    let hasNextPage = true;
    let allResults: any;
    let page = 1;
    let dateLess = dayjs(`${year}-${month}-${getNumberOfDaysInMonth(year, month) + 1}`).unix();
    let dateGreater = dayjs(`${year}-${month}-${1}`).unix();
    let userId = null;
    let array: Activity[] = [];

    if (session?.user) {
      userId = session.user.id;
    }
    while (hasNextPage) {
      const { data } = await client.query<any>({
        query: GET_ACTIVITIES,
        variables: { page, dateLess, dateGreater, userId },
      });

      const newArray = [...array, ...parseActivities(data)];

      array = newArray;
      hasNextPage = data.Page.pageInfo.hasNextPage;
      page++;
    }
    setLoading(false);
    allResults = groupActivitiesByDate(array);
    setData(allResults);
    //console.log(allResults);
    let currentMonthDays: CalendarDay[] = createDaysForCurrentMonth(year, month);
    let previousMonthDays: CalendarDay[] = createDaysForPreviousMonth(currentMonthDays, year, month);
    let nextMonthDays: CalendarDay[] = createDaysForNextMonth(currentMonthDays, year, month);

    setDays([...previousMonthDays, ...currentMonthDays, ...nextMonthDays]);
  };

  React.useEffect(() => {
    fetchAll();
  }, [year, month]);
  const getEventBgColor = (status: string): React.CSSProperties => {
    return {
      backgroundColor: status === "watched episode" ? "#e25b1d" : "#13be7b",
    };
  };

  const createEvents = (date: any) => {
    const results: any[] = data[date];
    if (results) {
      return results.map((an: { anime_id: any; url: string; status: string; anime_title: string; progress: string }) => (
        <a href={an.url} target="_blank" rel="noopener noreferrer" className={styles.calendar_event} style={getEventBgColor(an.status)} key={an.anime_id + date + an.status}>
          {an.progress && `(EP ${an.progress})`} {an.anime_title}
        </a>
      ));
    }
  };

  const weekNames: JSX.Element[] = weekdays.map((day) => <li key={day}>{day}</li>);

  const daysCalendar: JSX.Element[] = days.map((day) => (
    <li key={day.date + day.dayOfMonth} className={!day.isCurrentMonth ? styles.calendar_day__not_current : styles.calendar_day}>
      <span>{day.dayOfMonth}</span>
      {createEvents(day.date)}
    </li>
  ));

  return (
    <div className={styles.calendar_month} ref={refElement}>
      <ol id="days-of-week" className={styles.day_of_week}>
        {weekNames}
      </ol>

      {loading && <span className={styles.live}></span>}

      {!loading && (
        <ol id="calendar-days" className={styles.days_grid}>
          {days.length > 0 && daysCalendar}
        </ol>
      )}
    </div>
  );
};

export default Calendar;
