import { faX } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assests/logo.png";

export default function NavBar() {
  const [menuclicked, setMenuclicked] = useState<boolean>(false);
  return (
    <div className="py-6 ">
      <nav className="fixed m-auto w-full md:w-[70%] lg:w-[50%] z-10">
        <div className="flex justify-between overflow-hidden mx-5">
          <img src={logo} alt="" className="h-12 rounded-full" />
          <div className="pt-2">
            <div
              className="text-3xl md:hidden"
              onClick={() => setMenuclicked(!menuclicked)}
            >
              {!menuclicked ? (
                <FontAwesomeIcon icon={faBars} />
              ) : (
                <FontAwesomeIcon icon={faX} />
              )}{" "}
            </div>
            <div
              className={`md:flex ${
                menuclicked ? "block mt-7" : "hidden"
              } md:block`}
            >
              <Link to="/home">Home</Link>
              <div className="">
                {/* {<Link to="/signin">sign in</Link>}{" "} */}
                {/* <Link to="/create">create post</Link> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
