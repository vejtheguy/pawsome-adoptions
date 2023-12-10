import { FormEvent, useState } from "react";
import baseURL from "../api/baseUrl";
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
    <div className="bg-gradient-to-br from-psLightGray to-psBlue w-full min-h-screen flex justify-center items-center">
      <form
        className="flex flex-col justify-center sm:max-w-sm w-full h-screen sm:h-fit p-10 sm:p-8 text-center bg-white rounded-xl drop-shadow-2xl"
        onSubmit={handleLogin}
      >
        <h3 className="mb-2 text-4xl font-extrabold text-psCoral cursor-default">
          Sign In
        </h3>
        <p className="mb-6 text-psMediumGray cursor-default">
          Enter your name and email
        </p>
        <label
          htmlFor="name"
          className="flex justify-between items-end mb-1 ml-1 text-start text-psDarkGray cursor-pointer pointer-events-none"
        >
          Name
          <span className="text-xs italic mr-1 text-psCoral">required*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Jane Smith"
          className="flex items-center w-full px-5 py-4 mr-2 mb-7 text-sm font-medium outline-none hover:bg-psLightBlue hover:bg-opacity-50 focus:bg-psLightBlue focus:bg-opacity-75  placeholder:text-gray-400 bg-psLightGray text-psDarkGray rounded-lg placeholder:italic transition duration-500"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label
          htmlFor="email"
          className="flex justify-between items-end mb-1 ml-1 text-start text-psDarkGray cursor-pointer after:content-['required*'] after:text-xs after:italic after:mr-1 after:text-psCoral pointer-events-none"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="jane.smith@example.com"
          className="flex items-center w-full px-5 py-4 mr-2 sm:mb-8 mb-10 text-sm font-medium outline-none hover:bg-psLightBlue hover:bg-opacity-50 focus:bg-psLightBlue focus:bg-opacity-75 placeholder:text-gray-400 bg-psLightGray text-psDarkGray rounded-lg placeholder:italic transition duration-500"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-5 text-sm font-semibold leading-none text-white transition duration-300 rounded-lg hover:bg-psCoral bg-psMediumGray"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Auth;
