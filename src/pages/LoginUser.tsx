import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../configurations/firebase";

export default function LoginUser() {
  const navigate = useNavigate();
  const signUserIn = async () => {
    await signInWithPopup(auth, provider);
    navigate("/");
  };
  return (
    <div>
      <NavBar />
      <p className="pt-52">Sign in with google to continue</p>
      <button
        className="mt-5 bg-emerald-600 px-5 py-2 rounded hover:bg-emerald-700"
        onClick={signUserIn}
      >
        sign in with google
      </button>
    </div>
  );
}
