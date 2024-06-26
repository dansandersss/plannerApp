"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFormatDate from "@/hooks/useFormatDate";
import icons from "@/constants/icons";

interface Task {
  $id: string;
  title: string;
  desc: string;
  priority: "Low" | "Medium" | "High";
  status: "in-progress" | "completed";
  $createdAt: string;
  tags: string[];
}

interface TaskDetailProps {
  task: Task;
  deleteTask: () => void;
  editTask: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  task,
  deleteTask,
  editTask,
}) => {
  const [currentTask, setCurrentTask] = useState<Task>(task);
  const { formatCreatedAt } = useFormatDate();

  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  return (
    <section className="border p-4 rounded-md">
      <div className="mb-4">
        <h1 className="text-black text-3xl md:text-4xl font-bold mb-4">
          {currentTask.title}
        </h1>
      </div>

      <div className="mb-4">
        <p>
          Priority:{" "}
          <span
            className={
              currentTask.priority === "Low"
                ? "text-priorityColor-low"
                : currentTask.priority === "Medium"
                ? "text-priorityColor-medium"
                : "text-priorityColor-high"
            }
          >
            {currentTask.priority}
          </span>
        </p>
        <p>
          Status:{" "}
          <span
            className={
              currentTask.status === "completed"
                ? "text-priorityColor-low"
                : "text-priorityColor-medium"
            }
          >
            {currentTask.status === "in-progress" ? "In Progress" : "Completed"}
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
          className="bg-newBgColor-7-1 hover:bg-newBgColor-7-2 hover:scale-75 transition-all duration-200 ease-in-out rounded-md py-3 px-4 cursor-pointer"
        >
          <FontAwesomeIcon className="text-xl text-white" icon={icons.delete} />
        </div>
        <div
          onClick={editTask}
          className="bg-newBgColor-7-1 rounded-md hover:scale-75 hover:bg-newBgColor-7-2 transition-all duration-200 ease-in-out py-3 px-4 cursor-pointer"
        >
          <FontAwesomeIcon className="text-xl text-white" icon={icons.edit} />
        </div>
      </div>
    </section>
  );
};

export default TaskDetail;
