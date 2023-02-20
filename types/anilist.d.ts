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
