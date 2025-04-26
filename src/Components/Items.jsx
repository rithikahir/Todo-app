import { useContext, useState } from "react";
import { TodoItemsContext } from "../store/store";
import PopUpPage from "./PopUpPage";
import Timer from "./Timer";
import { FaCheckCircle, FaRegCircle, FaSun, FaMoon } from "react-icons/fa";
import CompletedPopup from "./CompletedPopup";

const Items = ({ todoTitle, todoDescription, todoDeadline, todoElement }) => {
  const { setSelectedTodo, selectedTodo, dispatchTodoItems, isDarkMode } =
    useContext(TodoItemsContext);

  const [showCompletedPopup, setShowCompletedPopup] = useState(false);

  const handleStatusToggle = (e) => {
    e.stopPropagation();

    dispatchTodoItems({ type: "TOGGLE_COMPLETED", payload: todoElement });

    if (!todoElement.completed) {
      setShowCompletedPopup(true);
    }

    setTimeout(() => {
      setShowCompletedPopup(false);
    }, 2000);
  };

  const forDark =
    "bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-[#334155] hover:from-[#334155] hover:to-[#1e293b] border-3";

  const forlight =
    "bg-pink-300 border-purple-900  bg-gradient-to-br from-purple-300 to-pink-400 hover:from-purple-300 hover:to-pink-500";
  return (
    <>
      <div
        className={`w-full mb-3 max-w-5xl mx-auto border-2 rounded-2xl p-3 hover:shadow-2xl shadow-xl break-words flex justify-between items-center ${
          isDarkMode ? forDark : forlight
        } `}
        onClick={() => {
          setSelectedTodo(todoElement);
        }}
      >
        <div
          className={`${
            isDarkMode ? "text-slate-300" : ""
          }  w-0 flex-1 break-words overflow-hidden`}
        >
          <h5 className="text-xl font-semibold break-words overflow-hidden">
            {todoTitle}
          </h5>
          <p className="break-words overflow-hidden">{todoDescription}</p>
          <p>{`Deadline : ${todoDeadline}`}</p>

          <Timer deadline={todoDeadline} isDarkMode={isDarkMode} />
        </div>

        <button
          className="p-5 rounded-full transition duration-300"
          onClick={handleStatusToggle}
        >
          {todoElement.completed ? (
            <FaCheckCircle
              size={30}
              className={`text-green-${isDarkMode ? "600" : "900"}`}
            />
          ) : (
            <FaRegCircle
              size={28}
              className={`text-blue-${isDarkMode ? "200" : "900"}`}
            />
          )}
        </button>
      </div>

      {selectedTodo && <PopUpPage />}
      {showCompletedPopup && (
        <CompletedPopup
          isVisible={showCompletedPopup}
          setShowCompletedPopup={setShowCompletedPopup}
          isDarkMode={isDarkMode}
          onClose={() => setShowCompletedPopup(false)}
        />
      )}
    </>
  );
};

export default Items;
