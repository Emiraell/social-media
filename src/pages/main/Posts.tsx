import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addLikes, deleteLike, likeState } from "../../store/features/Likes";
import { deletePost, deleteProps, postState } from "../../store/features/Posts";
import {
  faComment,
  faEllipsis,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../store/Store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../configurations/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

interface Ipost {
  post: postState;
}

export default function posts({ post }: Ipost) {
  // user info
  const [userInfos] = useAuthState(auth);
  // dispatch
  const dispatch = useAppDispatch();
  const [postLikes, setPostLikes] = useState<likeState[] | null>(null);
  const [openEllipsis, setOpenEllipsis] = useState<boolean>(false);

  // get all likes functionality
  const likesRef = collection(db, "likes");
  const getPostLikes = async () => {
    const likesDoc = query(likesRef, where("postId", "==", post.postId));
    const data = await getDocs(likesDoc);
    try {
      setPostLikes(
        data.docs.map((doc) => ({ userId: doc.data().userId, postId: doc.id }))
      );
    } catch {
      setPostLikes(postLikes);
      alert("Error in fetching likes, please refresh and try again");
    }
  };

  useEffect((): (() => void) => {
    getPostLikes();
    return () => {};
  }, [postLikes]);

  // check if current user logged in has liked the post
  const userLiked = postLikes?.find((like) => like.userId === userInfos?.uid);

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
        <div className=" relative">
          <FontAwesomeIcon
            icon={faEllipsis}
            className="text-xl"
            onClick={() => setOpenEllipsis(!openEllipsis)}
          />
          {openEllipsis && (
            <p
              className=" absolute -left-8 "
              onClick={() => {
                const deleteParams: deleteProps = {
                  postId: post.postId,
                  datePosted: post.datePosted,
                  userId: userInfos?.uid,
                  content: post.content,
                };
                dispatch(deletePost(deleteParams));
              }}
            >
              Delete
            </p>
          )}
        </div>
      </div>
      <div className="text-start px-4 py-5 pl-6 text-lg md:text-2xl tracking-wider">
        {post.content}
      </div>
      {postLikes && postLikes.length > 0 && (
        <p className="text-start px-10 text-2xl py-2">
          <FontAwesomeIcon icon={faThumbsUp} className="px-2" />
          {postLikes.length}
        </p>
      )}
      <div className="flex justify-evenly py-3 px-2 border-t border-blue-500">
        <p
          onClick={() => {
            const deleteLikeParams: likeState = {
              postId: post.postId,
              userId: userInfos?.uid,
            };
            // dispatch either the addlike or deletelike depending if the user has liked or not
            !userLiked
              ? dispatch(
                  addLikes({ userId: userInfos?.uid, postId: post.postId })
                )
              : dispatch(deleteLike(deleteLikeParams));
          }}
        >
          <p
            className={`${
              userLiked && "text-blue-500"
            } text-2xl tracking-widest`}
          >
            <FontAwesomeIcon icon={faThumbsUp} className={` px-2 `} /> like
          </p>
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
