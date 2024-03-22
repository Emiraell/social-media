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

export interface likeState {
  userId: string | undefined;
  postId: string | undefined;
}

export const likeSlice = createSlice({
  name: "likes",
  initialState: {},
  reducers: {},
});

const likesRef = collection(db, "likes");
// add like
export const addLikes = createAsyncThunk(
  "post/likes",
  async (data: likeState) => {
    const dataa = await addDoc(likesRef, data);
    return { data: data, dataId: dataa.id };
  }
);

// delete like
export const deleteLike = createAsyncThunk(
  "delete/like",
  async ({ postId, userId }: likeState) => {
    const deleteDocQuery = query(
      likesRef,
      where("postId", "==", postId),
      where("userId", "==", userId)
    );
    const likeToDelData = await getDocs(deleteDocQuery);
    const likeId = likeToDelData.docs[0].id;
    // single doc to delete
    const deletDocs = doc(db, "likes", likeId);
    await deleteDoc(deletDocs);
    return likeId;
  }
);
export default likeSlice.reducer;
