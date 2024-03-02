import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/logo.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../configurations/firebase";
import { signOut } from "firebase/auth";

export default function NavBar() {
  const navigate = useNavigate();
  const [userInfos] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };
  return (
    <div className="">
      <nav className="fixed w-full p-3 md:p-5 bg-blue-950 z-10">
        <div className="flex justify-between overflow-hidden items-center mx-5">
          <img
            src={logo}
            alt=""
            className="h-12 rounded-full"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center md:text-xl text-lg">
            <Link to="/" className="hidden md:block">
              Home
            </Link>

            {!userInfos ? (
              <Link to="/login">Login</Link>
            ) : (
              <div className="flex items-center">
                <Link to="/create" className="md:px-3">
                  create
                </Link>
                <div className="flex items-center">
                  <span className="hidden md:block md:px-3">
                    {userInfos.displayName}
                  </span>
                  <img
                    src={`${userInfos.photoURL}`}
                    alt=""
                    className="h-9 rounded-full mx-3"
                  />
                </div>
                <button
                  onClick={signUserOut}
                  className=" bg-red-400 py-1 px-2 rounded ml-3 hover:opacity-85"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
