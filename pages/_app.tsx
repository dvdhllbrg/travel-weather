import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Figure out what to plan for your next trip by seeing what the weather will be like at all your travel destinations!"
        />
        <title key="title">Travel Weather</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Script
        strategy="lazyOnload"
        data-website-id="5d9e2c49-5ded-425b-98d9-0fbdd38a03dc"
        data-do-not-track="true"
        data-domains="travelweather.me"
        src="https://umami-five-cyan.vercel.app/umami.js"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
