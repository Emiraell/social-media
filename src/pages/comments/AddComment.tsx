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

interface IProps {
  post: postState | null;
  setComments: any;
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
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // add comment to firestore database
  const addComment = async (data: { comment: string }, e: any) => {
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
      setComments((prev: comment[]) =>
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
      e.target.reset();
    } catch {
      setComments((prev: comment[]) => [...prev]);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(addComment)}
        className=" fixed bottom-0 left-0 right-0 flex items-center justify-center bg-gray-900"
      >
        <div className="relative">
          <textarea
            {...register("comment")}
            className=" bg-transparent outline-none px-14 py-3 overflow-x-hidden h-16"
            placeholder="write a comment"
            id="comment"
          />
          {errors.comment?.message && (
            <p className="absolute -top-7 right-0 text-red-400">
              {errors.comment.message}
            </p>
          )}
          <button type="submit">
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="h-8 text-emerald-500 ml-8 mb-4"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
