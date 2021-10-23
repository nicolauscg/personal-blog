import "tailwindcss/tailwind.css";
// use copied css styling from react-notion-x for customization
import "../styles/react-notion-x-styles.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism.css";

import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../styles/theme";
import createEmotionCache from "../lib/createEmotionCache";
import { NextComponentType, NextPageContext } from "next";
import Layout from "../components/Layout";
import { PagePropsWithLayout } from "../lib/types";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps {
  Component: NextComponentType<NextPageContext, any, {}>;
  emotionCache: EmotionCache;
  pageProps: any;
}

function MyApp(props: PagePropsWithLayout<MyAppProps>) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
