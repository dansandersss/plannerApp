"use client";
import { updateTaskStatus } from "@/lib/appwrite";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import useFormatDate from "@/hooks/useFormatDate";

function TaskCard({ task, onUpdate, disableClick }) {
  const maxLength = 100;
  const tagsLength = 2;
  const pathName = usePathname();
  const router = useRouter();
  const { formatCreatedAt } = useFormatDate();

  const handleClick = () => {
    if (!disableClick) {
      router.push(`/tasks/${task.$id}`);
    }
  };

  return (
    <div className="mb-4 cursor-pointer" onClick={handleClick}>
      {/* <div className="mb-4">
        {task.status !== "completed" && (
          <button onClick={handleCompleteTask} className=" text-black ">
            Complete Task
          </button>
        )}
      </div> */}

      <div className="relative">
        <div
          className={`w-3 h-3 rounded-full fill-none absolute border-2 top-0 -left-2 ${
            task.priority === "Low"
              ? "border-priorityColor-low"
              : task.priority === "Medium"
              ? "border-priorityColor-medium"
              : "border-priorityColor-high"
          }`}
        ></div>

        <div className="ml-4">
          <h3 className="text-lg  font-bold">{task.title}</h3>
          <p className="text-sm sm:text-lg">
            {task.desc.length > maxLength
              ? `${task.desc.substring(0, maxLength)}...`
              : task.desc}
          </p>
          <div className="flex justify-between items-center mt-2 border-b-2 pb-4">
            <span className={`text-sm text-gray-400`}>
              Priority:{" "}
              <span
                className={`${
                  task.priority === "Low"
                    ? "text-priorityColor-low"
                    : task.priority === "Medium"
                    ? "text-priorityColor-medium"
                    : "text-priorityColor-high"
                }`}
              >
                {task.priority}
              </span>
              <p className={`${pathName === "/pageOne" ? "block" : "hidden"}`}>
                Created on: {formatCreatedAt(task.$createdAt)}
              </p>
            </span>
            <span className="text-sm text-gray-600">
              Tags:{" "}
              {task.tags.length > tagsLength
                ? ` ${task.tags.slice(0, tagsLength).join(", ")}...`
                : task.tags.join(", ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
