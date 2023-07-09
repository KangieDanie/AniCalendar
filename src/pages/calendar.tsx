import * as React from "react";

// Next.js
import { useSession } from "next-auth/react";

// Modules
import dayjs from "dayjs";
import { Group, Calendar, Header, Footer, Head } from "@/components";
import useLocalStorageState from "use-local-storage-state";

// Styles
import styles from "@/styles/pages/Calendar.module.scss";

export default function Home() {
  const { data: session } = useSession();
  const refEl: any = React.useRef<HTMLInputElement>();
  const [year, setYear] = React.useState<string>(dayjs().format("YYYY"));
  const [month, setMonth] = React.useState<string>(dayjs().format("M"));

  const [settings, setSettings] = useLocalStorageState("settings", {
    defaultValue: {
      colors: {
        completed: "#ffa500",
        first_episode: "#800080",
        upcoming_episode: "#6495ed",
      },
      filters: {
        type: "anime",
        show_upcoming_ep: false,
        show_only_first: false,
        show_completed: true,
      },
    },
  });
  return (
    <>
      <Head
        title="Your Calendar"
        description="A calendar based on your anilist activities!"
      />
      <Header />
      <div className={styles["calendar-header"]}>
        <div className={styles.overlay}>
          <Group
            refElement={refEl}
            year={year}
            month={month}
            setMonth={setMonth}
            setYear={setYear}
          />
        </div>
        <div className={styles["overlay-image"]}></div>
      </div>

      <main className={styles.testgr}>
        <Calendar refElement={refEl} year={year} month={month} />
      </main>
    </>
  );
}
