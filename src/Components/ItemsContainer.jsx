import { useContext } from "react";
import { TodoItemsContext } from "../store/store";
import Items from "./Items";
import ErrorMessage from "./ErrorMessage";

const ItemsContainer = () => {
  const { todoList, filterType } = useContext(TodoItemsContext);

  const filteredList = todoList.filter((todo) => {
    switch (filterType) {
      case "COMPLETED":
        return todo.completed == true;
      case "PENDING":
        return todo.completed == !true;
      case "LATEST":
        return true;
      case "ALL":
      default:
        return true;
    }
  });
  return (
    <>
      <div className="items-container">
        {filteredList.length == 0 ? (
          <ErrorMessage />
        ) : (
          filteredList.map((element, index) => {
            if (element.title && element.description && element.deadline) {
              return (
                <Items
                  key={index}
                  todoTitle={element.title}
                  todoDescription={element.description}
                  todoDeadline={element.deadline}
                  todoElement={element}
                ></Items>
              );
            }
          })
        )}
      </div>
    </>
  );
};

export default ItemsContainer;
