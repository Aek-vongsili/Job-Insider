import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
  reduxFirestore,
  getFirestore,
  firestoreReducer,
} from "redux-firestore";
import { firebaseReducer, getFirebase } from "react-redux-firebase";
import jobSlice from "../features/job/jobSlice";
import toggleSlice from "../features/toggle/toggleSlice";
import filterSlice from "../features/filter/filterSlice";
import employerFilterSlice from "../features/filter/employerFilterSlice";
import candidateSlice from "../features/candidate/candidateSlice";
import candidateFilterSlice from "../features/filter/candidateFilterSlice";
import shopSlice from "../features/shop/shopSlice";
import userSlice from "../features/user/userSlice";
import fbConfig from "../firebase/fbConfig";
import { firebaseAuth, AuthReducer } from "../features/auth/reducers";
import { employerSingle, employerReducer } from "../features/employer/reducers";
import { jobReducer, jobSingleReducer } from "../features/jobs/reducers";
import {
  candidateReducer,
  candidateSingleReducer,
} from "../features/candidates/reducers";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    // If you use Redux Toolkit, you should return combined state
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === "LOGOUT_SUCCESS") {
    state = undefined;
  }
  return combineReducers({
    job: jobSlice,
    // fs: firestoreReducer || null,
    firebase: firebaseReducer,
    firebaseAuth,
    auth: AuthReducer,
    toggle: toggleSlice,
    filter: filterSlice,
    employerFilter: employerFilterSlice,
    employerData: employerReducer,
    employerSingle: employerSingle,
    jobs: jobReducer,
    jobSingle: jobSingleReducer,
    candidate: candidateSlice,
    candidates: candidateReducer,
    candidateSingle: candidateSingleReducer,
    candidateFilter: candidateFilterSlice,
    shop: shopSlice,
    user: userSlice,
  })(state, action);
};

export const newStore = () => {
  return createStore(
    reducer,
    compose(
      applyMiddleware(
        thunk.withExtraArgument({
          getFirebase,
          getFirestore,
          storage: firebase.storage,
        })
      ),
      reduxFirestore(fbConfig)
    )
  );
};

export const wrapper = createWrapper(newStore, { debug: false });
