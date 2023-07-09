import * as React from "react";

// Next.js
import Head from "next/head";

const HeadComponent: React.FC<IHeadProps> = ({ title, description }) => {
  return (
    <Head>
      <title>AniCalendar - {title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadComponent;
