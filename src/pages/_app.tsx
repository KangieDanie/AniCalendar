import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Overpass } from "@next/font/google";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apolloClient";
import { Analytics } from "@vercel/analytics/react";

const overpass = Overpass({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Component {...pageProps} className={overpass.className} />
        <Analytics />
      </SessionProvider>
    </ApolloProvider>
  );
}
