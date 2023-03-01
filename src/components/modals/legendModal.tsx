import * as React from "react";

// Styles
import styles from "@/styles/components/modal.module.scss";

// Modules
import { Modal } from "@nextui-org/react";

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

  const closeHandler = () => {
    setVisible(false);
    setCompletedColor(settings.colors["completed"]);
    setFirstEpisodeColor(settings.colors["first_episode"]);
    setUpcomingEpisodeColor(settings.colors["upcoming_episode"]);
  };

  const saveChanges = () => {
    settings.colors["completed"] = completedColor;
    settings.colors["first_episode"] = firstEpisodeColor;
    settings.colors["upcoming_episode"] = upcomingEpisodeColor;
    setSettings(settings);
    setVisible(false);
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      width="800px"
      blur
      open={visible}
      onClose={closeHandler}
      css={{
        color: "#c7d7e9",
        fontSize: "$sm",
        backgroundColor: "#151f2e",
      }}
    >
      <Modal.Header
        justify="flex-start"
        css={{
          color: "#c7d7e9",
          fontSize: "$sm",
          backgroundColor: "#151f2e",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h2>Legend</h2>
        <strong>Modify the colours to your liking.</strong>
        <hr className={styles.line} />
      </Modal.Header>
      <Modal.Body
        css={{
          color: "#c7d7e9",
          fontSize: "$sm",
          backgroundColor: "#151f2e",
        }}
      >
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
          <ColorSelector color={completedColor} setColor={setCompletedColor} />
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
      </Modal.Body>
      <Modal.Footer
        css={{
          color: "#9fadbd",
          fontSize: "$sm",
          backgroundColor: "#151f2e",
        }}
      >
        <button className={styles.cancel} onClick={() => closeHandler()}>
          Cancel
        </button>
        <button className={styles.save} onClick={() => saveChanges()}>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default LegendModal;
