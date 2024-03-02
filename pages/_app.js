import Aos from "aos";
import "aos/dist/aos.css";
import "../styles/index.scss";
import { useEffect } from "react";
import ScrollToTop from "../components/common/ScrollTop";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { wrapper, newStore } from "../app/store";
import firebase from "firebase/compat/app";
import fbConfig from "../firebase/fbConfig";
import LoadingLayout from "../components/layouts/LoadingLayout";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, ...rest }) {
  useEffect(() => {
    Aos.init({
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
