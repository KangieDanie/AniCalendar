// Next.js
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Overpass } from "next/font/google";

// GraphQL
import { ApolloProvider } from "@apollo/client";
import { client } from "../apolloClient";

// Vercel
import { Analytics } from "@vercel/analytics/react";

// Styles
import "@/styles/globals.scss";

// Modules
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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
        <NextThemesProvider defaultTheme="dark" attribute="class">
          <NextUIProvider>
            <Component {...pageProps} className={overpass.className} />
            <Analytics />
          </NextUIProvider>
        </NextThemesProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
