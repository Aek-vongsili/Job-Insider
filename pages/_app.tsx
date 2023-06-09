import Aos from "aos";
import "aos/dist/aos.css";
import "../styles/index.scss";
import { useEffect } from "react";
import ScrollToTop from "../components/common/ScrollTop";
import { Provider, useStore } from "react-redux";
import { wrapper } from "../app/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import type { AppProps } from "next/app";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

function MyApp({ Component, pageProps }: AppProps) {
  const store:any = useStore();
  // const { store, props } = wrapper.useWrappedStore(rest);

  // aos animation activation
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);
  // const persistor = persistStore(store)

  return (
    // <Provider store={store}>
    <PersistGate persistor={store.__persistor} loading={null}>
      <div className="page-wrapper">
        <Component {...pageProps} />

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
    // </Provider>
  );
}

export default wrapper.withRedux(MyApp);