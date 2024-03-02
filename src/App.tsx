import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginUser from "./pages/LoginUser";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className=" m-auto text-center text-gray-100 font-roboto text-lg">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
