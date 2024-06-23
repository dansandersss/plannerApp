"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import "./Search.module.css";
import { styled } from "@mui/system";
import { useSidebar } from "@/components/Sidebar/SidebarContext";

const CustomTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    padding: 0;
    & fieldset {
      border-color: #d1d5db; // Default border color (gray-300)
    }
    &:hover fieldset {
      border-color: #9ca3af; // Hover border color (gray-400)
    }
    &.Mui-focused fieldset {
      border-color: #ff6767; // Focus border color (blue-500)
    }
  }
  & .MuiInputLabel-root {
    color: #4b5563; // Default label color (gray-700)
  }
  & .MuiInputLabel-root.Mui-focused {
    color: #ff6767; // Focused label color (blue-500)
  }
`;

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { isSidebarOpen } = useSidebar();
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize windowWidth
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textFieldStyle = {
    width:
      isSidebarOpen && windowWidth >= 1024
        ? "200px"
        : isSidebarOpen
        ? "125px"
        : "200px",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/tasks/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        width: { xs: "90%", md: "50%", lg: "10%", xl: "100%" },
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSearch}
    >
      <CustomTextField
        style={textFieldStyle}
        id="outlined-basic"
        label="Search your task here..."
        variant="outlined"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
}

export default Search;
