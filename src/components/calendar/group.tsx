import * as React from "react";

// Styles
import styles from "@/styles/components/calendar/group.module.scss";

// Modules
import dayjs from "dayjs";
import * as htmlToImage from "html-to-image";
import Sticky from "react-stickynode";
import Button from "./button";

// Icons
import {
  CameraIcon,
  Cog8ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";
import useCheckTabletScreen from "@/hooks/useCheckTabletScreen";

const Group: React.FC<ICalendarButtonsProps> = ({
  refElement,
  year,
  month,
  setYear,
  setMonth,
  setLegendVisible,
  setSettingVisible,
  setLoadingVisible,
}) => {
  const handlerLegend = () => setLegendVisible(true);
  const handlerSetting = () => setSettingVisible(true);
  const isMobile = useCheckMobileScreen();
  const isTablet = useCheckTabletScreen();
  const downloadImage = async (): Promise<void> => {
    setLoadingVisible(true);
    if (refElement) {
      const dataUrl = await htmlToImage.toPng(refElement.current, {
        fetchRequestInit: {
          mode: "no-cors",
        },
      });

      const link = document.createElement("a");
      link.download = `calendar-${year}-${month}.png`;
      link.href = dataUrl;
      link.click();
      setLoadingVisible(false);
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

  const previousYear = (): void => {
    let yearInt = parseInt(year);
    let newYear = yearInt - 1;
    setYear(newYear.toString());
  };

  const nextYear = (): void => {
    let yearInt = parseInt(year);
    let newYear = yearInt + 1;
    setYear(newYear.toString());
  };

  return (
    <Sticky
      enabled={true}
      top={50}
      innerZ={300}
      innerActiveClass={styles.sticky}
    >
      <div className={styles.container}>
        <div className={styles.sub}>
          <Button
            content={"Legend"}
            icon={<InformationCircleIcon width={25} />}
            method={() => handlerLegend()}
            visible
          />

          {(!isMobile || !isTablet) && (
            <Button
              content={"Next Month"}
              icon={<ChevronRightIcon width={25} />}
              method={() => nextMonth()}
              visible={false}
            />
          )}
        </div>

        <div className={styles.sub}>
          <Button
            content={"Previous Year"}
            icon={<ChevronDoubleLeftIcon width={25} />}
            method={() => previousYear()}
            visible
          />
          <Button
            content={"Previous Month"}
            icon={<ChevronLeftIcon width={25} />}
            method={() => previousMonth()}
            visible
          />

          <h2 className={styles.date}>
            {dayjs("2023-" + month + "-01").format("MMMM")} - {year}
          </h2>

          <Button
            content={"Next Month"}
            icon={<ChevronRightIcon width={25} />}
            method={() => nextMonth()}
            visible
          />

          <Button
            content={"Next Year"}
            icon={<ChevronDoubleRightIcon width={25} />}
            method={() => nextYear()}
            visible
          />
        </div>

        <div className={styles.sub}>
          {(!isMobile || !isTablet) && (
            <Button
              content={"Generate image"}
              icon={<CameraIcon width={25} />}
              method={() => downloadImage()}
              visible
            />
          )}

          <Button
            content={"Calendar Settings"}
            icon={<Cog8ToothIcon width={25} />}
            method={() => handlerSetting()}
            visible
          />
        </div>
      </div>
      {/* <div className={styles.legends}>
        <div className={styles.legend}>
          <svg viewBox="0 0 100 100" fill="orange" width={20} xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <span className={styles.desc}>Completed</span>
        </div>
        <div className={styles.legend}>
          <svg viewBox="0 0 100 100" fill="purple" width={20} xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <span className={styles.desc}>First episode</span>
        </div>
      </div> */}
    </Sticky>
  );
};

export default Group;
