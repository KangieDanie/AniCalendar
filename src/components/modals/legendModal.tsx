import * as React from "react";

// Styles
import styles from "@/styles/components/modal.module.scss";

import useLocalStorageState from "use-local-storage-state";
import ColorSelector from "../colorSelector";

const LegendModal: React.FC<ISettingModalProps> = ({ visible, setVisible }) => {
  const [settings, setSettings]: any = useLocalStorageState("settings");
  const [completedColor, setCompletedColor] = React.useState<string>(
    settings.colors["completed"]
  );
  const [firstEpisodeColor, setFirstEpisodeColor] = React.useState<string>(
    settings.colors["first_episode"]
  );
  const [upcomingEpisodeColor, setUpcomingEpisodeColor] =
    React.useState<string>(settings.colors["upcoming_episode"]);
  const [airingColor, setAiringColor] = React.useState<string>(
    settings.colors["airing"] || "#02a9ff"
  );

  const closeHandler = () => {
    setVisible(false);
    setCompletedColor(settings.colors["completed"]);
    setFirstEpisodeColor(settings.colors["first_episode"]);
    setUpcomingEpisodeColor(settings.colors["upcoming_episode"]);
    setAiringColor(settings.colors["airing"] || "#02a9ff");
  };

  const saveChanges = () => {
    settings.colors["completed"] = completedColor;
    settings.colors["first_episode"] = firstEpisodeColor;
    settings.colors["upcoming_episode"] = upcomingEpisodeColor;
    settings.colors["airing"] = airingColor;
    setSettings(settings);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeHandler}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h2>Legend</h2>
            <strong>Modify the colours to your liking.</strong>
          </div>
          <button className={styles.closeButton} onClick={closeHandler}>
            ✕
          </button>
        </div>
        <hr className={styles.line} />

        <div className={styles.modalBody}>
          <div className={styles.container}>
            <div>
              <h4 className={styles.setting}>Completed anime/manga</h4>
              <div
                style={{
                  width: "100px",
                  height: "50px",
                  border: "3px solid " + completedColor,
                  borderRadius: "5px",
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Example
              </div>
            </div>
            <ColorSelector
              color={completedColor}
              setColor={setCompletedColor}
            />
          </div>
          <hr className={styles.line} />
          <div className={styles.container}>
            <div>
              <h4 className={styles.setting}>First episode of the anime</h4>
              <div
                style={{
                  width: "100px",
                  height: "50px",
                  border: "3px solid " + firstEpisodeColor,
                  borderRadius: "5px",
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Example
              </div>
            </div>
            <ColorSelector
              color={firstEpisodeColor}
              setColor={setFirstEpisodeColor}
            />
          </div>
          <hr className={styles.line} />
          <div className={styles.container}>
            <div>
              <h4 className={styles.setting}>Upcoming anime episode</h4>
              <div
                style={{
                  width: "100px",
                  height: "50px",
                  border: "3px solid " + upcomingEpisodeColor,
                  borderRadius: "5px",
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Example
              </div>
            </div>
            <ColorSelector
              color={upcomingEpisodeColor}
              setColor={setUpcomingEpisodeColor}
            />
          </div>
          <hr className={styles.line} />
          <div className={styles.container}>
            <div>
              <h4 className={styles.setting}>Airing episode</h4>
              <div
                style={{
                  width: "100px",
                  height: "50px",
                  border: "3px solid " + airingColor,
                  borderRadius: "5px",
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Example
              </div>
            </div>
            <ColorSelector color={airingColor} setColor={setAiringColor} />
          </div>
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

export default LegendModal;
