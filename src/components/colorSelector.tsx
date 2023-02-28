import * as React from "react";

// Styles
import styles from "@/styles/components/modal.module.scss";

import { TwitterPicker } from "react-color";

const ColorSelector: React.FC<IColorSelectorProps> = ({ color, setColor }) => {
  const [colorPickerVisible, setColorPickerVisible] =
    React.useState<boolean>(false);

  const handleChange = (color: any) => {
    console.log(color);

    setColor(color.hex);
  };

  return (
    <div className={styles.colorctn}>
      {colorPickerVisible && (
        <TwitterPicker
          color={color}
          width="380px"
          colors={[
            "#3db4f2",
            "#c063ff",
            "#4cca51",
            "#ef881a",
            "#e13333",
            "#fc9dd6",
          ]}
          onChangeComplete={handleChange}
          triangle="hide"
        />
      )}
      <div
        className={styles.colorbtn}
        style={{
          backgroundColor: color,
          borderColor: color,
        }}
        onClick={() => setColorPickerVisible(true)}
      ></div>
    </div>
  );
};

export default ColorSelector;
