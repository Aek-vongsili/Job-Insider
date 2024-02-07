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

function MyApp({ Component, ...rest }) {
  if (!firebase.apps.length) {
    firebase.initializeApp(fbConfig);
  }

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
          {/* Scroll To Top */}
          <ScrollToTop />
        </div>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
export default wrapper.withRedux(MyApp);
