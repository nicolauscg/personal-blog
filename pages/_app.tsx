import "tailwindcss/tailwind.css";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import type { AppProps } from "next/app";
import createEmotionCache from "../components/createEmotionCache";
import { NextComponentType, NextPageContext } from "next";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps {
  Component: NextComponentType<NextPageContext, any, {}>;
  emotionCache: EmotionCache;
  pageProps: any;
}
function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
