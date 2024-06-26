import React, { ChangeEvent } from "react";
import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "36px",
  },
  "& .MuiOutlinedInput-input": {
    padding: "10px 14px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#FF6767",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF6767",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#ccc",
    transform: "translate(10px, 7px) scale(1)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    transform: "translate(14px, -10px) scale(0.75)",
    color: "#FF6767",
  },
  "& .MuiInputLabel-root.MuiFormLabel-filled": {
    transform: "translate(14px, -10px) scale(0.75)",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FF6767",
  },
  "& .MuiOutlinedInput-input.Mui-focused": {
    color: "#FF6767",
  },
}));

interface MyCustomTextFieldProps {
  id: string;
  label: string;
  variant: "outlined" | "filled" | "standard";
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MyCustomTextField: React.FC<MyCustomTextFieldProps> = ({
  id,
  label,
  variant,
  value,
  onChange,
}) => {
  return (
    <CustomTextField
      id={id}
      label={label}
      variant={variant}
      value={value}
      onChange={onChange}
      className="w-90 sm:w-[60%] py-2"
    />
  );
};

export default MyCustomTextField;
