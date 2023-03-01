import * as React from "react";

// Styles
import styles from "@/styles/components/modal.module.scss";
// Modules
import { Modal, Loading } from "@nextui-org/react";

const LoaderModal: React.FC<ISettingModalProps> = ({ visible, setVisible }) => {
  return (
    <Modal
      aria-labelledby="modal-title"
      width="700px"
      blur
      open={visible}
      preventClose
      css={{
        color: "#c7d7e9",
        fontSize: "$sm",
        backgroundColor: "#151f2e",
      }}
    >
      <Modal.Body
        css={{
          color: "#c7d7e9",
          fontSize: "$sm",
          backgroundColor: "#151f2e",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading color={"secondary"} size="xl" />
      </Modal.Body>
    </Modal>
  );
};

export default LoaderModal;
