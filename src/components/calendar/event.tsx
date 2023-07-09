import * as React from "react";

//Next.js
import Image from "next/image";

// Styles
import styles from "@/styles/components/calendar/event.module.scss";
import useLocalStorageState from "use-local-storage-state";
import Chip from "./chip";

const Event: React.FC<ICalendarEventProps> = ({ activity, total }) => {
  const [height, setHeight] = React.useState<string>("60px");
  const [settings, setSettings]: any = useLocalStorageState("settings");
  const addCSS = (): React.CSSProperties => {
    return {
      height: getHeight(),
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
      return "100%";
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
      className={total === 1 ? styles["single-event"] : styles.event}
    >
      <div
        className={
          total === 1 ? styles["single-event-overlay"] : styles.overlay
        }
      ></div>

      {total > 1 && (
        <Image
          src={activity.coverImage.large}
          width={250}
          height={250}
          className={styles.background}
          alt={activity.anime_title}
        />
      )}

      <span className={styles.anime}>
        {activity.anime_title} {getFormat()}{" "}
        {activity.progress &&
          `(${activity.format === "TV" ? "EP. " : "Ch. "} ${
            activity.progress
          })`}{" "}
        {activity.status === "completed" && "(Completed)"}
      </span>
      <Chip name="Anime" color="orange" />
      <Chip name="Completed" color="green" />
    </a>
  );
};

export default Event;
