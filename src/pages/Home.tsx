import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Welcome from "./Welcome";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../configurations/firebase";
export default function Home() {
  const navigate = useNavigate();
  const signUserIn = async () => {
    await signInWithPopup(auth, provider);
    navigate("/");
  };
  return (
    <div className="">
      <NavBar />
      <div className="mt-32 ">
        <div>
          <p className=" text-lg italic text-center px-5 my-5 md:text-2xl">
            Welcome to el-thoughts, share your opinion and connect with people
          </p>

          <Link
            to="/signIn"
            className="bg-green-500 w-32 px-10 rounded-md text-lg py-2"
          >
            sign in
          </Link>
        </div>
        <Welcome />
      </div>
    </div>
  );
}
