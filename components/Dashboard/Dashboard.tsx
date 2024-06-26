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
import LoaderForPages from "../Loader/LoaderForPages";
import { useSidebar } from "../Sidebar/SidebarContext";
import useFormatDate from "@/hooks/useFormatDate";

interface Task {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  title: string;
  desc: string;
  status: string;
}

interface User {
  username: string;
}

function Dashboard() {
  const { user } = useGlobalContext<{ user: User }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { formatCreatedAt } = useFormatDate();
  const router = useRouter();
  const taskRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isSidebarOpen } = useSidebar();

  const fetchTasks = async (userId: string) => {
    try {
      const latestTasks: Task[] = await getLatestTasks(2, userId);
      console.log(user.$id);
      setTasks(latestTasks);
      if (latestTasks.length > 0) {
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("Error fetching tasks", error.message);
    }
  };

  useEffect(() => {
    if (user && user.$id) {
      fetchTasks(user.$id);
    }
  }, [user]);

  const handleOpenTaskPage = (taskId: string) => {
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

  const handleMouseMove = (event: MouseEvent, ref: HTMLDivElement) => {
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
        <section
          className={`mt-4 lg:mt-16 transition-all ease-in-out duration-200 lg:translate-x-0 ml-14 pb-4 ${
            isSidebarOpen
              ? "sm:translate-x-4 md:translate-x-4"
              : " translate-x-5 sm:translate-x-4 md:translate-x-4"
          }`}
        >
          <h1 className="text-black text-4xl font-bold mb-4">
            Welcome back,{" "}
            <span className=" text-newTextColor-7-1 ">{user?.username}</span>
          </h1>

          <div className="flex flex-col lg:flex-col xl:flex-row  gap-4 border rounded-sm p-5">
            <div className="border rounded-md p-4 shadow-md">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4">
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon className="opacity-50" icon={icons.clock} />
                  <h2 className=" text-sm sm:text-lg text-newTextColor-7-1 ">
                    Latest Added Tasks
                  </h2>
                </div>

                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    className="text-newTextColor-7-1"
                    icon={faPlus}
                  />
                  <p className="text-sm sm:text-lg">Add task</p>
                </div>
              </div>

              <div>
                {tasks.length ? (
                  tasks.map((task, index) => (
                    <div key={task.$id}>
                      <p className="mb-4 text-sm sm:text-lg">
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

            <div className="flex flex-col lg:justify-between gap-5">
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
