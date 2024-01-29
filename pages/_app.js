import Aos from "aos";
import "aos/dist/aos.css";
import "../styles/index.scss";
import { useEffect } from "react";
import ScrollToTop from "../components/common/ScrollTop";
import { Provider, useStore } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "../app/store";
import { persistStore } from "redux-persist";

import LoadingLayout from "../components/layouts/LoadingLayout";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

function MyApp({ Component, pageProps }) {
  // const { store, props } = wrapper.useWrappedStore(rest);
  const persitor = persistStore(store);
  // aos animation activation
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);
  // const persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate persistor={persitor} loading={null}>
        <div className="page-wrapper">
          <LoadingLayout>
            <Component {...pageProps} />
          </LoadingLayout>

          {/* Toastify */}
          <ToastContainer
            position="bottom-right"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {/* <!-- Scroll To Top --> */}
          <ScrollToTop />
        </div>
      </PersistGate>
    </Provider>
  );
}


export default MyApp;
