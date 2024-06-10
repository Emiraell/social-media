import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { auth, db } from "../../configurations/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { postState } from "../../store/features/Posts";
import { comment } from "./Comments";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  post: postState | null;
  setComments: Dispatch<SetStateAction<comment[] | undefined>>;
}

export default function AddComment({ post, setComments }: IProps) {
  const [userInfos] = useAuthState(auth);

  // form settings
  const schema = yup.object().shape({
    comment: yup.string().max(100).required(),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // add comment to firestore database
  const addComment = async (data: { comment: string }) => {
    try {
      const commentsRef = collection(db, "comments");
      const newDoc = await addDoc(commentsRef, {
        ...data,
        userPhoto: userInfos?.photoURL as string,
        userName: userInfos?.displayName as string,
        user: userInfos?.uid as string,
        postId: post?.postId as string,
      });

      // set comment adding to firestore database
      setComments((prev: comment[] | undefined) =>
        prev
          ? [
              ...prev,
              {
                ...data,
                userPhoto: userInfos?.photoURL,
                userName: userInfos?.displayName,
                user: userInfos?.uid,
                postId: post?.postId,
                commentId: newDoc.id,
              } as comment,
            ]
          : [
              {
                ...data,
                userPhoto: userInfos?.photoURL,
                userName: userInfos?.displayName,
                user: userInfos?.uid,
                postId: post?.postId,
                commentId: newDoc.id,
              } as comment,
            ]
      );
      reset();
    } catch {
      setComments((prev: comment[] | undefined) => prev);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(addComment)}
      className=" bg-gray-900 fixed bottom-0 md:w-[70%] lg:w-[60%] flex items-center px-5"
    >
      <div className="relative w-[90%] ">
        <textarea
          {...register("comment")}
          className=" bg-transparent outline-none pt-3 w-full "
          placeholder="write a comment"
          id="comment"
        />
        {/* error message */}
        {errors.comment?.message && (
          <p className="absolute -top-7 right-0 text-red-400">
            {errors.comment.message}
          </p>
        )}
      </div>
      <button type="submit">
        <FontAwesomeIcon
          icon={faPaperPlane}
          className="h-8 text-emerald-500 w-10"
        />
      </button>
    </form>
  );
}
