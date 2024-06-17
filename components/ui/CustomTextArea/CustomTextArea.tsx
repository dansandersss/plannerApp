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
  width: "60%",
  minHeight: "100px", // Выбираем желаемую высоту textarea
  padding: "10px 14px", // Подбираем нужные отступы внутри textarea
  resize: "none", // Разрешаем вертикальное изменение размера
  border: `1px solid ${theme.palette.divider}`, // Устанавливаем границу
  borderRadius: theme.shape.borderRadius, // Устанавливаем радиус скругления
  "&:focus": {
    outline: "none", // Убираем контур при фокусе
    borderColor: theme.palette.primary.main, // Устанавливаем цвет рамки при фокусе
  },
}));

export default function MyTextArea({ value, onChange, placeholder }) {
  return (
    <CustomTextarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
