import { Routes, Route, HashRouter } from "react-router-dom";
import Login from "./auth/login";
import Home from "./home/home";

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen items-center bg-psWhite">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
