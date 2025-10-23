import * as React from "react";

// Next.js
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

// GraphQL Client
import { client } from "@/apolloClient";

// Styles
import styles from "@/styles/components/header.module.scss";

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
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.nav}>
      <div className={styles.container}>
        <Image
          width={60}
          height={60}
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
        <div className={styles.userContainer} ref={menuRef}>
          {session.user.image && (
            <>
              <div 
                className={styles.userButton}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Avatar image={session.user.image.large} />
                <span className={styles.name}>
                  <strong>{session.user.name}</strong>
                </span>
                <ChevronDownIcon width={16} className={styles.arrow} />
              </div>
              
              {menuOpen && (
                <div className={styles.dropdownMenu}>
                  <a
                    href="https://github.com/KangieDanie/AniCalendar/issues/new"
                    className={styles.menuItem}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExclamationCircleIcon width={20} />
                    <span>Report a bug</span>
                  </a>
                  <a
                    href="https://github.com/KangieDanie/AniCalendar"
                    className={styles.menuItem}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkIcon width={20} />
                    <span>Github</span>
                  </a>
                  <button
                    className={styles.menuItem}
                    onClick={() => {
                      signOut({});
                      client.resetStore();
                    }}
                  >
                    <ArrowLeftOnRectangleIcon width={20} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
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
