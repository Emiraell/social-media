import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/Store";
import { postState } from "../../store/features/Posts";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faClock } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../configurations/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import EachComment from "../comments/EachComment";
import AddComment from "./AddComment";

export interface comment {
  user: string;
  userName: string;
  userPhoto: string;
  comment: string;
  postId: string;
  commentId: string;
}

export default function Comments() {
  // get the param in order to get the post
  const { id } = useParams();

  // all post to get the post the user is commenting on
  const allPosts = useAppSelector(
    (state) => state.persistedReducer.postsReducer.allPosts
  );
  const [post, setPost] = useState<postState | null>(null);
  const [comments, setComments] = useState<comment[]>();

  useEffect(() => {
    // get the post to comment on once the page is loaded
    allPosts.map((post) => post.postId === id && setPost(post));
  }, []);

  // get all comments for this post
  const getcomment = async () => {
    const commentRef = collection(db, "comments");
    const commentToQuery = query(commentRef, where("postId", "==", id));
    // await the data
    const data = await getDocs(commentToQuery);
    setComments(
      data.docs.map((doc) => ({ ...doc.data(), commentId: doc.id } as comment))
    );
  };

  useEffect(() => {
    getcomment();
  }, []);

  return (
    <div className=" m-auto md:w-[70%] lg:w-[60%] md:bg-blue-950 md: h-[100vh] md:mt-16 mt-8">
      <>
        <div className="fixed flex w-full  p-5 items-center">
          <Link to="/social-media">
            <FontAwesomeIcon icon={faArrowLeft} className="h-10 mr-6" />
          </Link>
          <p className="font-bold m-auto text-2xl md:pr-20 md:text-3xl">Post</p>
        </div>
        <div className="pt-24 mx-5 flex">
          <img src={post?.userPhoto} alt="" className="h-14 rounded-full" />

          <div className="text-start text-lg md:text-xl px-4 md:tracking-widest tracking-wide">
            <p className="font-bold  text-emerald-500">{post?.userName}</p>
            {/* post */}
            <p className=" leading-6 py-2 md:text-2xl pr-4">{post?.content}</p>
          </div>
        </div>
        {/* post date and time */}
        <p className="text-gray-400 py-2 border-y mt-3 flex justify-around ">
          <span>
            <FontAwesomeIcon icon={faClock} className="px-1 pl-1" />
            {post?.datePosted.time.hour}:
            {post && post?.datePosted.time.minute < 10 ? (
              <>0{post.datePosted.time.minute}</>
            ) : (
              <>0{post?.datePosted.time.minute}</>
            )}
          </span>

          <span>
            {post?.datePosted?.date} {post?.datePosted?.month},{" "}
            {post?.datePosted?.year}
          </span>
        </p>

        <p className="my-8 text-2xl tracking-wide font-mono text-start px-10 text-gray-300">
          comments
        </p>

        {/* display content based on if comment is available */}
        {comments?.length === 0 ? (
          <p className="pt-10 text-3xl text-gray-700 leading-10">
            No comments found <br /> Add comment{" "}
          </p>
        ) : (
          comments &&
          comments.map((comment) => (
            <EachComment com={comment} setComments={setComments} />
          ))
        )}
        <AddComment post={post} setComments={setComments} />
      </>
    </div>
  );
}
