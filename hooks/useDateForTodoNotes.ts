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

    return `${formattedDate}`;
  }, []);

  return { formatCreatedAt };
};

export default useDateForTodoNotes;
