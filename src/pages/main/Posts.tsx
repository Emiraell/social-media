import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addLikes, deleteLike, getAllLikes } from "../../store/features/Likes";
import { postState } from "../../store/features/Posts";
import {
  faComment,
  faEllipsis,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../configurations/firebase";
import { useEffect } from "react";
// import { useEffect } from "react";

export default function posts({ post }: postState | any) {
  const [userInfos] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const likes = useAppSelector((state) => state.likesReducer.allLikes);

  useEffect(() => {
    dispatch(getAllLikes(post.postId));
  }, []);

  const userLiked = likes.find((like) => like.userId === userInfos?.uid);
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
            // dispatch(getAllLikes(post.postId));
          }}
        >
          {!userLiked ? (
            <FontAwesomeIcon icon={faThumbsUp} />
          ) : (
            <FontAwesomeIcon icon={faThumbsDown} />
          )}
          Likes {likes.length}
        </p>
        <p>
          <FontAwesomeIcon icon={faComment} /> comments
        </p>
      </div>
    </div>
  );
}
