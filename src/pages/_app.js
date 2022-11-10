/* eslint-disable react/prop-types */

import { initializeFirebase } from "../utils/firebase-utils.mjs";

function MainApp({ Component, pageProps }) {
  initializeFirebase();
  return <Component {...pageProps} />;
}

export default MainApp;
