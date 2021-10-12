import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import NavigationBar from "../components/NavigationBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NavigationBar />
      <div style={{ padding: 12 }}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
export default MyApp;
