import styles from "@/styles/Home.module.css";
import * as React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { client } from "@/apolloClient";
const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className={styles.header_nav}>
      <h1 className={styles.header_title}>
        Ani<span className={styles.lightblue}>Calendar</span>
      </h1>

      {!session && (
        <>
          <button onClick={() => signIn()} className={styles.signin_button}>
            Sign In
          </button>
        </>
      )}
      {session?.user && (
        <>
          <div className={styles.profile_container}>
            {session.user.image && (
              <Image
                width={50}
                height={50}
                src={session.user.image.medium}
                alt="User Profile Picture"
                className={styles.avatar}
              />
            )}
            <span className={styles.signedInText}>
              <small>Welcome! </small>
              <br />
              <strong>{session.user.name}</strong>
            </span>
            {/* href={`/api/auth/signout`} */}
            <button
              className={styles.signin_button}
              onClick={() => {
                signOut({});
                client.resetStore();
              }}
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
