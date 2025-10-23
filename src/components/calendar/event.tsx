import * as React from "react";

//Next.js
import Image from "next/image";

// Styles
import styles from "@/styles/components/calendar/event.module.scss";
import useLocalStorageState from "use-local-storage-state";

interface EventProps extends ICalendarEventProps {
  gridColumn?: string;
}

const Event: React.FC<EventProps> = ({ activity, total, gridColumn }) => {
  const [height, setHeight] = React.useState<string>("60px");
  const [settings]: any = useLocalStorageState("settings", {
    defaultValue: {
      colors: {
        completed: "#ffa500",
        first_episode: "#800080",
        upcoming_episode: "#6495ed",
        airing: "#02a9ff",
      },
      cardSettings: {
        sizeMode: "auto",
        manualSize: "medium",
      },
    },
  });

  const addCSS = (): React.CSSProperties => {
    const styles: React.CSSProperties = {
      height: getHeight(),
      borderColor: checkSettings(),
    };

    if (gridColumn) {
      styles.gridColumn = gridColumn;
    }

    return styles;
  };

  const checkSettings = (): string => {
    if (!settings || !settings.colors) return "";

    // Check if it's an airing episode
    if (activity.isAiring || activity.status === "airing") {
      return settings.colors["airing"] || "#02a9ff";
    }

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
    if (!settings || !settings.cardSettings) {
      // Fallback to automatic sizing if settings not loaded
      if (total == 1) {
        return "100%";
      } else if (total == 2) {
        return "48%";
      } else if (total == 3) {
        return "32%";
      } else return height;
    }

    const cardSettings = settings.cardSettings;

    if (cardSettings.sizeMode === "manual") {
      // Manual sizing
      switch (cardSettings.manualSize) {
        case "small":
          return "150px";
        case "medium":
          return "220px";
        case "large":
          return "280px";
        default:
          return "220px";
      }
    } else {
      // Automatic sizing based on total events
      // Dynamic calculation to fit all cards nicely
      if (total == 1) {
        return "100%";
      } else if (total == 2) {
        return "47%";
      } else if (total == 3) {
        return "31%";
      } else if (total == 4) {
        return "23%";
      } else if (total == 5) {
        return "18%";
      } else {
        // For 6+ events, use fixed smaller size
        return "140px";
      }
    }
  };

  const increaseHeight = (): void => {
    if (!settings || !settings.cardSettings) return;

    const cardSettings = settings.cardSettings;
    if (cardSettings.sizeMode === "auto" && total >= 6) {
      setHeight("160px");
    }
  };

  const getFormat = (): string => {
    switch (activity.format) {
      case "MOVIE":
        return "MOVIE";
      case "ONA":
        return "ONA";
      case "MANGA":
        return "MANGA";
      case "TV":
        return "SERIES";
      default:
        return "SERIES";
    }
  };

  const getFormatColor = (): string => {
    switch (activity.format) {
      case "MOVIE":
        return "#c86dd7";
      case "ONA":
        return "#3db4f2";
      case "MANGA":
        return "#02a679";
      case "TV":
        return "#ed2f56";
      default:
        return "#3db4f2";
    }
  };

  const decreaseHeight = (): void => {
    if (!settings || !settings.cardSettings) return;

    const cardSettings = settings.cardSettings;
    if (cardSettings.sizeMode === "auto" && total >= 6) {
      setHeight("140px");
    }
  };

  const getEpisodeNumber = (): string | null => {
    if (!activity.progress) return null;

    const progressStr = activity.progress.toString();

    // Check if it's a range like "1 - 10"
    const rangeMatch = progressStr.match(/^(\d+)\s*-\s*(\d+)/);
    if (rangeMatch) {
      // Return the last number in the range
      return rangeMatch[2];
    }

    // Extract just the number from the progress string
    const match = progressStr.match(/^(\d+)/);
    return match ? match[1] : null;
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

      {/* Episode number badge */}
      {getEpisodeNumber() && (
        <div className={styles.episodeBadge}>{getEpisodeNumber()}</div>
      )}

      {/* Format badge */}
      <div
        className={styles.formatBadge}
        style={{ backgroundColor: getFormatColor() }}
      >
        {getFormat()}
      </div>

      {/* Status badge for completed */}
      {activity.status === "completed" && (
        <div className={styles.statusBadge}>COMPLETED</div>
      )}

      <div className={styles.contentWrapper}>
        <span className={styles.anime}>{activity.anime_title}</span>
      </div>
    </a>
  );
};

export default Event;
