"use client";
import React, { useEffect, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import TaskDetail from "../TaskDetail/TaskDetail";
import ModalEdit from "../ModalEdit/ModalEdit";
import LoaderForPages from "../Loader/LoaderForPages";
import { useGlobalContext } from "@/context/GlobalProvider";
import { deleteTaskById, getVitalTaks, updateTaskById } from "@/lib/appwrite";
import { useSidebar } from "../Sidebar/SidebarContext";

interface Task {
  $id: string;
  title: string;
  desc: string;
  priority: string;
  status: string;
  tags: string[];
}

function VitalTasks() {
  const { user } = useGlobalContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<Task>({
    $id: "",
    title: "",
    desc: "",
    priority: "",
    status: "",
    tags: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isSidebarOpen } = useSidebar();

  const fetchTasks = async (userId: string) => {
    try {
      const vitalTasks = await getVitalTaks(userId);
      const filteredTasks = vitalTasks.filter(
        (task: Task) => task.status !== "completed"
      );
      setTasks(filteredTasks);
      if (filteredTasks.length > 0) {
        setSelectedTask(filteredTasks[0]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching tasks:", error.message);
    }
  };

  useEffect(() => {
    if (user && user.$id) {
      fetchTasks(user.$id);
    }
  }, [user]);

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTaskById(taskId);
      setIsDeleted(true);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditedTask({
      $id: task.$id,
      title: task.title,
      desc: task.desc,
      priority: task.priority,
      status: task.status,
      tags: task.tags,
    });
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = {
      title: editedTask.title,
      desc: editedTask.desc,
      priority: editedTask.priority,
      status: editedTask.status,
    };

    try {
      const updatedTask = await updateTaskById(
        selectedTask?.$id || "",
        updatedData
      ); // Используем $id выбранной задачи для обновления
      const updatedTasks = tasks.map((task) =>
        task.$id === selectedTask?.$id ? updatedTask : task
      );
      setTasks(updatedTasks);
      setSelectedTask(updatedTask);
      setIsEditing(false);
      setIsEdited(true);

      setTimeout(() => {
        setIsEdited(false);
      }, 5000);
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const handleTaskClick = (taskId: string) => {
    const selected = tasks.find((task) => task.$id === taskId);
    if (selected) {
      setSelectedTask(selected);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoaderForPages loadingTime={5} />
      ) : (
        <section
          className={`mt-4 lg:mt-16 transition-all ease-in-out duration-200 lg:translate-x-0 ml-14 pb-4 ${
            isSidebarOpen
              ? "translate-x-16 sm:translate-x-6 md:translate-x-6"
              : "translate-x-8 sm:translate-x-4 md:translate-x-4"
          }`}
        >
          <h1 className="text-black text-4xl font-bold mb-4">
            <span className="text-newTextColor-7-1">{user?.username}</span>, you
            have {tasks.length} vital tasks{" "}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="border w-[80%] sm:w-[55%] rounded-md p-4">
              {tasks.length ? (
                tasks.map((task) => (
                  <div key={task.$id}>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleTaskClick(task.$id)}
                    >
                      <TaskCard
                        onUpdate={fetchTasks}
                        task={task}
                        disableClick={true}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No tasks available</p>
              )}
            </div>

            <div className="w-[80%] sm:w-[45%]">
              {selectedTask && (
                <TaskDetail
                  deleteTask={() => {
                    if (selectedTask.$id) {
                      handleDeleteTask(selectedTask.$id);
                      setSelectedTask(null);
                    }
                  }}
                  editTask={() => handleEditTask(selectedTask)}
                  task={selectedTask}
                />
              )}
            </div>
          </div>
        </section>
      )}
      {isEditing && (
        <ModalEdit
          editedTitle={editedTask.title}
          onChange={handleChange}
          editedDesc={editedTask.desc}
          editedPriority={editedTask.priority}
          editedStatus={editedTask.status}
          isEditing={setIsEditing}
          updateTask={handleUpdateTask}
          editedTags={editedTask.tags}
        />
      )}
    </>
  );
}

export default VitalTasks;
