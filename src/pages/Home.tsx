import { collection, getDocs } from "firebase/firestore";
import NavBar from "../components/NavBar";
import { auth, db } from "../configurations/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";

interface postState {
  userId: string;
  userName: string;
  userPhoto: string;
  date: any;
  content: string;
}
export default function Home() {
  const [userInfos] = useAuthState(auth);
  const postRef = collection(db, "posts");

  const [allPost, setAllPost] = useState<postState[]>();

  const getPost = async () => {
    let data = await getDocs(postRef);
    // data.docs.map((doc) => allPost.push(doc.data() as postState));
    setAllPost(data.docs.map((doc) => ({ ...(doc.data() as postState) })));
  };

  useEffect(() => {
    getPost();
  }, []);
  return (
    <div className="">
      <NavBar />
      <div className="pt-32 md:w-[50%] m-auto p-8">
        {/* post */}
        {allPost?.map((post) => (
          <div key={post.userId} className=" pt-30">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src={`${allPost}`} alt="" className="rounded-full h-12" />
                <div className="px-5">{userInfos?.displayName}</div>
              </div>
              <FontAwesomeIcon icon={faDotCircle} />
            </div>

            <div>{post.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
