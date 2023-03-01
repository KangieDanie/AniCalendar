/* eslint-disable react-hooks/exhaustive-deps */
import styles from "@/styles/components/calendar/index.module.scss";
import dayjs from "dayjs";
import * as React from "react";
import { GET_ACTIVITIES } from "@/queries";
import {
  parseActivities,
  groupActivitiesByDate,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  getNumberOfDaysInMonth,
  WEEK_NAMES,
} from "@/helpers";

import { client } from "@/apolloClient";
import { useSession } from "next-auth/react";
import {
  createDaysCells,
  createDaysRow,
  createWeekDaysList,
} from "@/helpers/element";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";
import useCheckTabletScreen from "@/hooks/useCheckTabletScreen";
import useLocalStorageState from "use-local-storage-state";

const Calendar: React.FC<ICalendarProps> = ({ refElement, year, month }) => {
  const { data: session } = useSession();
  const [weekdays] = React.useState<string[]>(WEEK_NAMES);
  const [days, setDays] = React.useState<CalendarDay[]>([]);
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);
  const isMobile = useCheckMobileScreen();
  const isTablet = useCheckTabletScreen();
  const [settings, setSettings]: any = useLocalStorageState("settings");

  // TODO: change to hook
  const fetchAll = async () => {
    setData([]);
    let hasNextPage = true;
    let allResults: any;
    let page = 1;
    let dateLess = dayjs(
      `${year}-${month}-${getNumberOfDaysInMonth(year, month) + 1}`
    ).unix();
    let dateGreater = dayjs(`${year}-${month}-${1}`).unix();
    let userId = null;
    let array: Activity[] = [];

    if (session?.user) {
      userId = session.user.id;
    }
    while (hasNextPage) {
      const { data } = await client.query<any>({
        query: GET_ACTIVITIES(settings.filters["type"]),
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

    if (isMobile || isTablet) {
      let currentMonthDays: CalendarDay[] = createDaysForCurrentMonth(
        year,
        month
      );

      setDays([...currentMonthDays]);
    } else {
      let currentMonthDays: CalendarDay[] = createDaysForCurrentMonth(
        year,
        month
      );
      let previousMonthDays: CalendarDay[] = createDaysForPreviousMonth(
        currentMonthDays,
        year,
        month
      );
      let nextMonthDays: CalendarDay[] = createDaysForNextMonth(
        currentMonthDays,
        year,
        month
      );

      setDays([...previousMonthDays, ...currentMonthDays, ...nextMonthDays]);
    }
  };

  React.useEffect(() => {
    fetchAll();
  }, [year, month, settings]);

  return (
    <>
      <div className={styles.calendar_month} ref={refElement}>
        <ol id="days-of-week" className={styles.day_of_week}>
          {createWeekDaysList(weekdays)}
        </ol>

        {loading && <span className={styles.live}></span>}

        {!loading && (
          <ol id="calendar-days" className={styles.days_grid}>
            {days.length > 0 && createDaysCells(data, days)}
          </ol>
        )}
      </div>
      <div className={styles.mobile}>
        {days.length > 0 && createDaysRow(data, days)}
      </div>
    </>
  );
};

export default Calendar;
