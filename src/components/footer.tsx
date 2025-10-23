import * as React from "react";

// Styles
import styles from "@/styles/components/footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Made with ❤️ by{" "}
          <a href="https://anilist.co/user/KangieDanie/" className={styles.link}>
            Issam El Nasiri
          </a>
        </p>
        <div className={styles.links}>
          <a 
            href="https://github.com/KangieDanie/AniCalendar" 
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className={styles.separator}>•</span>
          <a 
            href="https://anilist.co" 
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            AniList
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
