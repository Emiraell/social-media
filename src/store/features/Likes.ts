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

export interface likes {
  allLikes: likeState[];
}
const initialState: likes = { allLikes: [] };
export const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
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
    const likesReff = collection(db, "likes");
    const likesDoc = query(likesReff, where("postId", "==", post));
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
