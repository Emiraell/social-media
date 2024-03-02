import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../configurations/firebase";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Create() {
  const [userInfos] = useAuthState(auth);

  const schema = yup.object().shape({
    content: yup.string().max(800).min(1).required(),
  });
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  const submitPost = async (data: { content: string }) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(submitPost)} className="p-12">
      {/* create post Header */}
      <div className=" flex justify-between">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <p>Create Post</p>
        <button className=" bg-blue-800 px-4 py-1 rounded " type="submit">
          Post
        </button>
      </div>

      {/* user  infos*/}
      <div className="flex items-center my-10 m-auto md:w-[50%]">
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

      {/* post input */}
      <textarea
        {...register("content")}
        className="h-60 w-full bg-transparent outline-none p-3"
        placeholder="Enter your thoughts"
      />
    </form>
  );
}
