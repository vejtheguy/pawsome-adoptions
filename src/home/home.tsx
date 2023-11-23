import LogoutButton from "../auth/logout";

function Home() {
  return (
    <div className="flex justify-center text-sky-500 bg-slate-300">
      <h1>home page</h1>
      <p>homepage content</p>
      <LogoutButton />
    </div>
  );
}

export default Home;
