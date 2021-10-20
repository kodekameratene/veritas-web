import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, NormalizeCSS, GlobalStyles } from "@mantine/core";
import React from "react";
import NavigationBar from "../components/NavigationBar";

import firebase from "../firebase/clientApp";
export const db = firebase.firestore();

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Veritas admin</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        theme={{
          colorScheme: "light",
        }}
      >
        {/* <NormalizeCSS /> */}
        {/* <GlobalStyles /> */}
        <Component {...pageProps} />
        {/* <NavigationBar /> */}
      </MantineProvider>
    </>
  );
}
