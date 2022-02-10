import React from "react"
import { wrapper } from "../redux/store"
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps}) => (
  <Component {...pageProps} />
)

export default wrapper.withRedux(MyApp);