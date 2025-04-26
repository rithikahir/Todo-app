const Filter = ({ setFilterType, isDarkMode }) => {
  const forDark =
    "bg-purple-900 text-purple-300 hover:bg-purple-800 focus:bg-purple-800";
  const forLight =
    " bg-purple-300 text-purple-900 hover:bg-purple-400  focus:bg-purple-400";

  return (
    <div className="flex flex-wrap justify-center gap-4 my-5 focus:outline-none ">
      <button
        onClick={() => setFilterType("ALL")}
        className={`hover:scale-105 hover:shadow-lg px-3 py-2 rounded-full text-sm lg:text-lg  font-bold shadow-md transition duration-300 ease-in-out  min-w-fit  border-black  ${
          isDarkMode ? forDark : forLight
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilterType("COMPLETED")}
        className={`hover:scale-105 hover:shadow-lg px-3 py-2 rounded-full text-sm lg:text-lg  font-bold shadow-md transition duration-300 ease-in-out min-w-fit border-black   ${
          isDarkMode ? forDark : forLight
        }`}
      >
        Completed
      </button>
      <button
        onClick={() => setFilterType("PENDING")}
        className={` hover:scale-105 hover:shadow-lg px-3 py-2 rounded-full text-sm lg:text-lg  font-bold shadow-md transition duration-300 ease-in-out  min-w-fit border-black   ${
          isDarkMode ? forDark : forLight
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => setFilterType("LATEST")}
        className={`hover:scale-105 hover:shadow-lg  px-3 py-2 rounded-full text-sm lg:text-lg  font-bold shadow-md transition duration-300 ease-in-out  min-w-fit border-black  ${
          isDarkMode ? forDark : forLight
        }`}
      >
        Latest
      </button>
    </div>
  );
};

export default Filter;
