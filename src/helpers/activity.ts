import dayjs from "dayjs";

const parseActivities = (activities: any): Activity[] => {
  const stringSetting = window.localStorage.getItem("settings");
  if (!stringSetting) return [];
  const settings: any | null = JSON.parse(stringSetting);

  const watchedActivities = activities.Page.activities.filter(
    (ac: { status: string }): any =>
      ac.status === "watched episode" ||
      (settings.filters["show_completed"] && ac.status === "completed") ||
      ac.status === "read chapter"
  );

  const filterFormatActivities = watchedActivities.filter(
    (ac: { media: any }): any =>
      ac.media.format === "TV" ||
      ac.media.format === "MOVIE" ||
      ac.media.format === "ONA" ||
      ac.media.format === "MANGA"
  );

  let activityList: Activity[] = [];

  filterFormatActivities.forEach((ac: any) => {
    activityList.push({
      date: dayjs.unix(ac.createdAt).format("YYYY-MM-DD"),
      anime_id: ac.media.id,
      anime_title: ac.media.title.userPreferred,
      url: ac.siteUrl,
      user: ac.user.name,
      status: ac.status,
      progress: ac.progress,
      banner: ac.media.bannerImage,
      coverImage: ac.media.coverImage,
      format: ac.media.format,
    });
  });

  return activityList;
};

const groupActivitiesByDate = (activities: Activity[]): any => {
  const dateGroup: any = activities.reduce((group: any, product) => {
    const { date } = product;
    group[date] = group[date] ?? [];
    group[date].push(product);
    return group;
  }, {});

  //console.log(dateGroup);
  return dateGroup;
};

export { parseActivities, groupActivitiesByDate };
