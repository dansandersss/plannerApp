import React from "react";
import Todo from "./Todo";
import Notes from "./Notes";

const TodoList = () => {
  return (
    <>
      <section className="mt-16 pb-4 h-full w-full">
        <div className="flex h-full flex-1 flex-col">
          <Todo />
          <Notes />
        </div>
      </section>
    </>
  );
};

export default TodoList;
