import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { auth, db } from "../../configurations/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AddComment({ post }) {
  const [userInfos] = useAuthState(auth);

  // form
  const schema = yup.object().shape({
    comment: yup.string().max(100).required(),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const addComment = async (data: { comment: string }, e: any) => {
    const commentsRef = collection(db, "comments");
    await addDoc(commentsRef, {
      ...data,
      userPhoto: userInfos?.photoURL as string,
      userName: userInfos?.displayName as string,
      user: userInfos?.uid as string,
      postId: post?.postId as string,
    });
    e.target.reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(addComment)}
        className=" fixed bottom-0 left-0 right-0 flex items-center justify-center bg-gray-900"
      >
        <textarea
          {...register("comment")}
          className=" bg-transparent outline-none px-10 py-3 overflow-x-visible h-16"
          placeholder="write a comment"
          id="comment"
        />{" "}
        <button type="submit">
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="h-8 text-emerald-500"
          />
        </button>
      </form>
    </div>
  );
}
