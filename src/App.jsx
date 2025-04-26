import Form from "./Components/Form";
import Header from "./Components/Header";
import { useEffect, useReducer, useState } from "react";
import { TodoItemsContext } from "./store/store";
import ItemsContainer from "./Components/ItemsContainer";
import toast, { Toaster } from "react-hot-toast";
import { complex, motion } from "framer-motion";
import Filter from "./Components/Filter";

const todoItemReducer = (currTodoItem, action) => {
  let newTodoItem;
  if (action.type == "NEW-ITEM") {
    newTodoItem = [
      {
        title: action.payload.todoTitle,
        description: action.payload.todoDescription,
        deadline: action.payload.todoDeadline,
        completed: false,
      },
      ...currTodoItem,
    ];
  } else if (action.type == "DELETE_ITEM") {
    newTodoItem = currTodoItem.filter(
      (todo) =>
        todo.title !== action.payload.itemList.title ||
        todo.description !== action.payload.itemList.description
    );
  } else if (action.type == "SET_UPDATED_LIST") {
    newTodoItem = action.payload;
  } else if (action.type == "TOGGLE_COMPLETED") {
    newTodoItem = currTodoItem.map((todo) => {
      if (
        todo.title === action.payload.title &&
        todo.description === action.payload.description &&
        todo.deadline === action.payload.deadline
      ) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
  }
  localStorage.setItem("todoList", JSON.stringify(newTodoItem));
  return newTodoItem;
};

function App() {
  const todoItems = JSON.parse(localStorage.getItem("todoList")) || [];

  const [todoList, dispatchTodoItems] = useReducer(todoItemReducer, todoItems);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // FOR HANDLING DARK MODE FOR BODY BACKGROUND ONLY. NOTE: BCOZ ITS CSS IS WRIITEN IN INDEX.CSS FILE
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const updatedTodoItem = (updated) => {
    const updatedList = todoList.map((todo) => {
      if (
        todo.title == isUpdateMode.title &&
        todo.description == isUpdateMode.description &&
        todo.deadline == isUpdateMode.deadline &&
        todo.completed == isUpdateMode.completed
      ) {
        return updated;
      }
      return todo;
    });
    dispatchTodoItems({ type: "SET_UPDATED_LIST", payload: updatedList });
    setSelectedTodo(null);
  };

  const addTodoList = (todoDeadline, todoDescription, todoTitle) => {
    const newTodoItems = {
      type: "NEW-ITEM",
      payload: {
        todoTitle,
        todoDescription,
        todoDeadline,
      },
    };
    dispatchTodoItems(newTodoItems);
  };

  const handleDelete = (itemList) => {
    const deleteTodoItem = {
      type: "DELETE_ITEM",
      payload: {
        itemList,
      },
    };
    dispatchTodoItems(deleteTodoItem);
    handleToast("DELETE");
  };

  // HANDLING TOAST MESSAGE LOGIC
  const handleToast = (message) => {
    const forDelete = "🗑️ Your task has been deleted successfully.";
    const forAddUpdate = `🎯Your task has been ${
      isUpdateMode ? "updated" : "added"
    } successfully.`;

    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={`${
            message === "ADD_UPDATE" ? "bg-purple-900" : "bg-red-700"
          } " text-white px-6 py-4 rounded-xl shadow-lg max-w-sm w-full mx-auto flex items-center justify-between gap-4"`}
        >
          <div>
            <p className="text-lg font-semibold">
              {message === "ADD_UPDATE"
                ? isUpdateMode
                  ? "Task Updated!"
                  : "New Task Added!"
                : "Task Deleted!"}
            </p>
            <p
              className={`"text-sm" ${
                message === "ADD_UPDATE" ? "text-purple-300" : "text-red-200"
              }`}
            >
              {message === "ADD_UPDATE" ? forAddUpdate : forDelete}
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-white text-xl hover:text-purple-300 focus:outline-none"
          >
            ✖
          </button>
        </motion.div>
      ),
      { duration: 3000 }
    );
  };

  return (
    <TodoItemsContext.Provider
      value={{
        todoList,
        addTodoList,
        setSelectedTodo,
        selectedTodo,
        handleDelete,
        updatedTodoItem,
        isUpdateMode,
        setIsUpdateMode,
        handleToast,
        filterType,
        dispatchTodoItems,
        setIsDarkMode,
        isDarkMode,
      }}
    >
      <div className="min-h-screen p-7">
        <Header></Header>
        <Toaster position="top-right " reverseOrder={false} />
        <Form></Form>
        <Filter setFilterType={setFilterType} isDarkMode={isDarkMode} />
        <ItemsContainer></ItemsContainer>
      </div>
    </TodoItemsContext.Provider>
  );
}

export default App;
