import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/index.scss";
import { useEffect } from "react";
import ScrollToTop from "../components/common/ScrollTop";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { wrapper, newStore } from "../app/store";
import firebase from "firebase/compat/app";
import LoadingLayout from "../components/layouts/LoadingLayout";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Head from "next/head";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

function MyApp({ Component, ...rest }) {
  useEffect(() => {
    AOS.init({
      duration: 1400,
      once: true,
    });
  }, []);

  const { store, props } = wrapper.useWrappedStore(rest);
  const rrfConfig = { userProfile: "users", useFirestoreForProfile: true };
  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  };

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <div className="page-wrapper">
          <LoadingLayout>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
            </Head>
            <Component {...props.pageProps} />
          </LoadingLayout>

          {/* Toastify */}
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Scroll To Top */}
          <ScrollToTop />
        </div>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
export default wrapper.withRedux(MyApp);
