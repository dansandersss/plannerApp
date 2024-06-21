"use client";
import useFormatDate from "@/hooks/useFormatDate";
import { addTodo, deleteTodo, getAllTodos } from "@/lib/appwrite";
import { faClipboardCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicModal from "../Modal/NewModal";
import TodoNotesModal from "../Modal/TodoNotesModal";
import { useGlobalContext } from "@/context/GlobalProvider";
import "./TodoNotes.css";
import useRandomBgColor, {
  getRandomTailwindBgClass,
} from "@/hooks/useRandomBgColor";
import useDateForTodoNotes from "@/hooks/useDateForTodoNotes";

const CustomCheckBox = styled(Checkbox)({
  "&.MuiCheckbox-root": {
    padding: 0,
  },
  "&.MuiCheckbox-root.Mui-checked": {
    color: "#FF6767",
  },
});

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todosToDelete, setTodosToDelete] = useState(new Set());
  const { formatCreatedAt } = useDateForTodoNotes();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descExists, setDescExists] = useState(false);
  const { user } = useGlobalContext();

  const users = user?.$id;

  const fetchTodoList = async () => {
    try {
      const todoList = await getAllTodos();
      setTodos(todoList);
      if (todos !== "") {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetching todo list", error.message);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const onSubmit = async (todoData) => {
    try {
      await addTodo(todoData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckBoxChange = (todoId) => {
    setTodosToDelete((prev) => {
      const updated = new Set(prev);
      updated.add(todoId);
      return updated;
    });
    setTimeout(() => {
      deleteTodoItem(todoId);
    }, 5000);
  };

  const deleteTodoItem = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.$id !== todoId));
      setTodosToDelete((prev) => {
        const updated = new Set(prev);
        updated.delete(todoId);
        return updated;
      });
    } catch (error) {
      console.log("Error deleting todo", error.message);
    }
  };

  return (
    <>
      <section className="h-[50%] px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-black flex flex-row items-center  text-4xl font-bold">
            <span className="mr-2">
              <FontAwesomeIcon
                className=" text-newTextColor-7-1"
                icon={faClipboardCheck}
              />
            </span>
            To<span className="text-newTextColor-7-1">dos</span>
          </h1>
          <div
            className="bg-newBgColor-7-1 px-2 py-1 rounded-md cursor-pointer text-newTextColor-7-2 hover:bg-newBgColor-7-2 hover:text-newBgColor-7-1 transition-all ease-in-out duration-200"
            onClick={handleOpenModal}
          >
            <FontAwesomeIcon className="" icon={faPlus} />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[225px]">
          {todos.length ? (
            todos.map((todo, index) => (
              <div className="flex flex-col gap-4 mb-4 border bg-slate-100 rounded-md p-4 shadow-md">
                <div>
                  <div className="flex items-center gap-2">
                    <CustomCheckBox
                      checked={todosToDelete.has(todo.$id)}
                      onChange={() => handleCheckBoxChange(todo.$id)}
                    />
                    <p
                      className={`relative font-bold  ${
                        todosToDelete.has(todo.$id)
                          ? "after:w-full after:h-[2px] after:bg-newBgColor-7-1 after:absolute after:top-[50%] after:left-0 after:rounded-md after:animate-expand"
                          : ""
                      }`}
                    >
                      {todo.title}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-newTextColor-7-1">
                      {todo.tags.join(", ")}
                    </p>

                    <p>{formatCreatedAt(todo.$createdAt)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No todos available</p>
          )}
        </div>

        <TodoNotesModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          text={"todo"}
          submit={onSubmit}
          desc={descExists}
        />
      </section>
    </>
  );
}

export default Todo;