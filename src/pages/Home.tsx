// import { collection, getDocs } from "firebase/firestore";
import NavBar from "../components/NavBar";
import { auth } from "../configurations/firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEllipsis,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../store/Store";
import { addLikes, getAllPost } from "../store/features/Posts";

export default function Home() {
  const [userInfos] = useAuthState(auth);

  const dispatch = useAppDispatch();
  const allPost = useAppSelector((state) => state.postsReducer.allPosts);

  useEffect(() => {
    dispatch(getAllPost());
    console.log(allPost);
  }, []);
  return (
    <div className="">
      <NavBar />
      <div className="pt-36 md:w-[50%] m-auto">
        {/* post */}
        {allPost?.map((post) => (
          <div key={post.userId} className=" mb-4  bg-blue-950">
            <div className="flex justify-between p-4 ">
              <div className="flex">
                <img
                  src={`${post.userPhoto}`}
                  alt=""
                  className="rounded-full h-12"
                />
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
                onClick={() =>
                  dispatch(
                    addLikes({ userId: userInfos?.uid, postId: post.postId })
                  )
                }
              >
                <FontAwesomeIcon icon={faThumbsUp} /> Likes
              </p>
              <p>
                <FontAwesomeIcon icon={faComment} /> comments
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
