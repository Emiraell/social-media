import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../configurations/firebase";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Create() {
  const navigate = useNavigate();

  // get user infos if user is loggedIn
  const [userInfos] = useAuthState(auth);

  // set form/data shape
  const schema = yup.object().shape({
    content: yup.string().max(800).min(1).required(),
  });
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  // post collection in our firestore database
  const postRef = collection(db, "posts");

  // get date of making post
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const getDay = () => {
    const date: number = new Date().getDay();
    date === 0 && setDay("Sun");
    date === 1 && setDay("Mon");
    date === 2 && setDay("Tue");
    date === 3 && setDay("Wed");
    date === 4 && setDay("Thu");
    date === 5 && setDay("Fri");
    date === 6 && setDay("Sat");

    const month: number = new Date().getMonth();
    month === 0 && setMonth("Jan");
    month === 1 && setMonth("Feb");
    month === 2 && setMonth("Mar");
    month === 3 && setMonth("Apr");
    month === 4 && setMonth("May");
    month === 5 && setMonth("Jun");
    month === 6 && setMonth("Jul");
    month === 7 && setMonth("Aug");
    month === 8 && setMonth("Sep");
    month === 9 && setMonth("Oct");
    month === 10 && setMonth("Nov");
    month === 11 && setMonth("Dec");
  };

  // add documents to firestore database
  const submitPost = async (data: { content: string }, e: any) => {
    const date: Date = new Date();
    await addDoc(postRef, {
      userId: userInfos?.uid as string,
      userName: userInfos?.displayName as string,
      userPhoto: userInfos?.photoURL as string,
      datePosted: {
        year: date.getFullYear() as number,
        month: month as string,
        date: date.getDate() as number,
        day: day as string,
        time: {
          hour: date.getHours() as number,
          minute: date.getMinutes() as number,
        },
      },
      ...data,
    });
    e.target.reset();
    navigate("/");
  };

  useEffect(() => {
    getDay();
  }, [day, month]);

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

      {/* user infos*/}
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

      {/* post input area*/}
      <textarea
        {...register("content")}
        className="h-60 w-full bg-transparent outline-none p-3"
        placeholder="Enter your thoughts"
      />
    </form>
  );
}
