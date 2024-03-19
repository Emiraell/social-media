import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addLikes, deleteLike, likeState } from "../../store/features/Likes";
import { postState } from "../../store/features/Posts";
import {
  faComment,
  faEllipsis,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../store/Store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../configurations/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function posts({ post }: postState | any) {
  const [userInfos] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const likesCollections = collection(db, "likes");
  const [allLikes, setAllLikes] = useState<likeState[] | null>(null);
  const getAllLikes = async () => {
    const likesDoc = query(
      likesCollections,
      where("postId", "==", post.postId)
    );
    const data = await getDocs(likesDoc);
    try {
      setAllLikes(
        data.docs.map((doc) => ({ userId: doc.data().userId, postId: doc.id }))
      );
    } catch {
      setAllLikes(allLikes);
      alert("Error in fetching likes, please refresh and try again");
    }
  };

  useEffect(() => {
    getAllLikes();
  }, [allLikes]);

  const userLiked = allLikes?.find((like) => like.userId === userInfos?.uid);
  return (
    <div className=" mb-4  bg-blue-950">
      <div className="flex justify-between p-4 ">
        <div className="flex">
          <img src={`${post.userPhoto}`} alt="" className="rounded-full h-12" />

          <div className="px-3 text-start">
            <p>{post.userName}</p>
            <p className="text-gray-400">
              {post.datePosted?.date} {post.datePosted?.month},{" "}
              {post.datePosted?.year}
            </p>
          </div>
        </div>
        <FontAwesomeIcon icon={faEllipsis} className="text-xl" />
      </div>

      <div className="text-start px-4 py-5 pl-6 text-lg md:text-xl">
        {post.content}
      </div>
      <div className="flex justify-evenly py-3 px-2 border-t border-blue-500">
        <p
          onClick={() => {
            const params = { postId: post.postId, userId: userInfos?.uid };
            !userLiked
              ? dispatch(
                  addLikes({ userId: userInfos?.uid, postId: post.postId })
                )
              : dispatch(deleteLike(params));
          }}
        >
          {!userLiked ? (
            <FontAwesomeIcon icon={faThumbsUp} />
          ) : (
            <FontAwesomeIcon icon={faThumbsDown} />
          )}
          Likes {allLikes?.length}
        </p>
        <p>
          <Link to={`/comments/${post.postId}`}>
            <FontAwesomeIcon icon={faComment} /> comments
          </Link>
        </p>
      </div>
    </div>
  );
}
