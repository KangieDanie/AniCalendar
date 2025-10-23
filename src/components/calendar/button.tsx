import * as React from "react";

//Next.js

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
      content={content}
      classNames={{
        base: "py-2 px-3 bg-[#151f2e] text-[#9fadbd]",
        content: "text-sm w-[140px] text-center",
      }}
    >
      <a 
        className={styles.icon} 
        onClick={method}
        style={{
          visibility: !visible ? "hidden" : "visible",
        }}
      >
        {icon}
      </a>
    </Tooltip>
  );
};

export default Event;
