import { useCallback } from "react";

const useFormatDate = () => {
  const formatCreatedAt = useCallback((createdAt) => {
    if (!createdAt) return "";

    const dateObj = new Date(createdAt);

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    return `${month}/${day}/${year}, ${hours}:${minutes}`;
  }, []);

  return { formatCreatedAt };
};

export default useFormatDate;
