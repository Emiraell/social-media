import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../configurations/firebase";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { format } from "date-fns";

export default function Create() {
  const navigate = useNavigate();

  // get user infos if user is loggedIn
  const [userInfos] = useAuthState(auth);

  // set form/data shape
  const schema = yup.object().shape({
    content: yup.string().max(800).min(1).required(),
  });
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  // post collection in our firestore database
  const postRef = collection(db, "posts");

  // add documents to firestore database
  const submitPost = async (data: { content: string }) => {
    const date: number = new Date().getFullYear();
    const month: number = new Date().getMonth();
    const day = new Date().getDate();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const sec = new Date().getSeconds();
    await addDoc(postRef, {
      userId: userInfos?.uid as string,
      userName: userInfos?.displayName as string,
      userPhoto: userInfos?.photoURL as string,
      datePosted: format(
        new Date(date, month, day, hour, minute, sec),
        "yyyy-MM-dd, hh:mm aaa"
      ),
      ...data,
    });
    reset();
    navigate("/social-media");
  };

  return (
    <form onSubmit={handleSubmit(submitPost)} className="p-12 md:p-20">
      {/* create post Header */}
      <div className=" flex justify-between">
        <Link to="/social-media">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <p>Create Post</p>
        <button className=" bg-blue-800 px-4 py-1 rounded " type="submit">
          Post
        </button>
      </div>

      {/* user infos*/}
      <div className="flex items-center mt-10 mb-5">
        <img
          src={`${userInfos?.photoURL}`}
          alt=""
          className="rounded-full h-10"
        />
        <div className="mx-5 text-start">
          <p>{userInfos?.displayName}</p>
          <p className=" text-sm text-gray-400">{userInfos?.email}</p>
        </div>
      </div>

      {/* post input area*/}
      <textarea
        {...register("content")}
        className="h-60 w-full bg-transparent outline-none p-3"
        placeholder="Enter your thoughts"
      />
    </form>
  );
}
