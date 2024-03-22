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
import { comment } from "./Comments";

interface IProps {
  com: comment;
  setComments: any;
}

export default function EachComment({ com, setComments }: IProps) {
  // user infor
  const [userInfos] = useAuthState(auth);

  // delete comment from firestore database and from our comment state
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
    setComments(
      (prev: comment[]) =>
        prev && prev.filter((comment) => comment.commentId !== commentId)
    );
  };

  return (
    <div className="mx-7 my-5">
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
            className=" text-red-500"
            onClick={deleteComment}
          />
        </div>
      }
    </div>
  );
}
