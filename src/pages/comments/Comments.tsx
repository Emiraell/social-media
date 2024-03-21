import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/Store";
import { postState } from "../../store/features/Posts";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClock,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../configurations/firebase";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import EachComment from "../comments/EachComment";
import AddComment from "./AddComment";

export default function Comments() {
  const { id } = useParams();
  const allPosts = useAppSelector((state) => state.postsReducer.allPosts);
  const [post, setPost] = useState<postState>();

  const commentRef = collection(db, "comments");

  const [commentss, setCommentss] = useState();

  useEffect(() => {
    allPosts.map((post) => post.postId === id && setPost(post));
  }, []);

  const getcomment = async () => {
    const commentCollection = query(
      commentRef,
      where("postId", "==", post?.postId)
    );

    const data = await getDocs(commentCollection);
    // data.docs.map((doc) => comment.push(doc.data().comment));
    setCommentss(data.docs.map((doc) => doc.data()));
    console.log(data.docs.map((doc) => doc.data().comment));
    // console.log(comments);
    // setComments(com);
    // res.map((re) => comment.push(re));
  };

  useEffect(() => {
    post && getcomment();
    return () => {};
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

        <p className="px-2 text-lg leading-6 tracking-wide py-5 ">
          {post?.content}
        </p>

        <p className="text-gray-400 py-2 border-t">
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
      </div>
      <p className="my-8 mb text-2xl tracking-wider font-mono">comments</p>
      {commentss?.map((com) => (
        <EachComment com={com} key={com.postId} />
      ))}
      <AddComment post={post} />
    </div>
  );
}
