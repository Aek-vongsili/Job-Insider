import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppAppDispatch, AppState } from "./store";

export const useAppDispatch = () => useDispatch<AppAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
