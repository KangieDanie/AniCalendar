import * as React from "react";

// Styles
import styles from "@/styles/components/footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <h5>
        © Issam El Nasiri &quot;
        <a href="https://anilist.co/user/KangieDanie/" className={styles.anilist}>
          KangieDanie
        </a>
        &quot; | 2023
      </h5>
    </footer>
  );
};

export default Footer;
