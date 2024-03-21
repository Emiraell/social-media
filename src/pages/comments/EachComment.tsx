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

export default function EachComment({ com }) {
  const [userInfos] = useAuthState(auth);
  const commentRef = collection(db, "comments");
  const deleteComment = async () => {
    const deleteQuery = query(
      commentRef,
      where("PostId", "==", com.postId),
      where("user", "==", userInfos?.uid)
    );

    const docToQuery = await getDocs(deleteQuery);
    const commentId = docToQuery.docs[0].id;
    const commentToDelete = doc(db, "comments", commentId);
    await deleteDoc(commentToDelete);
  };

  return (
    <div key={com.postId} className="mx-7 my-5">
      <div className=" flex text-xl justify-between">
        <div className="flex">
          <img src={com.userPhoto} alt="" className="h-14 rounded-full mr-5" />
          <div className=" text-start pl-2">
            <p className="text-emerald-500">{com.userName}</p>
            <p className="text-start py-2  ">{com.comment}</p>
          </div>
        </div>
        <FontAwesomeIcon icon={faTrash} className="" onClick={deleteComment} />
      </div>
    </div>
  );
}
