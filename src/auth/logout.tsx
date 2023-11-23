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

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
