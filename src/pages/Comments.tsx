import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/Store";
import { postState } from "../store/features/Posts";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClock,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { date } from "yup";

export default function Comments() {
  const { id } = useParams();
  const allPosts = useAppSelector((state) => state.postsReducer.allPosts);
  const [post, setPost] = useState<postState>();
  const dispatch = useAppDispatch();
  const [hour, setHour] = useState<number | null>();
  const [minute, setMinute] = useState<string | null>();

  useEffect(() => {
    allPosts.map((post) => post.postId === id && setPost(post));
    if (post) {
      post.datePosted.time.hour > 12
        ? setHour(post.datePosted.time.hour - 12)
        : setHour(post.datePosted.time.hour);

      // set minutes
      post.datePosted.time.minute < 10
        ? setMinute(`0${post.datePosted.time.minute}`)
        : setMinute(`${post.datePosted.time.minute}`);
    }
  }, []);

  return (
    <div className=" m-auto md:w-[70%] lg:w-[60%]">
      <div className=" fixed flex left-0 right-0 p-5 items-center">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} className="text-3xl mr-6" />
        </Link>
        <span className="font-bold m-auto text-2xl md:text-3xl">Post</span>
      </div>
      <div className="pt-24 border-y mx-5">
        <div className="flex items-center border-t pt-5">
          <img src={post?.userPhoto} alt="" className="h-14 rounded-full" />
          <div>
            <p className="px-5 text-lg">{post?.userName}</p>
          </div>
        </div>

        <p className="px-10 text-xl tracking-wide py-5 ">{post?.content}</p>

        <p className="text-gray-400 py-2 border-t">
          <span>
            {hour}:{minute}
            {post && post.datePosted.time.hour > 12 && <span>PM</span>}
          </span>{" "}
          <FontAwesomeIcon icon={faClock} className="pr-3 pl-1" />
          {post?.datePosted?.date} {post?.datePosted?.month},{" "}
          {post?.datePosted?.year}
        </p>
      </div>
      <p className="mt-10 text-2xl tracking-wider font-mono">comments</p>
      <div className=" fixed bottom-10 left-0 right-0 flex items-center justify-center">
        <textarea
          className=" bg-transparent outline-none px-10 py-3 overflow-x-visible h-16"
          placeholder="write a comment"
          id="comment"
        />
        <FontAwesomeIcon icon={faPaperPlane} className="h-8 text-emerald-500" />
      </div>
    </div>
  );
}
