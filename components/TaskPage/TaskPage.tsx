"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteTaskById, getTaskById, updateTaskById } from "@/lib/appwrite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "@/constants/icons";
import ModalEdit from "../ModalEdit/ModalEdit";
import { useSidebar } from "../Sidebar/SidebarContext";

interface Task {
  $id: string;
  title: string;
  desc: string;
  priority: "Low" | "Medium" | "High";
  status: "in-progress" | "completed";
  $createdAt: string;
}

const TaskPage: React.FC = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const router = useRouter();
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (taskId) {
          const taskData = await getTaskById(taskId);
          setTask(taskData);
          setEditedTask({
            title: taskData.title,
            desc: taskData.desc,
            priority: taskData.priority,
            status: taskData.status,
          });
        }
      } catch (error) {
        console.error("Error fetching task:", error.message);
      }
    };

    fetchTask();
  }, [taskId]);

  if (!task) {
    return <p>Loading...</p>;
  }

  const formatCreatedAt = (createdAt: string): string => {
    if (!createdAt) return "";

    const dateObj = new Date(createdAt);

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    return `${month}/${day}/${year}, ${hours}:${minutes}`;
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTaskById(taskId);
      setIsDeleted(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 5000);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      title: editedTask.title,
      desc: editedTask.desc,
      priority: editedTask.priority,
      status: editedTask.status,
    };

    try {
      await updateTaskById(taskId, updatedData);
      setTask((prev) => ({ ...prev, ...updatedData } as Task));
      setIsEditing(false);
      setIsEdited(true);

      setTimeout(() => {
        setIsEdited(false);
      }, 5000);
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  return (
    <>
      <section
        className={`mt-4 w-[250px] sm:w-[400px] md:w-[550px] lg:max-w-[700px] xl:w-full transition-all duration-200 ease-in-out md:mt-[70px] ml-0 md:ml-14 ${
          isSidebarOpen
            ? "sm:translate-x-24"
            : "translate-x-24 sm:translate-x-20 lg:-translate-x-8"
        }`}
      >
        <div className="border p-4 rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-black text-4xl font-bold mb-4">
                {task.title}
              </h1>
            </div>
            <div className="cursor-pointer" onClick={handleGoBack}>
              <p>Go back</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <p>
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
            </p>
            <p>
              Status:{" "}
              <span
                className={`${
                  task.status === "completed"
                    ? "text-priorityColor-low"
                    : "text-priorityColor-medium"
                }`}
              >
                {task.status === "in-progress" ? "In Progress" : "Completed"}
              </span>
            </p>
            <p className="text-slate-400">
              Created on: {formatCreatedAt(task.$createdAt)}
            </p>
          </div>

          <div className="mb-4">
            <p>{task.desc}</p>
          </div>

          <div className="flex gap-4 justify-end items-center">
            <div
              onClick={handleDeleteTask}
              className=" bg-newBgColor-7-1 hover:bg-newBgColor-7-2 hover:scale-75 transition-all duration-200 ease-in-out rounded-md py-3 px-4 cursor-pointer"
            >
              <FontAwesomeIcon
                className="text-xl text-white"
                icon={icons.delete}
              />
            </div>
            <div
              onClick={handleEditTask}
              className="bg-newBgColor-7-1 rounded-md hover:scale-75 hover:bg-newBgColor-7-2 transition-all duration-200 ease-in-out py-3 px-4 cursor-pointer"
            >
              <FontAwesomeIcon
                className="text-xl text-white"
                icon={icons.edit}
              />
            </div>
          </div>
        </div>

        {isDeleted && (
          <div className="mt-4 p-4 border rounded-md bg-green-100 text-green-800">
            Task has been successfully deleted. You will be redirected shortly.
          </div>
        )}

        {isEdited && (
          <div className="mt-4 p-4 border rounded-md bg-green-100 text-green-800">
            Task has been successfully edited.
          </div>
        )}
      </section>

      {isEditing && (
        <ModalEdit
          isEditing={setIsEditing}
          onClose={() => setIsEditing(false)}
          editedTitle={editedTask.title || ""}
          onChange={handleChange}
          editedDesc={editedTask.desc || ""}
          editedPriority={editedTask.priority || "Low"}
          editedStatus={editedTask.status || "in-progress"}
          updateTask={handleUpdateTask}
        />
      )}
    </>
  );
};

export default TaskPage;
