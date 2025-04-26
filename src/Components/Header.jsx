import { useContext } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { TodoItemsContext } from "../store/store";

const Header = () => {
  const { isDarkMode, setIsDarkMode } = useContext(TodoItemsContext);

  return (
    <div className="relative">
      <button
        className="absolute right-0 top-1 lg:right-5 lg:top-1"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? (
          <FaSun size={34} />
        ) : (
          <FaMoon size={32} className="text-blue-900" />
        )}
      </button>
      <h1
        className="text-center text-5xl font-extrabold pt-10 mb-8 tracking-wide text-blue-900 "
        style={{
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        Todo App
      </h1>
    </div>
  );
};

export default Header;
