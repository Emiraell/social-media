import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="flex items-center p-5 justify-between">
      <p className=" font-roche rounded-full bg-emerald-950 w-fit p-3">
        <span className="block pl-2 text-orange-400">EL</span>
        thoughts
      </p>
      <div className="flex">
        <Link to="/home">Home</Link>
        <div className="mx-3">
          {<Link to="/signin">sign in</Link>}{" "}
          <Link to="/create">create post</Link>
        </div>
        <img src="" alt="" />
      </div>
    </div>
  );
}
