import { FormEvent, useState } from "react";
import baseURL from "../api/api";
import { useNavigate } from "react-router";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
      }),
    });
    nav("/home");
  };

  return (
    <form>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        className="text-black"
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        className="text-black"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </form>
  );
};

export default Auth;
