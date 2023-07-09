import * as React from "react";

// Modules
import { Header, Footer, Head } from "@/components";

// Styles
import styles from "@/styles/pages/Home.module.scss";
import Link from "next/link";

const Landing = () => {
  return (
    <>
      <Head
        title="Unleash the Power of Nostalgia"
        description="A calendar based on your anilist activities!"
      />

      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Unleash the <br />
          <span className={styles.anilist}>Power of Nostalgia</span>
        </h1>
        <h2 className={styles["sub-title"]}>
          Dive into Your Anime and Manga Journey on a Dynamic Calendar!
        </h2>
        <Link href="/calendar" className={styles.button}>
          Start exploring now
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
