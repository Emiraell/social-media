import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { postSlice } from "./features/Posts";
import { likeSlice } from "./features/Likes";

// using redux-persist to prevent data loss on page refresh
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  postsReducer: postSlice.reducer,
  likesReducer: likeSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: { persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// dispatch
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
// selector
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
