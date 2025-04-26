import { useRef, useContext, useEffect, useState } from "react";
import { TodoItemsContext } from "../store/store";
import toast from "react-hot-toast";

const Form = () => {
  const {
    addTodoList,
    selectedTodo,
    updatedTodoItem,
    isUpdateMode,
    setIsUpdateMode,
    setSelectedTodo,
    handleToast,
    isDarkMode,
  } = useContext(TodoItemsContext);

  useEffect(() => {
    if (isUpdateMode) {
      titleElement.current.value = isUpdateMode.title;
      descriptionElement.current.value = isUpdateMode.description;
      deadlineElement.current.value = isUpdateMode.deadline;
      console.log(isUpdateMode.deadline);
    }
  }, [isUpdateMode]);

  const titleElement = useRef();
  const descriptionElement = useRef();
  const deadlineElement = useRef();

  const handleAddTodo = () => {
    const todoTitle = titleElement.current.value;
    const todoDescription = descriptionElement.current.value;
    const todoDeadline = deadlineElement.current.value;

    if (!todoTitle || !todoDescription || !todoDeadline) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (isUpdateMode) {
      updatedTodoItem({
        title: todoTitle,
        description: todoDescription,
        deadline: todoDeadline,
        completed: isUpdateMode.completed,
      });
    } else {
      addTodoList(todoDeadline, todoDescription, todoTitle);
    }
    titleElement.current.value = "";
    descriptionElement.current.value = "";
    deadlineElement.current.value = "";

    setSelectedTodo(null);
    setIsUpdateMode(null);
    // Show animated toast
    handleToast("ADD_UPDATE");
  };

  const forDark = "lg:focus:ring-purple-300 border-gray-300";
  const forLight = "lg:focus:ring-purple-500  border-purple-800";

  return (
    <>
      <form className="max-w-5xl mx-auto mb-2">
        <input
          type="text"
          placeholder="Title"
          required
          minLength="5"
          name="title"
          ref={titleElement}
          className={`w-full p-3 mb-4 border-2 lg:text-2xl rounded-3xl  lg:focus:ring-2 lg:placeholder:text-2xl focus:outline-none ${
            isDarkMode ? forDark : forLight
          }`}
        />
        <br></br>
        <textarea
          rows="3"
          cols="23"
          placeholder="Description"
          name="description"
          ref={descriptionElement}
          className={`w-full p-3 mb-4 border-2 lg:text-2xl rounded-3xl lg:focus:ring-2 lg:placeholder:text-2xl focus:outline-none placeholder:text-base placeholder:text-slate-300${
            isDarkMode ? forDark : forLight
          } `}
        ></textarea>
        <label
          htmlFor="date"
          className={`mb-2  lg:text-2xl ${
            isDarkMode ? "text-slate-400" : "text-gray-700"
          }`}
        >
          Set Deadline:{" "}
        </label>
        <input
          type="date"
          name="date"
          required
          ref={deadlineElement}
          className={`border-2 p-2 rounded-3xl mb-4 lg:focus:ring-2 focus:outline-none ${
            isDarkMode ? forDark : forLight
          }`}
        />

        <button
          className={`w-full rounded-2xl p-2 lg:p-3 text-xl lg:text-3xl tracking-wide font-bold  text-purple-300
            ${
              isUpdateMode
                ? "bg-red-900 hover:bg-red-800"
                : "bg-blue-900   hover:bg-blue-800"
            }  hover:shadow-2xl mb-4`}
          onClick={(e) => {
            e.preventDefault();
            handleAddTodo();
          }}
        >
          {isUpdateMode ? "Update Task" : "Add Task"}
        </button>
      </form>
    </>
  );
};

export default Form;
