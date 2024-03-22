import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/main/Home";
import LoginUser from "./pages/LoginUser";
import Create from "./pages/Create";
import Comments from "./pages/comments/Comments";

function App() {
  return (
    <div className="  m-auto text-center text-gray-100 font-roboto text-lg">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/create" element={<Create />} />
          <Route path="/comments/:id" element={<Comments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
