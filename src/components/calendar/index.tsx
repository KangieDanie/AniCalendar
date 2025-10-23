/* eslint-disable react-hooks/exhaustive-deps */
import {
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  getNumberOfDaysInMonth,
  groupActivitiesByDate,
  parseActivities,
  WEEK_NAMES,
} from "@/helpers";
import { GET_ACTIVITIES, GET_AIRING_SCHEDULE } from "@/queries";
import styles from "@/styles/components/calendar/index.module.scss";
import dayjs from "dayjs";
import * as React from "react";

import { client } from "@/apolloClient";
import {
  createDaysCells,
  createDaysRow,
  createWeekDaysList,
} from "@/helpers/element";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";
import useCheckTabletScreen from "@/hooks/useCheckTabletScreen";
import { useSession } from "next-auth/react";
import useLocalStorageState from "use-local-storage-state";

const Calendar: React.FC<ICalendarProps> = ({ refElement, year, month }) => {
  const { data: session } = useSession();
  const [weekdays] = React.useState<string[]>(WEEK_NAMES);
  const [days, setDays] = React.useState<CalendarDay[]>([]);
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);
  const [airingActivities, setAiringActivities] = React.useState<Activity[]>(
    []
  );
  const isMobile = useCheckMobileScreen();
  const isTablet = useCheckTabletScreen();
  const [settings]: any = useLocalStorageState("settings", {
    defaultValue: {
      colors: {
        completed: "#ffa500",
        first_episode: "#800080",
        upcoming_episode: "#6495ed",
        airing: "#02a9ff",
      },
      filters: {
        type: "anime",
        show_upcoming_ep: false,
        show_only_first: false,
        show_completed: true,
        show_airing: true,
      },
      cardSettings: {
        sizeMode: "auto",
        manualSize: "medium",
      },
    },
  });

  // Fetch airing schedule once when component mounts
  const fetchAiringSchedule = async () => {
    if (!settings || !settings.filters) return;
    if (!session?.user) return;

    const userId = session.user.id;

    if (
      settings.filters["show_airing"] &&
      (settings.filters["type"] === "anime" ||
        settings.filters["type"] === "animemanga")
    ) {
      console.log("🔄 Fetching airing schedule ONCE for userId:", userId);
      let airingPage = 1;
      let hasNextAiringPage = true;
      let airingArray: Activity[] = [];

      try {
        while (hasNextAiringPage) {
          const { data: airingData } = await client.query<any>({
            query: GET_AIRING_SCHEDULE(),
            variables: {
              page: airingPage,
              userId,
            },
            fetchPolicy: "network-only", // Always fetch fresh data
          });

          if (airingData?.Page?.mediaList) {
            const activities = airingData.Page.mediaList
              .filter((item: any) => item.media?.nextAiringEpisode)
              .map((item: any) => {
                const nextAiring = item.media.nextAiringEpisode;
                const airingDate = dayjs.unix(nextAiring.airingAt);
                const airingTime = airingDate.format("HH:mm");
                const formattedDate = airingDate.format("YYYY-MM-DD");

                console.log(
                  `📅 ${item.media.title.userPreferred} airs on: ${formattedDate} at ${airingTime}`
                );

                return {
                  date: formattedDate,
                  url: `https://anilist.co/anime/${item.media.id}`,
                  anime_title: item.media.title.userPreferred,
                  anime_id: item.media.id,
                  user: session?.user?.name || "",
                  status: "airing",
                  progress: `Episode ${nextAiring.episode} • ${airingTime}`,
                  banner: item.media.bannerImage,
                  coverImage: {
                    extraLarge: item.media.coverImage.large,
                    large: item.media.coverImage.large,
                    medium: item.media.coverImage.large,
                    color: item.media.coverImage.color || "#000000",
                  },
                  format: item.media.format,
                  isAiring: true,
                };
              });

            airingArray = [...airingArray, ...activities];
          }

          hasNextAiringPage = airingData.Page.pageInfo.hasNextPage;
          airingPage++;
        }

        console.log("✅ Total airing activities cached:", airingArray.length);
        setAiringActivities(airingArray);
      } catch (error) {
        console.error("Error fetching airing schedule:", error);
      }
    }
  };

  // TODO: change to hook
  const fetchAll = async () => {
    if (!settings || !settings.filters) return;

    setLoading(true);
    setData([]);

    let hasNextPage = true;
    let allResults: any;
    let page = 1;

    // Calculate date range including visible days from previous/next months
    const firstDayOfMonth = dayjs(`${year}-${month}-01`);
    const lastDayOfMonth = firstDayOfMonth.add(
      getNumberOfDaysInMonth(year, month),
      "day"
    );

    // Get the first Monday of the calendar view (could be in previous month)
    const firstVisibleDay = firstDayOfMonth.subtract(
      firstDayOfMonth.weekday() > 0 ? firstDayOfMonth.weekday() - 1 : 6,
      "day"
    );

    // Get the last Sunday of the calendar view (could be in next month)
    const lastVisibleDay = lastDayOfMonth.add(
      7 - (lastDayOfMonth.weekday() === 0 ? 7 : lastDayOfMonth.weekday()),
      "day"
    );

    let dateLess = lastVisibleDay.unix();
    let dateGreater = firstVisibleDay.unix();
    let userId = null;
    let array: Activity[] = [];

    if (session?.user) {
      userId = session.user.id;
    }

    try {
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

      // Merge with cached airing activities
      console.log(
        "🔗 Merging with cached airing activities:",
        airingActivities.length
      );
      array = [...array, ...airingActivities];

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
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch airing schedule once on mount or when settings change
  React.useEffect(() => {
    if (session?.user) {
      fetchAiringSchedule();
    }
  }, [
    session?.user?.id,
    settings?.filters?.show_airing,
    settings?.filters?.type,
  ]);

  // Fetch activities when month/year changes or when airing activities are updated
  React.useEffect(() => {
    fetchAll();
  }, [year, month, settings, airingActivities]);

  return (
    <>
      <div className={styles.calendar_month} ref={refElement}>
        <div className={styles.calendar_header}>
          <div className={styles.calendar_title}>
            <span className={styles.month_indicator}>📅</span>
            <span className={styles.month_text}>
              {dayjs(`${year}-${month}-01`).format("MMMM YYYY")}
            </span>
          </div>
        </div>

        <ol id="days-of-week" className={styles.day_of_week}>
          {createWeekDaysList(weekdays)}
        </ol>

        {loading ? (
          <div className={styles.loading_container}>
            <span className={styles.live}></span>
          </div>
        ) : (
          <ol id="calendar-days" className={styles.days_grid}>
            {days.length > 0 && createDaysCells(data, days)}
          </ol>
        )}
      </div>
      <div className={styles.mobile}>
        {loading ? (
          <div className={styles.loading_container}>
            <span className={styles.live}></span>
          </div>
        ) : (
          days.length > 0 && createDaysRow(data, days)
        )}
      </div>
    </>
  );
};

export default Calendar;
