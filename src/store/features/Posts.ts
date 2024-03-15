import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configurations/firebase";

interface dateState {
  year: number;
  month: number;
  date: number;
  day: string;
}

export interface postState {
  userId: string;
  userName: string;
  userPhoto: string;
  date: any;
  datePosted: dateState;
  content: string;
  postId: string;
  userLiked: boolean;
}

interface likeState {
  userId: string | undefined;
  postId: string | undefined;
}
interface allPost {
  allPosts: postState[];
  allLikes: likeState[];
}
const initialState: allPost = { allPosts: [], allLikes: [] };
const postRef = collection(db, "posts");
const likesRef = collection(db, "likes");
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
              userLiked: false,
            } as postState)
        );
      })
      .addCase(getAllLikes.fulfilled, (state, action) => {
        state.allLikes = action.payload.docs.map(
          (doc) => ({ userId: doc.data().userId } as any)
        );
      })
      .addCase(getAllLikes.rejected, (state) => {
        state.allLikes = state.allLikes;
      });
  },
});

export const getAllPost = createAsyncThunk("get/post", async () => {
  const data = await getDocs(postRef);
  return data;
});
export const getAllLikes = createAsyncThunk(
  "get/likes",
  async (post: string) => {
    const likesDoc = query(likesRef, where("postId", "==", post));
    const data = await getDocs(likesDoc);
    return data;
  }
);

export const addLikes = createAsyncThunk(
  "post/likes",
  async (data: likeState) => {
    await addDoc(likesRef, data);
  }
);

export default postSlice.reducer;
