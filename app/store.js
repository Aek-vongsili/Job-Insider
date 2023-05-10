import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ["user"]
}
const reducer = combineReducers({
    job: jobSlice,
    toggle: toggleSlice,
    filter: filterSlice,
    employer: employerSlice,
    employerFilter: employerFilterSlice,
    candidate: candidateSlice,
    candidateFilter: candidateFilterSlice,
    shop: shopSlice,
    user: userSlice
})
const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
    reducer: persistedReducer,


    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false

    }).concat(),
});
