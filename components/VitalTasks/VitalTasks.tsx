"use client";
import { useGlobalContext } from "@/context/GlobalProvider";
import { deleteTaskById, getVitalTaks, updateTaskById } from "@/lib/appwrite";
import React, { useEffect, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import TaskDetail from "../TaskDetail/TaskDetail";
import ModalEdit from "../ModalEdit/ModalEdit";
import LoaderForPages from "../Loader/LoaderForPages";
import { useSidebar } from "../Sidebar/SidebarContext";

function VitalTasks() {
  const { user } = useGlobalContext();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { isSidebarOpen } = useSidebar();

  const fetchTasks = async () => {
    try {
      const vitalTasks = await getVitalTaks();
      setTasks(vitalTasks);
      if (vitalTasks.length > 0) {
        setIsLoading(false);
        setSelectedTask(vitalTasks[0]);
      }
    } catch (error) {
      console.log("Error fetching tasks:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskById(taskId);
      setIsDeleted(true);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleEditTask = (task) => {
    setEditedTask({
      title: task.title,
      desc: task.desc,
      priority: task.priority,
      status: task.status,
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateTask = async () => {
    const updatedData = {
      title: editedTask.title,
      desc: editedTask.desc,
      priority: editedTask.priority,
      status: editedTask.status,
    };

    try {
      const updatedTask = await updateTaskById(selectedTask.$id, updatedData); // Используем $id выбранной задачи для обновления
      const updatedTasks = tasks.map((task) =>
        task.$id === selectedTask.$id ? updatedTask : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setIsEdited(true);

      setTimeout(() => {
        setIsEdited(false);
      }, 5000);
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const handleTaskClick = (taskId) => {
    const selected = tasks.find((task) => task.$id === taskId);
    setSelectedTask(selected);
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
            you have {tasks.length} vital tasks{" "}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="border w-[80%] sm:w-[55%] rounded-md p-4">
              <div>
                {tasks.length ? (
                  tasks.map((task) => (
                    <div>
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

          {isEditing && (
            <ModalEdit
              editedTitle={editedTask.title}
              onChange={handleChange}
              editedDesc={editedTask.desc}
              editedPriority={editedTask.priority}
              editedStatus={editedTask.status}
              isEditing={setIsEditing}
              updateTask={handleUpdateTask}
              editedTags={selectedTask.tags}
            />
          )}
        </section>
      )}
    </>
  );
}

export default VitalTasks;
