import * as React from "react";

// Next.js
import Head from "next/head";
import styles from "@/styles/components/chip.module.scss";

const Chip: React.FC<IChipProps> = ({ name, color }) => {
  return (
    <div className={styles.chip} style={{ backgroundColor: color }}>
      {name}
    </div>
  );
};

export default Chip;
