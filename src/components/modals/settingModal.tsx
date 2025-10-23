import * as React from "react";

// Styles
import styles from "@/styles/components/modal.module.scss";

import useLocalStorageState from "use-local-storage-state";

const SettingModal: React.FC<ISettingModalProps> = ({
  visible,
  setVisible,
}) => {
  const [settings, setSettings]: any = useLocalStorageState("settings", {
    defaultValue: {
      colors: {
        completed: "#ffa500",
        first_episode: "#800080",
        upcoming_episode: "#6495ed",
        airing: "#02a9ff",
      },
      filters: {
        type: "anime",
        show_upcoming_ep: false,
        show_only_first: false,
        show_completed: true,
        show_airing: true,
      },
      cardSettings: {
        sizeMode: "auto",
        manualSize: "medium",
      },
    },
  });
  const [type, setType] = React.useState<string>(
    settings?.filters?.["type"] || "anime"
  );
  const [completed, setCompleted] = React.useState<boolean>(
    settings?.filters?.["show_completed"] || true
  );
  const [showFirstEp, setShowFirstEp] = React.useState<boolean>(
    settings?.filters?.["show_only_first"] || false
  );
  const [showUpcomingEp, setUpcomingEp] = React.useState<boolean>(
    settings?.filters?.["show_upcoming_ep"] || false
  );
  const [showAiring, setShowAiring] = React.useState<boolean>(
    settings?.filters?.["show_airing"] !== undefined
      ? settings.filters["show_airing"]
      : true
  );
  const [cardSizeMode, setCardSizeMode] = React.useState<CardSizeMode>(
    settings?.cardSettings?.sizeMode || "auto"
  );
  const [cardSize, setCardSize] = React.useState<CardSize>(
    settings?.cardSettings?.manualSize || "medium"
  );

  const closeHandler = () => {
    setVisible(false);
    if (settings && settings.filters) {
      setCompleted(settings.filters["show_completed"]);
      setShowFirstEp(settings.filters["show_only_first"]);
      setUpcomingEp(settings.filters["show_upcoming_ep"]);
      setShowAiring(
        settings.filters["show_airing"] !== undefined
          ? settings.filters["show_airing"]
          : true
      );
    }
    if (settings && settings.cardSettings) {
      setCardSizeMode(settings.cardSettings.sizeMode || "auto");
      setCardSize(settings.cardSettings.manualSize || "medium");
    }
  };

  const saveChanges = () => {
    if (!settings) return;

    const updatedSettings = {
      ...settings,
      filters: {
        ...settings.filters,
        type: type,
        show_completed: completed,
        show_only_first: showFirstEp,
        show_upcoming_ep: showUpcomingEp,
        show_airing: showAiring,
      },
      cardSettings: {
        sizeMode: cardSizeMode,
        manualSize: cardSize,
      },
    };
    setSettings(updatedSettings);
    setVisible(false);
  };

  const readableType = () => {
    switch (type) {
      case "anime":
        return "Anime";
      case "manga":
        return "Manga";
      case "animemanga":
        return "Anime & Manga";
    }
  };

  const onTypeSelected = (key: any) => {
    setType(key);
  };

  const onCardSizeModeSelected = (key: any) => {
    setCardSizeMode(key as CardSizeMode);
  };

  const onCardSizeSelected = (key: any) => {
    setCardSize(key as CardSize);
  };

  const readableCardSizeMode = () => {
    return cardSizeMode === "auto" ? "Automatic" : "Manual";
  };

  const readableCardSize = () => {
    return cardSize.charAt(0).toUpperCase() + cardSize.slice(1);
  };

  if (!visible) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeHandler}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h2>Calendar Settings</h2>
            <strong>Modify the calendar to your liking.</strong>
          </div>
          <button className={styles.closeButton} onClick={closeHandler}>
            ✕
          </button>
        </div>
        <hr className={styles.line} />

        <div className={styles.modalBody}>
          <div className={styles.container}>
            <div>
              <h4 className={styles.setting}>
                What type of events do you want to view?
              </h4>
            </div>
            <select
              className={styles.select}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="anime">Anime</option>
              <option value="manga">Manga</option>
              <option value="animemanga">Anime & Manga</option>
            </select>
          </div>

          <hr className={styles.line} />

          <div className={styles.container}>
            <div>
              <h4 className={styles.setting}>Show completed anime/manga.</h4>
            </div>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>

          <hr className={styles.line} />

          <div className={styles.container}>
            <div>
              <h4 className={styles.setting}>Show airing episodes.</h4>
              <p style={{ fontSize: "0.9em", marginTop: "5px", opacity: 0.8 }}>
                Display upcoming episodes for anime you&apos;re currently
                watching
              </p>
            </div>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={showAiring}
                onChange={(e) => setShowAiring(e.target.checked)}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>

          <hr className={styles.line} />

          <div className={styles.container}>
            <div>
              <h4 className={styles.setting}>Card size mode</h4>
              <p style={{ fontSize: "0.9em", marginTop: "5px", opacity: 0.8 }}>
                Automatic adjusts card size based on events per day
              </p>
            </div>
            <select
              className={styles.select}
              value={cardSizeMode}
              onChange={(e) => setCardSizeMode(e.target.value as CardSizeMode)}
            >
              <option value="auto">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          {cardSizeMode === "manual" && (
            <>
              <hr className={styles.line} />
              <div className={styles.container}>
                <div>
                  <h4 className={styles.setting}>Card size preset</h4>
                </div>
                <select
                  className={styles.select}
                  value={cardSize}
                  onChange={(e) => setCardSize(e.target.value as CardSize)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancel} onClick={closeHandler}>
            Cancel
          </button>
          <button className={styles.save} onClick={saveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
