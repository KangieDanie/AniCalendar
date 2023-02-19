import styles from "@/styles/Home.module.css";
import dayjs from "dayjs";
import * as React from "react";
import * as htmlToImage from "html-to-image";

const CalendarButtons: React.FC<ICalendarButtonsProps> = ({ refElement, year, month, setYear, setMonth }) => {
  const downloadImage = async () => {
    if (refElement) {
      const dataUrl = await htmlToImage.toPng(refElement.current);
      const link = document.createElement("a");
      link.download = `calendar-${year}-${month}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const previousMonth = () => {
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

  const nextMonth = () => {
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
    <div className={styles.date_switch_container}>
      <h1>
        {dayjs("2023-" + month + "-01").format("MMMM")} - {year}
      </h1>
      <div className={styles.datebutton_switch_container}>
        <button name="Previous Month" onClick={() => previousMonth()} className={styles.switch_button}>
          <svg width={25} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.icon_button}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Previous
        </button>
        <button name="Next Month" onClick={() => nextMonth()} className={styles.switch_button}>
          Next
          <svg width={25} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.icon_button}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
        <button name="Download Image" onClick={() => downloadImage()} className={styles.switch_button}>
          <svg width={30} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.icon_button}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
          Generate Image
        </button>
      </div>
    </div>
  );
};

export default CalendarButtons;
