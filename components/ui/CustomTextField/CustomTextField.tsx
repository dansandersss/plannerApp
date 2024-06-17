import React from "react";
import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "36px",
  },
  "& .MuiOutlinedInput-input": {
    padding: "10px 14px",
  },
}));

export default function MyCustomTextField({
  id,
  label,
  variant,
  value,
  onChange,
}) {
  return (
    <CustomTextField
      id={id}
      label={label}
      variant={variant}
      value={value}
      onChange={onChange}
      className="w-[60%] py-2"
    />
  );
}
