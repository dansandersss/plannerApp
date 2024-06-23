"use client";
import { getAllTasks } from "@/lib/appwrite";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function TaskStatus() {
  const [completedPercent, setCompletedPercent] = useState(0);
  const [inProgressPercent, setInProgressPercent] = useState(0);
  const [allTasks, setAllTasks] = useState([]);

  const fetchAllTasks = async () => {
    try {
      const allFetchedTasks = await getAllTasks();
      setAllTasks(allFetchedTasks);
    } catch (error) {
      console.log("Error fetching tasks", error.message);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  useEffect(() => {
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(
      (task) => task.status === "completed"
    ).length;
    const inProgressTasks = allTasks.filter(
      (task) => task.status === "in-progress"
    ).length;

    if (totalTasks > 0) {
      setCompletedPercent((completedTasks / totalTasks) * 100);
      setInProgressPercent((inProgressTasks / totalTasks) * 100);
    } else {
      setCompletedPercent(0);
      setInProgressPercent(0);
    }
  }, [allTasks]);

  const completedData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completedPercent, 100 - completedPercent],
        backgroundColor: ["#05A301", "#e0e0e0"],
        hoverBackgroundColor: ["#66bb6a", "#eeeeee"],
      },
    ],
  };

  const inProgressData = {
    labels: ["In Progress", "Remaining"],
    datasets: [
      {
        data: [inProgressPercent, 100 - inProgressPercent],
        backgroundColor: ["#0225FF", "#e0e0e0"],
        hoverBackgroundColor: ["#465fff", "#eeeeee"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        enabled: false, // Disable tooltip
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    cutout: "85%",
  };

  const chartStyle = {
    width: "150px",
    height: "150px",
    margin: "auto",
  };

  return (
    <div className="flex items-center justify-around">
      <div className="text-center flex flex-col gap-4 sm:gap-0 sm:flex-row items-center">
        <div style={chartStyle} className="relative">
          <Doughnut data={completedData} options={options} />
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xl text-priorityColor-low">
            {Math.round(completedPercent)}%
          </div>

          <p className="text-sm">Completed Tasks</p>
        </div>

        <div style={chartStyle} className="relative">
          <Doughnut data={inProgressData} options={options} />
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xl text-priorityColor-medium">
            {Math.round(inProgressPercent)}%
          </div>

          <p className="text-sm">Tasks In Progress</p>
        </div>
      </div>
    </div>
  );
}

export default TaskStatus;
