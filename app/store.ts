import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
} from "@reduxjs/toolkit";
import jobSlice from "../features/job/jobSlice";
import toggleSlice from "../features/toggle/toggleSlice";
import filterSlice from "../features/filter/filterSlice";
import employerSlice from "../features/employer/employerSlice";
import employerFilterSlice from "../features/filter/employerFilterSlice";
import candidateSlice from "../features/candidate/candidateSlice";
import candidateFilterSlice from "../features/filter/candidateFilterSlice";
import shopSlice from "../features/shop/shopSlice";
import userSlice from "../features/user/userSlice";
import thunk from "redux-thunk";
import session from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
// import storage from 'redux-persist/lib/storage'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const combinedReducer = combineReducers({
  job: jobSlice,
  toggle: toggleSlice,
  filter: filterSlice,
  employer: employerSlice,
  employerFilter: employerFilterSlice,
  candidate: candidateSlice,
  candidateFilter: candidateFilterSlice,
  shop: shopSlice,
  user: userSlice,
});

// const reducer = (
//   state: ReturnType<typeof combinedReducer>,
//   action: AnyAction
// ) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

const makeConfiguredStore = () =>
  configureStore({
    reducer: combinedReducer,
    devTools: true,
    middleware: [thunk],
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false

    // }).concat()
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    
    const persistConfig = {
      key: "root",
      storage: storage,
      whitelist: ["user"],
    };
    const persistedReducer = persistReducer(persistConfig, combinedReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
      middleware: [thunk],
      devTools: process.env.NODE_ENV !== "production",

      // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      //     serializableCheck: false

      // }).concat()
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppAppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
