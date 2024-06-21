import { useCallback } from "react";

const useDateForTodoNotes = () => {
  const formatCreatedAt = useCallback((createdAt) => {
    if (!createdAt) return "";

    const dateObj = new Date(createdAt);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");

    return `${formattedDate}`;
  }, []);

  return { formatCreatedAt };
};

export default useDateForTodoNotes;
