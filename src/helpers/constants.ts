const WEEK_NAMES = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

enum EVENT_TYPE_COLOR {
  ANIME = "#a400ff",
  MANGA = "#e94819",
  MOVIE = "#195fe9",
  TV = "#9b424e",
  ONA = "#801a40",
  FIRST_EPISODE = "#636661",
}

const EVENT_TYPES: IEventType[] = [
  {
    name: "Anime",
    color: EVENT_TYPE_COLOR.ANIME,
  },
  {
    name: "Manga",
    color: EVENT_TYPE_COLOR.MANGA,
  },
  {
    name: "Movie",
    color: EVENT_TYPE_COLOR.MOVIE,
  },
  {
    name: "TV",
    color: EVENT_TYPE_COLOR.TV,
  },
  {
    name: "Ona",
    color: EVENT_TYPE_COLOR.ONA,
  },
];

export { WEEK_NAMES, EVENT_TYPES, EVENT_TYPE_COLOR };
