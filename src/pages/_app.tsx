// Next.js
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { Overpass } from "@next/font/google";

// GraphQL
import { ApolloProvider } from "@apollo/client";
import { client } from "../apolloClient";

// Vercel
import { Analytics } from "@vercel/analytics/react";

// Styles
import "@/styles/globals.scss";
import "@/styles/components/tooltip.scss";

const overpass = Overpass({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Component {...pageProps} className={overpass.className} />
        <Analytics />
      </SessionProvider>
    </ApolloProvider>
  );
}
