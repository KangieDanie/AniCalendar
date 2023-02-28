import * as React from "react";

// Styles
import styles from "@/styles/components/calendar/group.module.scss";

// Modules
import { Modal, Switch } from "@nextui-org/react";

// Icons
import {
  CameraIcon,
  Cog8ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

const SettingModal: React.FC<ISettingModalProps> = ({
  visible,
  setVisible,
}) => {
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <>
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
          <div className={styles.switch_container}>
            <div>
              <h4 className={styles.setting}>Show completed anime.</h4>
              <p>This is a description</p>
            </div>
            <Switch shadow color="primary" />
          </div>
          <hr className={styles.line} />
          <div className={styles.switch_container}>
            <div>
              <h4 className={styles.setting}>
                Show upcoming schedule of anime &quot;In Progress&quot;.
              </h4>
              <p>This is a description</p>
            </div>
            <Switch />
          </div>
          <hr className={styles.line} />
          <div className={styles.switch_container}>
            <div>
              <h4 className={styles.setting}>Show only the first episode.</h4>
              <p>This is a description</p>
            </div>
            <Switch />
          </div>
        </Modal.Body>
        <Modal.Footer
          css={{
            color: "#9fadbd",
            fontSize: "$sm",
            backgroundColor: "#151f2e",
          }}
        >
          <button className={styles.button}>Cancel</button>
          <button className={styles.button}>Save Changes</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettingModal;
