import * as React from "react";

// Styles
import styles from "@/styles/components/modal.module.scss";

const LoaderModal: React.FC<ISettingModalProps> = ({ visible, setVisible }) => {
  if (!visible) return null;
  
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.spinner} />
    </div>
  );
};

export default LoaderModal;
