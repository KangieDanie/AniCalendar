import * as React from "react";

// Next.js
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

// GraphQL Client
import { client } from "@/apolloClient";

// Styles
import styles from "@/styles/components/header.module.scss";

// Modules
import { Avatar, Tooltip } from "@nextui-org/react";

// Icons
import {
  ArrowLeftOnRectangleIcon,
  ExclamationCircleIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className={styles.nav}>
      <div className={styles.container}>
        <Image
          width={100}
          height={100}
          className={styles.logo}
          src="/AniCalendarLogo.png"
          alt="AniCalendar Logo"
        />

        <div className={styles.text}>
          <h1 className={styles.title}>
            Ani<span className={styles.blue}>Calendar</span>
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
            <span>
              <small>Welcome!</small>
              <br />
              <strong>{session.user.name}</strong>
            </span>
            {session.user.image && (
              <>
                <Tooltip
                  placement="bottom"
                  css={{
                    color: "#9fadbd",
                    fontSize: "$sm",
                    padding: "5px 10px",
                    width: "150px",
                    borderRadius: "0",
                    backgroundColor: "#0b1622",
                    zIndex: "300",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  offset={8}
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
                >
                  <Avatar
                    css={{
                      margin: "0 1em",
                    }}
                    size="lg"
                    src={session.user.image.medium}
                    alt="User Profile Picture"
                    color="gradient"
                    bordered
                  />
                </Tooltip>
              </>
            )}
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
