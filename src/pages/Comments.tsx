import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/Store";
import { postState } from "../store/features/Posts";
import { useEffect, useState } from "react";

export default function Comments() {
  const { id } = useParams();
  const allPosts = useAppSelector((state) => state.postsReducer.allPosts);
  const [post, setPost] = useState<postState>();

  useEffect(() => {
    allPosts.map((post) => post.postId === id && setPost(post));
  }, []);
  return (
    <div>
      <p>{post?.content}</p>
    </div>
  );
}
