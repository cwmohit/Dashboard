import React from "react";
import { wrapper } from "../redux/store";
import "../styles/globals.scss";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Greedy-Analytics</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      />
    </Head>
    <Component {...pageProps} />
  </>
);

export default wrapper.withRedux(MyApp);
