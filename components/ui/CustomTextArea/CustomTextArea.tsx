import React from "react";
import { TextField, TextareaAutosize, styled } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "36px", // Выбираем желаемую высоту
  },
  "& .MuiOutlinedInput-input": {
    padding: "10px 14px", // Подбираем нужные отступы внутри input
    textAlign: "center", // Выравниваем текст по центру
  },
}));

const CustomTextarea = styled(TextareaAutosize)(({ theme }) => ({
  minHeight: "100px",
  padding: "10px 10px",
  resize: "none",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  "&:focus": {
    outline: "none",
    borderColor: "#FF6767",
  },
  "&:hover": {
    borderColor: "#FF6767",
  },
}));

export default function MyTextArea({ value, onChange, placeholder }) {
  return (
    <CustomTextarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className=" w-full sm:w-[60%] "
    />
  );
}
