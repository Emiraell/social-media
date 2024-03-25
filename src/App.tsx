import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/main/Home";
import LoginUser from "./pages/LoginUser";
import Create from "./pages/Create";
import Comments from "./pages/comments/Comments";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="  m-auto text-center text-gray-100 font-roboto text-lg">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/social-media" element={<Home />} />
          <Route path="/social-media/login" element={<LoginUser />} />
          <Route path="/social-media/create" element={<Create />} />
          <Route path="/social-media/comments/:id" element={<Comments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
