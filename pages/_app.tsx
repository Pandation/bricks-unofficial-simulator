import { AppProps } from "next/app";
import Head from "next/head";
import { CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/globals.css";

import "../styles/prism.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Simulateur Non-officiel Bricks.co</title>
        <meta name="description" content="Simulateur non-officiel de gains sur le temps avec Bricks.co" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
