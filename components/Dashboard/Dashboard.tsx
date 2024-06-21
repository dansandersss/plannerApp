"use client";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/context/GlobalProvider";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import { getLatestTasks } from "@/lib/appwrite";
import TaskStatus from "../TaskStatus/TaskStatus";
import CompletedTask from "../CompletedTask/CompletedTask";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Loader from "../Loader/Loader";
import LoaderForPages from "../Loader/LoaderForPages";

function Dashboard() {
  const { user } = useGlobalContext();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const taskRefs = useRef([]);

  const fetchTasks = async () => {
    try {
      const latestTasks = await getLatestTasks();
      setTasks(latestTasks);
      if (latestTasks !== "") {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetching tasks", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const handleOpenTaskPage = (taskId) => {
    router.push(`/tasks/${taskId}`);
  };

  useEffect(() => {
    taskRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.addEventListener("mouseenter", (event) => {
          gsap.to(ref, {
            y: -10,
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
            duration: 0.3,
          });
          handleMouseMove(event, ref);
        });

        ref.addEventListener("mouseleave", () => {
          gsap.to(ref, {
            x: 0,
            y: 0,
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
          });
        });

        ref.addEventListener("mousemove", (event) => {
          handleMouseMove(event, ref);
        });
      }
    });
  }, [tasks]);

  const handleMouseMove = (event, ref) => {
    const rect = ref.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(ref, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.3,
    });
  };

  return (
    <>
      {isLoading ? (
        <LoaderForPages loadingTime={5} />
      ) : (
        <section className="mt-16 ml-14 pb-4">
          <h1 className="text-black text-4xl font-bold mb-4">
            Welcome back,{" "}
            <span className=" text-newTextColor-7-1 ">{user?.username}</span>
          </h1>

          <div className="flex flex-row gap-4 border rounded-sm p-5">
            <div className="border rounded-md p-4 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon className="opacity-50" icon={icons.clock} />
                  <h2 className=" text-newTextColor-7-1 ">
                    Latest Added Tasks
                  </h2>
                </div>

                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    className="text-newTextColor-7-1"
                    icon={faPlus}
                  />
                  <p>Add task</p>
                </div>
              </div>

              <div>
                {tasks.length ? (
                  tasks.map((task, index) => (
                    <div key={task.$id}>
                      <p className="mb-4">
                        Created on: {formatCreatedAt(task.$createdAt)}
                      </p>
                      <div
                        ref={(el) => (taskRefs.current[index] = el)}
                        className="cursor-pointer relative"
                        onClick={() => handleOpenTaskPage(task.$id)}
                      >
                        <TaskCard
                          onUpdate={fetchTasks}
                          key={task.$id}
                          task={task}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No tasks available</p>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5">
              <div className="p-4 pb-5 border rounded-md shadow-md">
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    className="opacity-50"
                    icon={icons.completed}
                  />
                  <h2 className=" text-newTextColor-7-1 ">Task Status</h2>
                </div>
                <TaskStatus />
              </div>

              <div>
                <div className="rounded-md border p-4 shadow-md">
                  <div className="flex gap-2 items-center mb-4">
                    <FontAwesomeIcon
                      className="opacity-50"
                      icon={icons.completed}
                    />
                    <h2 className=" text-newTextColor-7-1 ">
                      Recently completed task
                    </h2>
                  </div>

                  <CompletedTask />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Dashboard;