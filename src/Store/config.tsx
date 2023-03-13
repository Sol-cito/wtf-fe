import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import headerBtnSlice from "./Slices/HeaderBtnSlice";
import loginSlice from "./Slices/LoginSlice";
import { modalSlice } from "./Slices/ModalSlice";

const logger = createLogger();

export const rootReducer = combineReducers({
  headerBtn: headerBtnSlice.reducer,
  modal: modalSlice.reducer,
  isLogin: loginSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["headerBtn", "isLogin"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialState,
  enhancers: (defaultEnhancers) => [...defaultEnhancers],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
