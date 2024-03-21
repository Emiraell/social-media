import NavBar from "../../components/NavBar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { getAllPost } from "../../store/features/Posts";
import Posts from "./Posts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../configurations/firebase";

export default function Home() {
  // user information
  const [user] = useAuthState(auth);

  // dispatch our actions and get posts from redux store
  const dispatch = useAppDispatch();
  const allPost = useAppSelector((state) => state.postsReducer.allPosts);

  useEffect(() => {
    dispatch(getAllPost());
  }, []);
  return (
    <div className="">
      <NavBar />
      <div className="pt-36 md:w-[50%] m-auto">
        {/* posts*/}
        {user ? (
          allPost?.map((post) => <Posts post={post} key={post.content} />)
        ) : (
          <p>Login to have full access</p>
        )}
      </div>
    </div>
  );
}
