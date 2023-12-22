import LogoutButton from "../auth/logout";
import FavoriteDropdown from "./favoritesDropdown";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface HeaderNavProps {
  favorites: Dog[];
  favoritePing: boolean;
  handleFavorites: (dog: Dog) => void;
  handleGenerateMatch: () => void;
}

const HeaderNav: React.FC<HeaderNavProps> = ({
  favorites,
  favoritePing,
  handleFavorites,
  handleGenerateMatch,
}) => {
  return (
    <header className="py-4 bg-psBlue w-full sticky top-0 z-50">
      <span className="bg-psBlue bg-opacity-60 absolute top-full h-2 w-full ">
        <span className="bg-psBlue bg-opacity-30 absolute top-full h-2 w-full"></span>
      </span>
      <nav className="sm:px-6 flex flex-col sm:flex-row justify-between items-center max-w-screen-xl mx-auto">
        <a
          href="#/home"
          className="flex items-center justify-center hover:text-psCoral text-white font-poppins group"
        >
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className="group-hover:animate-bouncing -rotate-6"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M63.76 19.97c-29.09-.75-38.51 21.77-39.23 30.22c-.56 6.57-3.38 30.6 10.32 46.74c7.07 8.33 18.4 12.48 30.41 12.2c12.11-.28 23.05-2.69 30.41-12.39c12.39-16.33 11.07-40.73 9.39-48.62c-1.58-7.34-7.71-27.29-41.3-28.15z"
              fill="#ffeac8"
            ></path>
            <path
              d="M96.82 64.43c1.03 7.81-2.36 15.26-11.29 15.79c-8.17.49-13.21-4.72-13.61-12.39c-.41-7.86 3.89-15.17 10.72-15.92c7.21-.79 13.16 4.71 14.18 12.52z"
              fill="#d27856"
            ></path>
            <path
              d="M18.9 26.72s-9.83 3.85-12.2 9.57c-3.19 7.7-1.72 22.98 0 28.91c1.69 5.82 6.19 11.83 13.14 11.64s13.05-7.23 15.2-16.42c2.16-9.2 2.63-24.96 3.28-27.78s1.78-5.07 1.78-5.07s-8.63-8.36-21.2-.85z"
              fill="#d27856"
            ></path>
            <path
              d="M101.21 25.5s13.33.47 16.52 1.88s6.1 7.79 5.82 16.33s-.84 22.35-5.16 27.12c-3.57 3.94-10.79 4.22-14.83-.66s-6.57-13.14-7.51-18.49c-.94-5.35-2.53-12.29-3.57-15.39c-1.03-3.1-3.57-9.29-4.88-10.7c-1.32-1.4 1.31-2.72 13.61-.09z"
              fill="#d27856"
            ></path>
            <path
              d="M29.97 22.31c-7.23-.46-19.15 5.26-21.59 11.17S7.37 58.57 9.42 64.17c2.16 5.91 6.66 13.33 14.45 6.95s9.85-22.43 10.61-27.59c.75-5.16 1.78-11.45 2.91-12.76c1.13-1.31 2.72-3.19 2.72-3.19s-1.22-4.71-10.14-5.27z"
              fill="#865b51"
            ></path>
            <path
              d="M102.8 21.09c6.79.47 14.17 3 16.89 8.92c2.72 5.91 1.69 19.9.66 26.56s-3.47 13.61-9.57 12.86s-9.2-9.01-11.07-16.8c-1.88-7.79-3.85-15.58-6.29-21.21c-1.47-3.4-6.57-5.91-6.57-5.91s2.25-5.36 15.95-4.42z"
              fill="#865b51"
            ></path>
            <path
              d="M50.5 67.69c-.4 3.42-2.16 6.18-5.98 5.78c-2.71-.29-4.53-3.52-4.13-6.95c.4-3.42 1.59-5.88 4.79-5.82c4.97.09 5.72 3.56 5.32 6.99z"
              fill="#2f2f2f"
            ></path>
            <path
              d="M89.74 66.73c.16 3.44-1.2 6.38-5.17 6.67c-3.45.25-5.22-2.74-5.37-6.18c-.16-3.44 1.55-6.2 4.84-6.61c4.27-.55 5.54 2.68 5.7 6.12z"
              fill="#2f2f2f"
            ></path>
            <path
              d="M75.12 84.07c.16 3.44-2.16 6.66-9.39 6.57c-7.04-.09-9.6-2.94-9.76-6.38c-.16-3.44 3.84-6.53 9.57-6.66c7.89-.2 9.42 3.02 9.58 6.47z"
              fill="#2f2f2f"
            ></path>
            <path
              d="M59.16 97.96s.85 8.17 1.69 10.61c1.78 5.16 9.28 4.3 10.61-.56c1.13-4.13.38-11.26.38-11.26l-6.66-.94l-6.02 2.15z"
              fill="#e94b8c"
            ></path>
            <path
              d="M65.96 100.68c-1.17.05-1.13 1.13-1.13 3.61c0 2.49.14 3.99 1.27 3.94c1.13-.05.99-1.97.99-3.75s.09-3.85-1.13-3.8z"
              fill="#ef87b2"
            ></path>
            <path
              d="M50.15 90.21c-1.35 1.99 1.27 3.75 3.43 5.21c2.16 1.45 4.78 3.66 7.88 3.61c3.47-.05 4.41-2.39 4.41-2.39s1.13 2.77 6.05 2.25c2.63-.28 5.87-3.23 6.85-3.89c1.88-1.27 4.13-2.86 3.14-4.18c-1.13-1.51-3.52.52-5.96 1.78c-2.44 1.27-3.28 1.88-5.11 1.88s-3.1-.75-3.19-3.8c-.08-2.49-.05-2.96-.05-2.96h-4.18s.14 2.63.14 3.38c0 1.97-1.03 2.82-3 2.91c-1.97.09-4.08-1.55-5.12-2.16c-1.02-.6-4.21-3.23-5.29-1.64z"
              fill="#2f2f30"
            ></path>
          </svg>
          <span className="ml-1 mt-1 text-3xl font-bold font-flower">
            Pawsome Adoptions
          </span>
        </a>
        <span className="flex sm:justify-center sm:w-fit w-full justify-evenly items-center gap-2">
          <FavoriteDropdown
            favorites={favorites}
            favoritePing={favoritePing}
            handleFavorites={handleFavorites}
            handleGenerateMatch={handleGenerateMatch}
          />
          <LogoutButton />
        </span>
      </nav>
    </header>
  );
};

export default HeaderNav;
