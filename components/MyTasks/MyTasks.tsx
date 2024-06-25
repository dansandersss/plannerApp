"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { deleteTaskById, getAllTasks, updateTaskById } from "@/lib/appwrite";
import TaskCard from "../TaskCard/TaskCard";
import TaskDetail from "../TaskDetail/TaskDetail";
import ModalEdit from "../ModalEdit/ModalEdit";
import LoaderForPages from "../Loader/LoaderForPages";
import { useSidebar } from "../Sidebar/SidebarContext";

interface Task {
  $id: string;
  title: string;
  desc: string;
  priority: string;
  status: string;
  tags: string[];
  [key: string]: any;
}

interface User {
  username: string;
}

function MyTasks() {
  const { user } = useGlobalContext<{ user: User }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { isSidebarOpen } = useSidebar();

  const fetchTasks = async () => {
    try {
      const allTasks = await getAllTasks();
      const filteredTasks = allTasks.filter(
        (task: Task) => task.status !== "completed"
      );
      setTasks(filteredTasks);
      if (filteredTasks.length > 0) {
        setIsLoading(false);
        setSelectedTask(filteredTasks[0]);
      }
    } catch (error: any) {
      console.log("Error fetching tasks:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTaskById(taskId);
      setIsDeleted(true);
      fetchTasks();
    } catch (error: any) {
      console.error("Error deleting task:", error.message);
    }
    fetchTasks();
  };

  const handleEditTask = (task: Task) => {
    setEditedTask({
      title: task.title,
      desc: task.desc,
      priority: task.priority,
      status: task.status,
    });
    setIsEditing(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!selectedTask) return;

    const updatedData = {
      title: editedTask.title,
      desc: editedTask.desc,
      priority: editedTask.priority,
      status: editedTask.status,
    };

    try {
      const updatedTask = await updateTaskById(selectedTask.$id, updatedData);
      const updatedTasks = tasks.map((task) =>
        task.$id === selectedTask.$id ? updatedTask : task
      );
      setTasks(updatedTasks);
      setSelectedTask(updatedTask);
      setIsEditing(false);
      setIsEdited(true);

      setTimeout(() => {
        setIsEdited(false);
      }, 5000);
    } catch (error: any) {
      console.error("Error updating task:", error.message);
    }
  };

  const handleTaskClick = (taskId: string) => {
    const selected = tasks.find((task) => task.$id === taskId);
    setSelectedTask(selected || null);
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
            <span className=" text-newTextColor-7-1 ">{user?.username}</span>,
            you have {tasks.length} tasks{" "}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="border w-[80%] sm:w-[55%] rounded-md p-4">
              <div>
                {tasks.length ? (
                  tasks.map((task) => (
                    <div key={task.$id}>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleTaskClick(task.$id)}
                      >
                        <TaskCard
                          onUpdate={fetchTasks}
                          key={task.$id}
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
            </div>

            <div className="w-[80%] sm:w-[45%]">
              {selectedTask && (
                <TaskDetail
                  deleteTask={() => {
                    handleDeleteTask(selectedTask.$id);
                    setSelectedTask(null);
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
          editedTitle={editedTask.title || ""}
          onChange={handleChange}
          editedDesc={editedTask.desc || ""}
          editedPriority={editedTask.priority || ""}
          editedStatus={editedTask.status || ""}
          isEditing={setIsEditing}
          updateTask={handleUpdateTask}
        />
      )}
    </>
  );
}

export default MyTasks;
