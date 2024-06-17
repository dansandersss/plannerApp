"use client";
import icons from "@/constants/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function TaskDetail({ task, deleteTask, editTask }) {
  const [currentTask, setCurrentTask] = useState(task);

  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  const formatCreatedAt = (createdAt) => {
    if (!createdAt) return "";

    const dateObj = new Date(createdAt);

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    return `${month}/${day}/${year}, ${hours}:${minutes}`;
  };

  return (
    <>
      <section className="border p-4 rounded-md">
        <div className="mb-4">
          <div>
            <h1 className="text-black text-4xl font-bold mb-4">
              {currentTask.title}
            </h1>
          </div>
        </div>

        <div className="mb-4">
          <p>
            Priority:{" "}
            <span
              className={`${
                currentTask.priority === "Low"
                  ? "text-priorityColor-low"
                  : currentTask.priority === "Medium"
                  ? "text-priorityColor-medium"
                  : "text-priorityColor-high"
              }`}
            >
              {currentTask.priority}
            </span>
          </p>
          <p>
            Status:{" "}
            <span
              className={`${
                currentTask.status === "completed"
                  ? "text-priorityColor-low"
                  : "text-priorityColor-medium"
              }`}
            >
              {currentTask.status === "in-progress"
                ? "In Progress"
                : currentTask.status === "completed"
                ? "Completed"
                : ""}
            </span>
          </p>
          <p className="text-slate-400">
            Created on: {formatCreatedAt(currentTask.$createdAt)}
          </p>

          <span className="text-sm text-gray-600">
            Tags: {currentTask.tags.join(", ")}
          </span>
        </div>

        <div className="mb-4">
          <p>{currentTask.desc}</p>
        </div>

        <div className="flex gap-4 justify-end items-center">
          <div
            onClick={deleteTask}
            className=" bg-newBgColor-7-1 hover:bg-newBgColor-7-2 hover:scale-75 transition-all duration-200 ease-in-out rounded-md py-3 px-4 cursor-pointer"
          >
            <FontAwesomeIcon
              className="text-xl text-white"
              icon={icons.delete}
            />
          </div>
          <div
            onClick={editTask}
            className="bg-newBgColor-7-1  rounded-md hover:scale-75 hover:bg-newBgColor-7-2 transition-all duration-200 ease-in-out py-3 px-4 cursor-pointer"
          >
            <FontAwesomeIcon className="text-xl text-white" icon={icons.edit} />
          </div>
        </div>
      </section>
    </>
  );
}

export default TaskDetail;
