import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Home from "./home/home";

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen items-center bg-psWhite">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
