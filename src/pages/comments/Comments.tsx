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
  const allPosts = useAppSelector((state) => state.postsReducer.allPosts);
  const [post, setPost] = useState<postState | null>(null);
  const [comments, setComments] = useState<comment[]>();

  useEffect(() => {
    // get the post to comment on once the page is loaded
    allPosts.map((post) => post.postId === id && setPost(post));
  }, []);

  // get all comments for this post
  const getcomment = async () => {
    const commentRef = collection(db, "comments");
    const commentToQuery = query(
      commentRef,
      where("postId", "==", post?.postId)
    );
    // await the data
    const data = await getDocs(commentToQuery);
    setComments(
      data.docs.map((doc) => ({ ...doc.data(), commentId: doc.id } as comment))
    );
  };

  useEffect(() => {
    post && getcomment();
  }, []);

  return (
    <div className=" m-auto md:w-[70%] lg:w-[60%] md:bg-blue-950 md:mt-16 mt-8">
      <>
        <div className="fixed flex w-full p-5 items-center">
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} className="text-3xl mr-6" />
          </Link>
          <span className="font-bold m-auto text-2xl md:text-3xl">Post</span>
        </div>
        <div className="pt-24 mx-5 flex">
          <img src={post?.userPhoto} alt="" className="h-14 rounded-full" />

          <div className="text-start text-lg px-4">
            <p className="font-bold tracking-wider text-emerald-500">
              {post?.userName}
            </p>
            {/* post */}
            <p className=" leading-6 tracking-wide py-2 ">{post?.content}</p>
          </div>
        </div>
        {/* post date and time */}
        <p className="text-gray-400 py-2 border-y mt-3">
          <span>
            {post?.datePosted.time.hour}:
            {post && post?.datePosted.time.minute < 10 ? (
              <>0{post.datePosted.time.minute}</>
            ) : (
              <>0{post?.datePosted.time.minute}</>
            )}
          </span>
          <FontAwesomeIcon icon={faClock} className="pr-3 pl-1" />
          {post?.datePosted?.date} {post?.datePosted?.month},{" "}
          {post?.datePosted?.year}
        </p>

        <p className="my-8 text-2xl tracking-wide font-mono text-start px-10 text-gray-300">
          comments
        </p>

        {/* display content based on if comment is available */}
        {!comments ? (
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
