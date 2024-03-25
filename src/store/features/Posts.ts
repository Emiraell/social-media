import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
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
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.allPosts = state.allPosts.filter(
          (post) => post.postId !== action.payload
        );
      })
      .addCase(deletePost.rejected, (state) => {
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

// delete post from our firestore db and from our state
export interface deleteProps {
  postId: string;
}
export const deletePost = createAsyncThunk(
  "delete/post",
  async ({ postId }: deleteProps) => {
    const postToDelete = await doc(db, "posts", postId);
    await deleteDoc(postToDelete);
    console.log(postId);

    return postId;
  }
);
export default postSlice.reducer;
