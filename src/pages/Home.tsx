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
import { getAllPost } from "../store/features/Posts";

// interface postState {
//   userId: string;
//   userName: string;
//   userPhoto: string;
//   date: any;
//   content: string;
// }

export default function Home() {
  const [userInfos] = useAuthState(auth);
  // const postRef = collection(db, "posts");

  // const [allPost, setAllPost] = useState<postState[]>();

  // const getPost = async () => {
  //   let data = await getDocs(postRef);
  //   // data.docs.map((doc) => allPost.push(doc.data() as postState));
  //   setAllPost(data.docs.map((doc) => ({ ...(doc.data() as postState) })));
  // };

  const dispatch = useAppDispatch();
  const allPost = useAppSelector((state) => state.postsReducer.allPosts);

  useEffect(() => {
    dispatch(getAllPost());
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
                    {post.datePosted.date} {post.datePosted.month},{" "}
                    {post.datePosted.year}
                  </p>
                </div>
              </div>
              <FontAwesomeIcon icon={faEllipsis} className="text-xl" />
            </div>

            <div className="text-start px-4 py-5 pl-6 text-lg md:text-xl">
              {post.content}
            </div>
            <div className="flex justify-evenly py-3 px-2 border-t border-blue-500">
              <p>
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
