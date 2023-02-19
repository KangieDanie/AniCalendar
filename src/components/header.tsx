import * as React from "react";

// Next.js
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

// GraphQL Client
import { client } from "@/apolloClient";

// Styles
import styles from "@/styles/components/header.module.scss";

import Popup from "reactjs-popup";
//import "reactjs-popup/dist/index.css";
import { Tooltip } from "react-tooltip";

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className={styles.nav}>
      <div className={styles.container}>
        <Image width={100} height={100} src="/AniCalendarLogo.png" alt="AniCalendar Logo" />
        <h1 className={styles.title}>
          Ani<span className={styles.blue}>Calendar</span>
        </h1>
      </div>

      {session?.user && (
        <>
          <div className={styles.container}>
            <span>
              <small>Welcome! </small>
              <br />
              <strong>{session.user.name}</strong>
            </span>
            {session.user.image && (
              <>
                <Image id="my-tooltip" width={50} height={50} src={session.user.image.medium} alt="User Profile Picture" className={styles.avatar} />
                <Tooltip anchorSelect="#my-tooltip" clickable place="bottom">
                  <ul>
                    <li>Report Bug</li>
                    <li>Sign Out</li>
                  </ul>
                </Tooltip>
              </>
            )}

            <button
              className={styles.button}
              onClick={() => {
                signOut({});
                client.resetStore();
              }}>
              Sign out
            </button>
          </div>
        </>
      )}
      {!session && (
        <>
          <button onClick={() => signIn()} className={styles.button}>
            Sign In
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
