import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../configurations/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function EachComment({ com, setCommentss }) {
  const [userInfos] = useAuthState(auth);
  const commentRef = collection(db, "comments");
  const deleteComment = async () => {
    const deleteQuery = query(
      commentRef,
      where("user", "==", userInfos?.uid),
      where("comment", "==", com.comment),
      where("postId", "==", com.postId)
    );

    const docToQuery = await getDocs(deleteQuery);
    const commentId = docToQuery.docs[0].id;
    console.log(commentId);
    const commentToDelete = doc(db, "comments", commentId);
    await deleteDoc(commentToDelete);
    setCommentss(
      (prev) =>
        prev && prev.filter((comment) => comment.commentId !== commentId)
    );
  };

  useEffect(() => {}, []);

  return (
    <div key={com.postId} className="mx-7 my-5">
      {
        <div className=" flex text-xl justify-between">
          <div className="flex">
            <img
              src={com.userPhoto}
              alt=""
              className="h-14 rounded-full mr-5"
            />
            <div className=" text-start pl-2">
              <p className="text-emerald-500">{com.userName}</p>
              <p className="text-start py-2  ">{com.comment}</p>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faTrash}
            className=""
            onClick={deleteComment}
          />
        </div>
      }
    </div>
  );
}
