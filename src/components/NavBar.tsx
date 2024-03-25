import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/logo.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../configurations/firebase";
import { signOut } from "firebase/auth";

export default function NavBar() {
  const navigate = useNavigate();

  // get info of the user signed in
  const [userInfos] = useAuthState(auth);

  // signOut
  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      {/* navBar */}
      <nav className="fixed w-full p-3 md:p-5 bg-blue-950 z-10">
        <div className="flex justify-between overflow-hidden items-center mx-5">
          <div>
            <img
              src={logo}
              alt=""
              className="h-12 rounded-full inline"
              onClick={() => navigate("/")}
            />{" "}
            <span className=" text-sm md:text-lg italic text-blue-300">
              Emirael
            </span>
          </div>
          <div className="flex items-center md:text-xl text-lg">
            <Link to="/social-media" className="hidden md:block mx-5">
              Home
            </Link>

            {/* Navbar content depening on if user is logged in or not */}
            {!userInfos ? (
              <Link to="/social-media/login">Login</Link>
            ) : (
              <div className="flex items-center">
                <Link to="/create" className="md:px-3">
                  create
                </Link>
                <div className="flex items-center">
                  <img
                    src={`${userInfos.photoURL}`}
                    alt=""
                    className="h-9 rounded-full mx-3"
                  />
                  <span className="hidden md:block">
                    {userInfos.displayName}
                  </span>
                </div>
                <button
                  onClick={signUserOut}
                  className=" bg-red-400 cursor-pointer py-1 px-2 rounded ml-3 hover:opacity-85"
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
