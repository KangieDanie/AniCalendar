type Activity = {
  date: string;
  url: string;
  anime_title: string;
  anime_id: number;
  user: string;
  status: string;
  progress: string;
  banner: string;
  coverImage: CoverImage;
  format: string;
  isAiring?: boolean;
};

type CalendarDay = {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
};

type CoverImage = {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
};

type CardSizeMode = "auto" | "manual";
type CardSize = "small" | "medium" | "large";

type CardSettings = {
  sizeMode: CardSizeMode;
  manualSize: CardSize;
};
