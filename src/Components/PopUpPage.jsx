import { useContext } from "react";
import { TodoItemsContext } from "../store/store";
import "animate.css";

const PopUpPage = () => {
  const {
    setSelectedTodo,
    selectedTodo,
    handleDelete,
    setIsUpdateMode,
    isDarkMode,
  } = useContext(TodoItemsContext);
  return (
    <>
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 flex items-center justify-center"
        onClick={() => setSelectedTodo(null)}
      >
        <div
          className={` ${
            isDarkMode ? "bg-blue-900 text-slate-300" : "bg-white"
          }  rounded-3xl w-11/12 max-w-md shadow-lg animate__animated animate__zoomIn break-words`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 ">
            <h3 className="mb-4 text-2xl font-semibold ">
              {selectedTodo.title}
            </h3>
            <p
              className={` mb-4 ${
                isDarkMode ? "text-slate-300" : "text-gray-700"
              }`}
            >
              {selectedTodo.description}
            </p>
            <button
              className="px-4 py-2 bg-gradient-to-br from-red-500 to-pink-500 border-1 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 hover:shadow-xl transition duration-300"
              onClick={() => {
                handleDelete(selectedTodo);
                setSelectedTodo(null);
              }}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl ml-3 hover:from-yellow-600 hover:to-orange-600 text-white hover:shadow-xl transition duration-300"
              onClick={() => {
                setIsUpdateMode(selectedTodo);
                setSelectedTodo(null);
              }}
            >
              Update
            </button>
            <button
              className="px-5 py-2 ml-3 rounded-2xl bg-gradient-to-br  from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:from-gray-800 hover:shadow-xl transition duration-300"
              onClick={() => setSelectedTodo(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpPage;
