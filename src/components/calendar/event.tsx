import * as React from "react";

//Next.js
import Image from "next/image";

// Styles
import styles from "@/styles/components/calendar/event.module.scss";
import useLocalStorageState from "use-local-storage-state";
import Chip from "./chip";
import { findEventType } from "@/helpers/utils";
import { EVENT_TYPE_COLOR } from "@/helpers/constants";

const Event: React.FC<ICalendarEventProps> = ({ activity, total }) => {
  const [height, setHeight] = React.useState<string>("130px");
  const addCSS = (): React.CSSProperties => {
    return {
      height: getHeight(),
    };
  };

  const checkEpisode = (): JSX.Element | null => {
    if (activity.progress) {
      if (
        activity.progress.toString().startsWith("1 -") ||
        activity.progress.toString() === "1"
      )
        return (
          <Chip name="First Episode" color={EVENT_TYPE_COLOR.FIRST_EPISODE} />
        );
      else
        return (
          <Chip name={"Ep. " + activity.progress} color={EVENT_TYPE_COLOR.TV} />
        );
    }
    return null;
  };

  const getHeight = (): string => {
    if (total == 1) {
      return "100%";
    } else if (total == 2) {
      return "50%";
    } else return height;
  };

  const getFormat = (): JSX.Element => {
    console.log(activity);

    const type = findEventType(activity.format);
    return (
      <Chip
        name={type.name === "TV" ? "Anime" : type.name}
        color={type.name === "TV" ? EVENT_TYPE_COLOR.ANIME : type.color}
      />
    );
  };

  return (
    <a
      href={activity.url}
      target="_blank"
      rel="noopener noreferrer"
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

      <span className={styles.anime}>{activity.anime_title}</span>
      <div style={{ marginTop: "5px" }}>
        {getFormat()}
        {checkEpisode()}
        {activity.status === "completed" && (
          <Chip name="Completed" color={EVENT_TYPE_COLOR.ONA} />
        )}
      </div>
    </a>
  );
};

export default Event;
