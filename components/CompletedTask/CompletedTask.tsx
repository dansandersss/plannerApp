"use client";

import { getCompletedTasks } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useGlobalContext } from "@/context/GlobalProvider";

interface Task {
  $updatedAt: string;
  title: string;
  desc: string;
  status: string;
}

interface Document {
  $updatedAt: string;
  [key: string]: any;
}

function CompletedTask() {
  const maxLength = 100;
  const [latestCompletedTask, setLatestCompletedTask] = useState<Task | null>(
    null
  );
  const { user } = useGlobalContext();
  const userId = user?.$id;

  useEffect(() => {
    if (!userId) return;
    const fetchLatestCompletedTask = async (userId: string) => {
      try {
        const completedTasks: Document[] = await getCompletedTasks(1, userId);

        if (completedTasks.length > 0) {
          const task: Task = {
            $updatedAt: completedTasks[0].$updatedAt,
            title: completedTasks[0].title,
            desc: completedTasks[0].desc,
            status: completedTasks[0].status,
          };
          setLatestCompletedTask(task);
        }
      } catch (error: any) {
        console.log("Error fetching latest completed task", error.message);
      }
    };
    fetchLatestCompletedTask(userId);
  }, []);

  if (!latestCompletedTask) {
    return null;
  }

  const timeAgo = formatDistanceToNow(new Date(latestCompletedTask.$updatedAt));

  return (
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
              {timeAgo} ago
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompletedTask;
