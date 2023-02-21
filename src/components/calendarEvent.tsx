import * as React from "react";

import styles from "@/styles/components/calendarEvent.module.scss";
import Image from "next/image";

const CalendarEvent: React.FC<ICalendarEventProps> = ({ activity, total }) => {
  const [height, setHeight] = React.useState<string>("60px");

  const addCoverImage = (): React.CSSProperties => {
    return {
      // backgroundImage: `linear-gradient(rgb(11 22 34), rgb(11 22 34 / 70%)), url("${activity.coverImage.large}")`,
      height: getHeight(),
      borderColor: checkIfEpisodeOne(),
      backgroundPosition: "center",
      backgroundSize: "cover",
    };
  };

  const checkIfEpisodeOne = () => {
    if (activity.progress) {
      if (activity.progress.toString().startsWith("1 -") || activity.progress.toString() === "1") return "purple";
    } else if (activity.status) {
      if (activity.status === "completed") return "orange";
    }
  };

  const getHeight = () => {
    if (total == 1) {
      return "90%";
    } else if (total == 2) {
      return "45%";
    } else return height;
  };

  const increaseHeight = () => {
    if (total >= 3) setHeight("90px");
  };

  const decreaseHeight = () => {
    if (total >= 3) setHeight("60px");
  };

  return (
    <a href={activity.url} target="_blank" rel="noopener noreferrer" onMouseEnter={() => increaseHeight()} onMouseLeave={() => decreaseHeight()} style={addCoverImage()} className={styles.event}>
      <div className={styles.overlay}></div>
      <Image src={activity.coverImage.large} width={250} height={250} className={styles.background} alt="" />
      <span className={styles.anime}>
        {activity.anime_title} {activity.format === "MOVIE" && "(Movie)"}
        {activity.progress && `(EP ${activity.progress})`} {activity.status === "completed" && "(Completed)"}
      </span>
    </a>
  );
};

export default CalendarEvent;
