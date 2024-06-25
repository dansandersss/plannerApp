import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { addTask } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import MyCustomTextField from "../ui/CustomTextField/CustomTextField";
import TagFiller from "../ui/TagFiller/TagFiller";
import MyTextArea from "../ui/CustomTextArea/CustomTextArea";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/material";

const CustomRadio = styled(Radio)(({ theme }) => ({
  "&.Mui-checked": {
    color: "#FF6767",
  },
}));

const CustomFormLabel = styled(FormLabel)(({ theme }) => ({
  "&.Mui-focused": {
    color: "#FF6767",
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
  color: "#010101",
};

interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BasicModal: React.FC<BasicModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const { user } = useGlobalContext<{ user: User }>();
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  if (!isOpen) return null;

  const users = user?.$id;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between sm:gap-0"
        >
          <h2 className="text-lg after:absolute after:w-full after:bg-newBgColor-7-1 relative font-bold after:bottom-0 after:left-0 after:h-[2px] after:rounded-md rounded-md">
            Add new task
          </h2>
          <p
            onClick={onClose}
            className="cursor-pointer relative after:absolute after:w-full after:bg-black after:bottom-0 after:h-[2px] after:right-0 after:rounded-md after:opacity-70"
          >
            Go back
          </p>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 4 }}>
          <form onSubmit={handleSubmit} className="border rounded-md px-4 py-4">
            <div className="mb-4">
              <MyCustomTextField
                id="title"
                label="Project Title"
                variant="outlined"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-gray-700">
                Tags:
              </label>
              <TagFiller tags={tags} onChange={handleTagsChange} />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <MyTextArea
                value={textareaValue}
                onChange={handleTextareaChange}
                placeholder="Describe your task..."
              />
            </div>

            <div className="mb-4">
              <FormControl component="fieldset" sx={{ color: "#010101" }}>
                <CustomFormLabel
                  component="legend"
                  className="block text-sm font-medium text-gray-700"
                >
                  Priority:
                </CustomFormLabel>
                <RadioGroup
                  row
                  aria-label="priority"
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <FormControlLabel
                    value="Low"
                    control={<CustomRadio />}
                    label="Low"
                  />
                  <FormControlLabel
                    value="Medium"
                    control={<CustomRadio />}
                    label="Medium"
                  />
                  <FormControlLabel
                    value="High"
                    control={<CustomRadio />}
                    label="High"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="flex">
              <button
                type="submit"
                className="bg-newBgColor-7-1 hover:bg-newBgColor-7-2 transition-all ease-in-out duration-200 text-white px-4 py-2 rounded-md"
              >
                Done
              </button>
            </div>
          </form>
        </Typography>
      </Box>
    </Modal>
  );
};

export default BasicModal;
