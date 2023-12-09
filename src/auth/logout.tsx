import { useNavigate } from "react-router";
import baseURL from "../api/api";

const LogoutButton = () => {
  const nav = useNavigate();

  const handleLogout = async () => {
    await fetch(`${baseURL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    nav("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-fit py-3 px-4 font-semibold text-white transition duration-200 rounded-lg hover:bg-psCoral"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
