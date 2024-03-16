import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../configurations/firebase";

interface likeState {
  userId: string | undefined;
  postId: string | undefined;
}

export interface likes {
  allLikes: likeState[];
}
const initialState: likes = { allLikes: [] };
export const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addLikes.fulfilled, (state, action) => {
        state.allLikes = [
          ...state.allLikes,
          { userId: action.payload.data.userId, postId: action.payload.dataId },
        ];
      })
      .addCase(addLikes.rejected, (state) => {
        state.allLikes = [...state.allLikes];
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        state.allLikes = state.allLikes.filter(
          (like) => like.postId !== action.payload
        );
      })
      .addCase(deleteLike.rejected, (state) => {
        state.allLikes = [...state.allLikes];
      })
      .addCase(getAllLikes.fulfilled, (state, action) => {
        state.allLikes = action.payload.map((doc) => ({
          userId: doc.data().userId,
          postId: doc.id,
        }));
      })
      .addCase(getAllLikes.rejected, (state) => {
        state.allLikes = [...state.allLikes];
      });
  },
});

const likesRef = collection(db, "likes");
export const addLikes = createAsyncThunk(
  "post/likes",
  async (data: likeState) => {
    const dataa = await addDoc(likesRef, data);
    return { data: data, dataId: dataa.id };
  }
);

export const getAllLikes = createAsyncThunk(
  "get/likes",
  async (post: string) => {
    const likesDoc = query(likesRef, where("postId", "==", post));
    const data = await getDocs(likesDoc);
    return data.docs;
  }
);

export const deleteLike = createAsyncThunk(
  "remove/like",
  async ({ postId, userId }: any) => {
    const deleteDocToquery = query(
      likesRef,
      where("postId", "==", postId),
      where("userId", "==", userId)
    );
    const likeToDelData = await getDocs(deleteDocToquery);
    const likeId = likeToDelData.docs[0].id;
    const deletDocs = doc(db, "likes", likeId);
    await deleteDoc(deletDocs);
    return likeId;
  }
);
export default likeSlice.reducer;
