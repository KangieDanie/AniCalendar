import * as React from "react";

//Next.js
import Image from "next/image";

// Styles
import styles from "@/styles/components/calendar/button.module.scss";
import { Tooltip } from "@nextui-org/react";

const Event: React.FC<ICalendarButtonProps> = ({
  content,
  icon,
  method,
  visible,
}) => {
  return (
    <Tooltip
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        visibility: !visible ? "hidden" : "visible",
      }}
      css={{
        color: "#9fadbd",
        fontSize: "$sm",
        width: "140px",
        backgroundColor: "#151f2e",
        zIndex: "300",
        display: "flex",
        justifyContent: "center",
      }}
      hideArrow
      shadow={false}
      content={content}
    >
      <a className={styles.icon} onClick={method}>
        {icon}
      </a>
    </Tooltip>
  );
};

export default Event;
