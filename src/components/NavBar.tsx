import { faX } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [menuclicked, setMenuclicked] = useState<boolean>(false);
  return (
    <div className="py-6 px-14 ">
      <nav className="fixed m-auto w-full md:w-[70%] lg:w-[50%] z-10">
        <div className="flex justify-between overflow-hidden mx-5">
          <p className=" font-roche rounded-full bg-emerald-950 w-fit p-3">
            <span className="block pl-2 text-orange-400">EL</span>
            thoughts
          </p>{" "}
          <div className="pt-5">
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
            <div className="md:flex">
              <Link to="/home">Home</Link>
              <div className="">
                {<Link to="/signin">sign in</Link>}{" "}
                {/* <Link to="/create">create post</Link> */}
              </div>
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
