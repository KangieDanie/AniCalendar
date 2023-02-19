import dayjs from "dayjs";

const parseActivities = (activities: any): Activity[] => {
  const watchedActivities = activities.Page.activities.filter((ac: { status: string }): any => ac.status === "watched episode" || ac.status === "completed");

  let activityList: Activity[] = [];

  watchedActivities.forEach((ac: any) => {
    activityList.push({
      date: dayjs.unix(ac.createdAt).format("YYYY-MM-DD"),
      anime_id: ac.media.id,
      anime_title: ac.media.title.userPreferred,
      url: ac.siteUrl,
      user: ac.user.name,
      status: ac.status,
      progress: ac.progress,
      banner: ac.media.bannerImage,
    });
  });

  console.log(activityList);

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
