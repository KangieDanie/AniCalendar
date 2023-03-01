import * as React from "react";

// Styles
import styles from "@/styles/components/modal.module.scss";
// Modules
import { Modal, Checkbox, Dropdown } from "@nextui-org/react";

import useLocalStorageState from "use-local-storage-state";

const SettingModal: React.FC<ISettingModalProps> = ({
  visible,
  setVisible,
}) => {
  const [settings, setSettings]: any = useLocalStorageState("settings");
  const [type, setType] = React.useState<string>(settings.filters["type"]);
  const [completed, setCompleted] = React.useState<boolean>(
    settings.filters["show_completed"]
  );
  const [showFirstEp, setShowFirstEp] = React.useState<boolean>(
    settings.filters["show_only_first"]
  );
  const [showUpcomingEp, setUpcomingEp] = React.useState<boolean>(
    settings.filters["show_upcoming_ep"]
  );

  const closeHandler = () => {
    setVisible(false);
    setCompleted(settings.filters["show_completed"]);
    setShowFirstEp(settings.filters["show_only_first"]);
    setUpcomingEp(settings.filters["show_upcoming_ep"]);
  };

  const saveChanges = () => {
    settings.filters["type"] = type;
    settings.filters["show_completed"] = completed;
    settings.filters["show_only_first"] = showFirstEp;
    settings.filters["show_upcoming_ep"] = showUpcomingEp;
    setSettings(settings);
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

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      width="700px"
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
        <h2>Calendar Settings</h2>
        <strong>Modify the calendar to your liking.</strong>
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
            <h4 className={styles.setting}>
              What type of events do you want to view?
            </h4>
          </div>
          <Dropdown>
            <Dropdown.Button flat>{readableType()}</Dropdown.Button>
            <Dropdown.Menu aria-label="types" onAction={onTypeSelected}>
              <Dropdown.Item key="anime">Anime</Dropdown.Item>
              <Dropdown.Item key="manga">Manga</Dropdown.Item>
              <Dropdown.Item key="animemanga" withDivider color="secondary">
                Anime & Manga
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <hr className={styles.line} />
        <div className={styles.container}>
          <div>
            <h4 className={styles.setting}>Show completed anime/manga.</h4>
          </div>
          <Checkbox
            color="secondary"
            labelColor="secondary"
            aria-label="Show completed anime/manga"
            isSelected={completed}
            onChange={(checked) => setCompleted(checked)}
          ></Checkbox>
        </div>
        {/* <hr className={styles.line} />
        <div className={styles.container}>
          <div>
            <h4 className={styles.setting}>
              Show upcoming schedule of anime &quot;In Progress&quot;.
            </h4>
          </div>
          <Checkbox
            color="secondary"
            aria-label="Show upcoming episode"
            labelColor="secondary"
            isSelected={showUpcomingEp}
            onChange={(checked) => setUpcomingEp(checked)}
          ></Checkbox>
        </div> */}
        {/* <hr className={styles.line} />
        <div className={styles.container}>
          <div>
            <h4 className={styles.setting}>
              Show only the first episode/page of every anime/manga.
            </h4>
          </div>
          <Checkbox
            color="secondary"
            labelColor="secondary"
            aria-label=" Show only the first episode/page of every anime/manga."
            isSelected={showFirstEp}
            onChange={(checked) => setShowFirstEp(checked)}
          ></Checkbox>
        </div> */}
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

export default SettingModal;
