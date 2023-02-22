import * as React from "react";

//Next.js
import Image from "next/image";

// Styles
import styles from "@/styles/components/calendarEvent.module.scss";

const Event: React.FC<ICalendarEventProps> = ({ activity, total }) => {
  const [height, setHeight] = React.useState<string>("60px");

  const addCSS = (): React.CSSProperties => {
    return {
      height: getHeight(),
      borderColor: checkSettings(),
    };
  };

  const checkSettings = (): string => {
    if (activity.progress) {
      if (activity.progress.toString().startsWith("1 -") || activity.progress.toString() === "1") return "purple";
    } else if (activity.status) {
      if (activity.status === "completed") return "orange";
    }
    return "";
  };

  const getHeight = (): string => {
    if (total == 1) {
      return "90%";
    } else if (total == 2) {
      return "45%";
    } else return height;
  };

  const increaseHeight = (): void => {
    if (total >= 3) setHeight("90px");
  };

  const decreaseHeight = (): void => {
    if (total >= 3) setHeight("60px");
  };

  return (
    <a href={activity.url} target="_blank" rel="noopener noreferrer" onMouseEnter={() => increaseHeight()} onMouseLeave={() => decreaseHeight()} style={addCSS()} className={styles.event}>
      <div className={styles.overlay}></div>
      <Image src={activity.coverImage.large} width={250} height={250} className={styles.background} alt={activity.anime_title} />
      <span className={styles.anime}>
        {activity.anime_title} {activity.format === "MOVIE" && "(Movie)"}
        {activity.progress && `(EP ${activity.progress})`} {activity.status === "completed" && "(Completed)"}
      </span>
    </a>
  );
};

export default Event;
