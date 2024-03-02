import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../configurations/firebase";

export default function Welcome() {
  const navigate = useNavigate();
  const signUserIn = async () => {
    await signInWithPopup(auth, provider);
    navigate("/");
  };
  return (
    <div>
      <NavBar />
      <div className="mt-32 ">
        <p className=" text-lg italic text-center px-5 my-5 md:text-2xl">
          Welcome to el-thoughts, share your opinion and connect with people
        </p>

        <button
          className="bg-green-500 w-52 px-10 rounded-md text-lg py-2"
          onClick={signUserIn}
        >
          sign in
        </button>
      </div>
    </div>
  );
}
