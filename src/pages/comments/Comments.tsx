import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { postState } from "../../store/features/Posts";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faClock } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../configurations/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import EachComment from "../comments/EachComment";
import AddComment from "./AddComment";

export default function Comments() {
  const { id } = useParams();
  const allPosts = useAppSelector((state) => state.postsReducer.allPosts);
  const [post, setPost] = useState<postState | null>(null);
  const [gottenPost, setGottenComments] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const commentRef = collection(db, "comments");

  const [commentss, setCommentss] = useState();

  useEffect(() => {
    allPosts.map((post) => post.postId === id && setPost(post));
    console.log(post, "posttt");
  }, []);

  const getcomment = async () => {
    const commentCollection = query(
      commentRef,
      where("postId", "==", post?.postId)
    );

    const data = await getDocs(commentCollection);
    setCommentss(
      data.docs.map((doc) => ({ ...doc.data(), commentId: doc.id }))
    );
    console.log(data.docs.map((doc) => ({ ...doc.data(), commentId: doc.id })));
    setGottenComments(true);
  };

  useEffect(() => {
    getcomment();
    console.log(post, "post", allPosts);
    // setGottenComments(true);
  }, []);

  return (
    <div className=" m-auto md:w-[70%] lg:w-[60%]">
      <div>
        <div className="fixed flex left-0 right-0 p-5 items-center">
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
            <p className=" leading-6 tracking-wide py-2 ">{post?.content}</p>
          </div>
        </div>

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

        <p className="my-8 text-2xl tracking-wide font-mono">comments</p>
        {!commentss ? (
          <p className="pt-10">Loading</p>
        ) : (
          commentss?.map((com) => (
            <EachComment com={com} key={com} setCommentss={setCommentss} />
          ))
        )}
        <AddComment post={post} setCommentss={setCommentss} />
      </div>
    </div>
  );
}
