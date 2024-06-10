/* eslint-disable react-hooks/rules-of-hooks */
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
import { format } from "date-fns";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postLikes]);

  // check if current user logged in has liked the post
  const userLiked = postLikes?.find((like) => like.userId === userInfos?.uid);

  return (
    <div className=" mb-4  bg-blue-950">
      <div className="flex justify-between p-4 ">
        <div className="flex">
          <img src={`${post.userPhoto}`} alt="" className="rounded-full h-12" />

          <div className="px-3 text-start w-full">
            <p>{post.userName}</p>
            <div className="text-gray-400 text-sm flex items-center justify-between">
              {/* format date using date-fns package */}
              <p>
                {post.datePosted && format(post.datePosted, "eee, dd MMM yy ")}
              </p>
              <p className="px-2">at</p>
              <p className="">
                {post.datePosted && format(post.datePosted, "hh:mm aaa")}
              </p>
            </div>
          </div>
        </div>

        {/* delete functionality to only users who made the ppost */}
        {userInfos?.uid === post.userId && (
          <div className=" relative">
            <FontAwesomeIcon
              icon={faEllipsis}
              className="text-xl cursor-pointer"
              onClick={() => setOpenEllipsis(!openEllipsis)}
            />
            {openEllipsis && (
              <p
                className=" absolute -left-8 cursor-pointer w-fit text-red-500 bg-gray-200 p-1 rounded-md hover:text-gray-100 hover:bg-red-500 "
                onClick={() => {
                  const deleteParams: deleteProps = {
                    postId: post.postId,
                  };
                  dispatch(deletePost(deleteParams));
                }}
              >
                Delete
              </p>
            )}
          </div>
        )}
      </div>
      <div className="text-start px-4 py-5 pl-6 text-lg md:text-xl tracking-wide">
        <Link to={`/social-media/comments/${post.postId}`}>{post.content}</Link>
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
          <span
            className={`${
              userLiked && "text-blue-500"
            } text-xl tracking-widest cursor-pointer`}
          >
            <FontAwesomeIcon icon={faThumbsUp} className={` px-2`} /> like
          </span>
        </p>
        <p>
          <Link to={`/social-media/comments/${post.postId}`}>
            <FontAwesomeIcon icon={faComment} className=" cursor-pointer" />{" "}
            comments
          </Link>
        </p>
      </div>
    </div>
  );
}
