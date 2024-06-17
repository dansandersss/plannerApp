"use client";

import { getCompletedTasks } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

function CompletedTask() {
  const maxLength = 100;
  const [latestCompletedTask, setLatestCompletedTask] = useState(null);

  useEffect(() => {
    const fetchLatestCompletedTask = async () => {
      try {
        const completedTasks = await getCompletedTasks();

        if (completedTasks.length > 0) {
          setLatestCompletedTask(completedTasks[0]);
        }
      } catch (error) {
        console.log("Error fetching latest completed task", error.message);
      }
    };
    fetchLatestCompletedTask();
  }, []);

  if (!latestCompletedTask) {
    return null;
  }

  const timeAgo = formatDistanceToNow(new Date(latestCompletedTask.$updatedAt));

  return (
    <>
      <div className="mb-4 relative">
        <div
          className={`w-3 h-3 rounded-full fill-none absolute border-2 top-0 -left-2 border-priorityColor-low`}
        ></div>

        <div className="ml-4">
          <h3 className="text-lg font-bold">{latestCompletedTask.title}</h3>
          <p>
            {latestCompletedTask.desc.length > maxLength
              ? `${latestCompletedTask.desc.substring(0, maxLength)}...`
              : latestCompletedTask.desc}
          </p>
          <div className="flex justify-between items-center mt-2 border-b-2 pb-4">
            <p>
              Status: <br />
              <span className="text-sm text-priorityColor-low opacity-75">
                {latestCompletedTask.status}
              </span>
            </p>

            <p>
              Completed: <br />
              <span className="text-sm text-gray-600 opacity-75">
                {timeAgo}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompletedTask;
