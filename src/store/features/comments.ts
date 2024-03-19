import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../configurations/firebase";

export interface comment {
  user: string;
  comment: string;
  postId: string;
  commentId: string;
}

interface comments {
  allComments: comment[];
}
const initialState: comments = { allComments: [] };
export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllComments.fulfilled, (state, action) => {
      state.allComments = action.payload.docs.map(
        (comment) => ({ ...comment.data(), commentId: comment.id } as comment)
      );
    });
  },
});

const commentsRef = collection(db, "comments");
export const getAllComments = createAsyncThunk("get/post", async () => {
  const data = await getDocs(commentsRef);
  return data;
});
