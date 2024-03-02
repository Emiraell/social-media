import NavBar from "../components/NavBar";
import Welcome from "./Welcome";
export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="mt-32 mx-14">
        <p className=" text-lg italic text-center">
          Welcome to el-thoughts, share your opinion and connect with people
        </p>
        <Welcome />
      </div>
    </div>
  );
}
