import * as React from "react";

//Next.js
import Image from "next/image";

// Styles
import styles from "@/styles/components/calendar/event.module.scss";
import useLocalStorageState from "use-local-storage-state";

const Event: React.FC<ICalendarEventProps> = ({ activity, total }) => {
  const [height, setHeight] = React.useState<string>("60px");
  const [settings, setSettings]: any = useLocalStorageState("settings");
  const addCSS = (): React.CSSProperties => {
    return {
      height: getHeight(),
      borderColor: checkSettings(),
    };
  };

  const checkSettings = (): string => {
    if (activity.progress) {
      if (
        activity.progress.toString().startsWith("1 -") ||
        activity.progress.toString() === "1"
      )
        return settings.colors["first_episode"];
    } else if (activity.status) {
      if (activity.status === "completed") return settings.colors["completed"];
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

  const getFormat = (): string => {
    switch (activity.format) {
      case "MOVIE":
        return "(Movie)";
      case "ONA":
        return "(ONA)";
      case "MANGA":
        return "(MANGA)";
      case "TV":
        return "(ANIME)";
      default:
        return "UNKNOWN";
    }
  };

  const decreaseHeight = (): void => {
    if (total >= 3) setHeight("60px");
  };

  return (
    <a
      href={activity.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => increaseHeight()}
      onMouseLeave={() => decreaseHeight()}
      style={addCSS()}
      className={styles.event}
    >
      <div className={styles.overlay}></div>
      <Image
        src={activity.coverImage.large}
        width={250}
        height={250}
        className={styles.background}
        alt={activity.anime_title}
      />
      <span className={styles.anime}>
        {activity.anime_title} {getFormat()}{" "}
        {activity.progress &&
          `(${activity.format === "TV" ? "EP. " : "Ch. "} ${
            activity.progress
          })`}{" "}
        {activity.status === "completed" && "(Completed)"}
      </span>
    </a>
  );
};

export default Event;
