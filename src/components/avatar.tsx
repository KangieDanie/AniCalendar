import * as React from "react";

// Next.js
import Image from "next/image";

// Styles
import styles from "@/styles/components/avatar.module.scss";

const Avatar: React.FC<IAvatarProps> = ({ image }) => {
  return (
    <div className={styles.circle}>
      <Image width={60} height={60} src={image} alt="AniCalendar Logo" />
    </div>
  );
};

export default Avatar;
