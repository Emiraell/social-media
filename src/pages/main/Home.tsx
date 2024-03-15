// import { collection, getDocs } from "firebase/firestore";
import NavBar from "../../components/NavBar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { getAllPost } from "../../store/features/Posts";
import Posts from "./Posts";

export default function Home() {
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
          <Posts post={post} key={post.content} />
        ))}
      </div>
    </div>
  );
}
