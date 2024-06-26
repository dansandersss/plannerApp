import React, { ChangeEvent } from "react";
import { TextareaAutosize, styled } from "@mui/material";

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

interface MyTextAreaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const MyTextArea: React.FC<MyTextAreaProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <CustomTextarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full sm:w-[60%]"
    />
  );
};

export default MyTextArea;
