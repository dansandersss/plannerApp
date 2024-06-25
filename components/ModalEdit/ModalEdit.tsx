import { Box, Modal, Typography } from "@mui/material";
import React from "react";

interface ModalEditProps {
  editedTitle: string | undefined;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  editedDesc: string | undefined;
  editedPriority: string | undefined;
  editedStatus: string | undefined;
  isEditing: boolean;
  updateTask: () => void;
}

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

const ModalEdit: React.FC<ModalEditProps> = ({
  editedTitle,
  onChange,
  editedDesc,
  editedPriority,
  editedStatus,
  isEditing,
  updateTask,
}) => {
  return (
    <>
      <Modal open={isEditing} onClose={() => isEditing(false)}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between sm:gap-0"
          >
            <h2 className="text-lg after:absolute after:w-full after:bg-newBgColor-7-1 relative font-bold after:bottom-0 after:left-0 after:h-[2px] after:rounded-md rounded-md">
              Edit task
            </h2>
            <p
              onClick={() => isEditing(false)}
              className="cursor-pointer relative after:absolute after:w-full after:bg-black after:bottom-0 after:h-[2px] after:right-0 after:rounded-md after:opacity-70"
            >
              Go back
            </p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            <form className="border rounded-md px-4 py-4">
              <div className="flex flex-col gap-4 mb-4">
                <input
                  type="text"
                  name="title"
                  value={editedTitle || ""}
                  onChange={onChange}
                  className="border p-2 rounded-md"
                  placeholder="Title"
                />
              </div>
              <div className="mb-4 w-full">
                <textarea
                  name="desc"
                  value={editedDesc || ""}
                  onChange={onChange}
                  className="border p-2 rounded-md w-full h-[100px]"
                  placeholder="Description"
                ></textarea>
              </div>

              <div className="mb-4">
                <select
                  name="priority"
                  value={editedPriority || ""}
                  onChange={onChange}
                  className="border p-2 rounded-md"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="mb-4">
                <select
                  name="status"
                  value={editedStatus || ""}
                  onChange={onChange}
                  className="border p-2 rounded-md"
                >
                  <option value="in-progress">in-progress</option>
                  <option value="completed">completed</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => isEditing(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={updateTask}
                  className="bg-newBgColor-7-1 hover:bg-newBgColor-7-2 transition-all duration-200 ease-in-out text-white py-2 px-4 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ModalEdit;
