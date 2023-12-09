import { FormEvent, useState } from "react";
import baseURL from "../api/api";
import { useNavigate } from "react-router";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // Check if both name and email are filled
    if (!name || !email) {
      setError(true);
      return;
    }

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
    <div className="bg-gradient-to-br from-psLightGray to-psBlue w-full min-h-screen flex justify-center items-center">
      <form className="flex flex-col md:w-96 h-fit px-8 py-10 text-center bg-white rounded-xl shadow-2xl">
        <h3 className="mb-2 text-4xl font-extrabold text-psCoral cursor-default">
          Sign In
        </h3>
        <p className="mb-6 text-psMediumGray cursor-default">
          Enter your name and email
        </p>
        <label
          htmlFor="name"
          className="mb-2 ml-1 text-start text-psDarkGray cursor-pointer after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Jane Smith"
          className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-psLightCoral mb-7 placeholder:text-gray-400 bg-psLightGray text-psDarkGray rounded-lg cursor-pointer placeholder:italic"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label
          htmlFor="email"
          className="mb-2 ml-1 text-start text-psDarkGray after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="jane.smith@example.com"
          className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-psLightCoral mb-7 placeholder:text-gray-400 bg-psLightGray text-psDarkGray rounded-lg cursor-pointer placeholder:italic"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && (
          <p className="mb-2 text-sm text-red-500">
            Please fill in both name and email
          </p>
        )}

        <button
          type="submit"
          onClick={handleLogin}
          className="w-full py-5 text-sm font-semibold leading-none text-white transition duration-200 rounded-lg hover:bg-psCoral bg-psMediumGray"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Auth;
