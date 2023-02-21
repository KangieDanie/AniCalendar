import * as React from "react";

// Styles
import styles from "@/styles/components/calendarButton.module.scss";

// Modules
import dayjs from "dayjs";
import * as htmlToImage from "html-to-image";
import { Tooltip, Modal, Switch } from "@nextui-org/react";
import Sticky from "react-stickynode";

// Icons
import { CameraIcon, Cog8ToothIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const CalendarButtons: React.FC<ICalendarButtonsProps> = ({ refElement, year, month, setYear, setMonth, setVisible }) => {
  const handler = () => setVisible(true);

  const downloadImage = async (): Promise<void> => {
    if (refElement) {
      const dataUrl = await htmlToImage.toPng(refElement.current);
      const link = document.createElement("a");
      link.download = `calendar-${year}-${month}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const previousMonth = (): void => {
    if (month === "1") {
      let newYear = parseInt(year) - 1;
      setYear(newYear.toString());
      setMonth("12");
    } else {
      let monthInt = parseInt(month);
      let newMonth = monthInt - 1;
      setMonth(newMonth.toString());
    }
  };

  const nextMonth = (): void => {
    if (month === "12") {
      let newYear = parseInt(year) + 1;
      setYear(newYear.toString());
      setMonth("1");
    } else {
      let monthInt = parseInt(month);
      let newMonth = monthInt + 1;
      setMonth(newMonth.toString());
    }
  };

  return (
    <Sticky enabled={true} top={50} innerZ={300} innerActiveClass={styles.sticky}>
      <div className={styles.container}>
        <div className={styles.sub}>
          <Tooltip
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
            content={"Previous Month"}>
            <a className={styles.cog} onClick={() => previousMonth()}>
              <ChevronLeftIcon width={25} />
            </a>
          </Tooltip>
          <Tooltip
            css={{
              color: "#9fadbd",
              fontSize: "$sm",
              width: "120px",
              backgroundColor: "#151f2e",
              zIndex: "300",
              display: "flex",
              justifyContent: "center",
            }}
            hideArrow
            shadow={false}
            content={"Next Month"}>
            <a className={styles.cog} onClick={() => nextMonth()}>
              <ChevronRightIcon width={25} />
            </a>
          </Tooltip>
        </div>
        <h2 className={styles.date}>
          {dayjs("2023-" + month + "-01").format("MMMM")} - {year}
        </h2>
        <div className={styles.sub}>
          <Tooltip
            css={{
              color: "#9fadbd",
              fontSize: "$sm",
              width: "130px",
              backgroundColor: "#151f2e",
              zIndex: "300",
              display: "flex",
              justifyContent: "center",
            }}
            hideArrow
            shadow={false}
            content={"Generate image"}>
            <a className={styles.camera} onClick={() => downloadImage()}>
              <CameraIcon width={25} />
            </a>
          </Tooltip>

          <Tooltip
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
            content={"Calendar Settings"}>
            <a className={styles.cog} onClick={() => handler()}>
              <Cog8ToothIcon width={25} />
            </a>
          </Tooltip>
        </div>
      </div>
    </Sticky>
  );
};

export default CalendarButtons;
