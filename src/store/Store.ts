import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { postSlice } from "./features/Posts";
import { likeSlice } from "./features/Likes";
import { commentSlice } from "./features/comments";

export const store = configureStore({
  reducer: {
    postsReducer: postSlice.reducer,
    likesReducer: likeSlice.reducer,
    commentReducer: commentSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
