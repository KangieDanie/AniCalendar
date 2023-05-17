import * as React from "react";

// Next.js
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

// GraphQL Client
import { client } from "@/apolloClient";

// Styles
import styles from "@/styles/components/header.module.scss";

// Modules
import { Tooltip } from "@nextui-org/react";

// Icons
import {
  ArrowLeftOnRectangleIcon,
  ExclamationCircleIcon,
  LinkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Avatar from "./avatar";

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className={styles.nav}>
      <div className={styles.container}>
        {/* <Image
          width={60}
          height={60}
          className={styles.logo}
          src="/AniCalendarLogo.png"
          alt="AniCalendar Logo"
        /> */}

        <div className={styles.text}>
          <h1 className={styles.title}>
            Ani<span className={styles.blue}>Calendar</span>
            <span className={styles.badge}>V2</span>
          </h1>
          <span className={styles.sub}>
            View your personal <span className={styles.blue}>AniList</span>{" "}
            calendar!
          </span>
        </div>
      </div>

      {session?.user && (
        <>
          <div className={styles.container}>
            {session.user.image && (
              <>
                <Tooltip
                  placement="bottom"
                  style={{ alignItems: "center", cursor: "pointer" }}
                  css={{
                    color: "#9fadbd",
                    fontSize: "$sm",
                    padding: "5px 10px",
                    width: "150px",
                    borderRadius: "5px",
                    backgroundColor: "#0b1622",
                    zIndex: "300",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  offset={2}
                  content={
                    <div className={styles.menu}>
                      <a
                        href="https://github.com/KangieDanie/AniCalendar/issues/new"
                        className={styles.item}
                      >
                        <ExclamationCircleIcon
                          width={25}
                          className="h-6 w-6 text-blue-500"
                        />
                        <span className={styles.desc}>Report a bug</span>
                      </a>
                      <a
                        href="https://github.com/KangieDanie/AniCalendar"
                        className={styles.item}
                      >
                        <LinkIcon
                          width={25}
                          className="h-6 w-6 text-blue-500"
                        />
                        <span className={styles.desc}>Github</span>
                      </a>
                      <a
                        className={styles.item}
                        onClick={() => {
                          signOut({});
                          client.resetStore();
                        }}
                      >
                        <ArrowLeftOnRectangleIcon
                          width={25}
                          className="h-6 w-6 text-blue-500"
                        />
                        <span className={styles.desc}>Sign Out</span>
                      </a>
                    </div>
                  }
                  hideArrow
                  shadow={false}
                >
                  <Avatar image={session.user.image.large} />
                  <span className={styles.name}>
                    <strong>{session.user.name}</strong>
                  </span>
                  <ChevronDownIcon width={16} className={styles.arrow} />
                </Tooltip>
              </>
            )}
          </div>
        </>
      )}
      {!session && (
        <>
          <button className={styles.button}>Sign In</button>
        </>
      )}
    </header>
  );
};
// onClick={() => signIn()}
export default Header;
