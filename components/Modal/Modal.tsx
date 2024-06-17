"use client";
import { useGlobalContext } from "@/context/GlobalProvider";
import { addTask } from "@/lib/appwrite";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import React, { useState } from "react";
import TagFiller from "../ui/TagFiller/TagFiller";
import MyCustomTextField from "../ui/CustomTextField/CustomTextField";
import MyTextArea from "../ui/CustomTextArea/CustomTextArea";

const Modal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const { user } = useGlobalContext();
  const [textareaValue, setTextareaValue] = useState("");
  const [tags, setTags] = useState([]);

  if (!isOpen) return null;
  const users = user?.$id;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addTask(title, priority, tags, textareaValue, users);

      setTitle("");
      setPriority("");
      setTextareaValue("");
      setTags([]);

      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-[9999] flex justify-center items-center ${
        isOpen ? "overflow-hidden" : ""
      }`}
      onClick={onClose}
    >
      <div
        className=" bg-white p-8 rounded-md w-[60%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg relative font-bold mb-4 after:w-full after:bg-newBgColor-7-1 after:h-1 after:absolute after:bottom-0 after:left-0 after:rounded-md">
            Add new task
          </h2>
          <p onClick={onClose} className="cursor-pointer">
            Go back
          </p>
        </div>
        <form className="border rounded-md px-4 py-4">
          <div className="mb-4">
            <MyCustomTextField
              id="title"
              label="Project Title"
              variant="outlined"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Tags:
            </label>

            <TagFiller tags={tags} onChange={handleTagsChange} />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <MyTextArea
              value={textareaValue}
              onChange={handleTextareaChange}
              placeholder={``}
            />
          </div>

          <div className="mb-4">
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                className="block text-sm font-medium text-gray-700"
              >
                Priority:
              </FormLabel>
              <RadioGroup
                row
                aria-label="priority"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <FormControlLabel value="Low" control={<Radio />} label="Low" />
                <FormControlLabel
                  value="Medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel
                  value="High"
                  control={<Radio />}
                  label="High"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="flex">
            <button
              onClick={handleSubmit}
              className=" bg-newBgColor-7-1 hover:bg-newBgColor-7-2 transition-all ease-in-out duration-200  text-white px-4 py-2 rounded-md"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
