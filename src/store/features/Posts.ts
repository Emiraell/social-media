import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configurations/firebase";

interface postState {
  userId: string;
  userName: string;
  userPhoto: string;
  date: any;
  content: string;
}

interface allPost {
  allPosts: postState[];
}
const initialState: allPost = { allPosts: [] };
const postRef = collection(db, "posts");
export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.allPosts = action.payload.docs.map((doc) => ({
        ...(doc.data() as postState),
      }));
    });
  },
});

export const getAllPost = createAsyncThunk("get/post", async () => {
  const data = await getDocs(postRef);
  return data;
});

export default postSlice.reducer;
