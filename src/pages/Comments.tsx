import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../store/Store";
import { postState } from "../store/features/Posts";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Comments() {
  const { id } = useParams();
  const allPosts = useAppSelector((state) => state.postsReducer.allPosts);
  const [post, setPost] = useState<postState>();

  useEffect(() => {
    allPosts.map((post) => post.postId === id && setPost(post));
  }, []);
  return (
    <div className=" m-auto md:w-[70%] lg:w-[60%]">
      <div className=" fixed flex w-full p-5 items-center">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} className="text-3xl mr-6" />
        </Link>
        <div className="flex items-center">
          <img src={post?.userPhoto} alt="" className="h-14 rounded-full" />
          <div>
            <p className="px-4 text-lg">{post?.userName}</p>
          </div>
        </div>
      </div>
      <div className="pt-36"></div>
      <p className="px-10 text-xl tracking-wide border-b pb-10">
        {post?.content}
      </p>
      <div className=" fixed bottom-10 left-0 right-0 flex items-center justify-center">
        <textarea
          className=" bg-transparent outline-none px-10 py-3 overflow-x-visible h-16"
          placeholder="write a comment"
        />
        <FontAwesomeIcon icon={faPaperPlane} className="h-8 text-emerald-500" />
      </div>
    </div>
  );
}
