import { Routes, Route, HashRouter } from "react-router-dom";
import Login from "./auth/login";
import Home from "./pages/home";

function App() {
  return (
    <div className="bg-psWhite w-full">
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
