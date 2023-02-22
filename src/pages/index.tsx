import * as React from "react";

// Next.js
import Head from "next/head";
import { useSession } from "next-auth/react";

// Modules
import dayjs from "dayjs";
import { CalendarButtons, Calendar, Header, Footer, SettingModal } from "@/components";

// Styles
import styles from "@/styles/pages/Home.module.scss";

export default function Home() {
  const { data: session } = useSession();
  const refEl: any = React.useRef<HTMLInputElement>();
  const [year, setYear] = React.useState<string>(dayjs().format("YYYY"));
  const [month, setMonth] = React.useState<string>(dayjs().format("M"));
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <>
      <Head>
        <title>AniCalendar - Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        {!session && (
          <>
            <div className={styles.container}>
              <h2 className={styles.title}>Sign in to view your calendar.</h2>
            </div>
          </>
        )}
        {session?.user && (
          <>
            <SettingModal setVisible={setVisible} visible={visible} />
            <CalendarButtons refElement={refEl} year={year} month={month} setMonth={setMonth} setYear={setYear} setVisible={setVisible} />
            <Calendar refElement={refEl} year={year} month={month} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
