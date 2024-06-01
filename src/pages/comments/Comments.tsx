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
import { format } from "date-fns";

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
    <div className=" mx-auto md:w-[70%] lg:w-[60%] md:bg-blue-950 md: h-[100vh] pt-8">
      <>
        <div className=" flex w-full px-5 pb-3 items-center">
          <Link to="/social-media">
            <FontAwesomeIcon icon={faArrowLeft} className="h-8" />
          </Link>
          <p className="font-bold m-auto text-xl">Post</p>
        </div>
        <div className="md:pt-8 mx-5 flex">
          <img src={post?.userPhoto} alt="" className="h-12 rounded-full" />

          <div className="text-start px-4 md:tracking-wide">
            <p className="font-bold text-emerald-500">{post?.userName}</p>

            {/* post */}
            <p className=" py-2 pr-4">{post?.content}</p>
          </div>
        </div>

        {/* post date and time */}
        <p className="text-gray-400 py-2 border-y mt-3 flex justify-around text-sm">
          <span>
            <FontAwesomeIcon icon={faClock} className="px-1 pl-1" />
            {post?.datePosted && format(post?.datePosted, "hh:mm aaa")}
          </span>

          <span>
            {post?.datePosted && format(post?.datePosted, "MMM dd, yyyy")}
          </span>
        </p>

        <p className="my-8 text-2xl font-mono px-10 text-gray-300">comments</p>

        {/* display content based on if comment is available */}
        {comments?.length === 0 ? (
          <p className="pt-10 text-3xl text-gray-600 leading-10">
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
