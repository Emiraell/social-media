import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../configurations/firebase";

interface time {
  hour: number;
  minute: number;
}
interface dateState {
  year: number;
  month: number;
  date: number;
  day: string;
  time: time;
}

export interface postState {
  userId: string;
  userName: string;
  userPhoto: string;
  datePosted: dateState;
  content: string;
  postId: string;
}

interface allPost {
  allPosts: postState[];
}
const initialState: allPost = { allPosts: [] };

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.allPosts = action.payload.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              postId: doc.id,
            } as postState)
        );
      })
      .addCase(getAllPost.rejected, (state) => {
        state.allPosts = [...state.allPosts];
      });
  },
});

// post collection in firestore database
const postRef = collection(db, "posts");

// get all post from firestore
export const getAllPost = createAsyncThunk("get/post", async () => {
  const data = await getDocs(postRef);
  return data;
});

export interface deleteProps {
  postId: string;
  content: string;
  datePosted: dateState;
  userId: string | undefined;
}
export const deletePost = createAsyncThunk(
  "delete/post",
  async ({ postId, content, datePosted, userId }: deleteProps) => {
    const postToQuery = query(
      postRef,
      where("userId", "==", postId),
      where("content", "==", content),
      where("datePosted", "==", datePosted),
      where("userId", "==", userId)
    );

    const queriedPost = await getDocs(postToQuery);
    const docId = queriedPost.docs[0].id;
    const postToDelete = await doc(db, "posts", docId);
    await deleteDoc(postToDelete);

    return docId;
  }
);
export default postSlice.reducer;
