import React from "react";
import TagFiller from "../ui/TagFiller/TagFiller";

function ModalEdit({
  editedTitle,
  onChange,
  editedDesc,
  editedPriority,
  editedStatus,
  isEditing,
  updateTask,
}) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-md">
          <h2 className="text-2xl mb-4">Edit Task</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              value={editedTitle || ""}
              onChange={onChange}
              className="border p-2 rounded-md"
              placeholder="Title"
            />
            <textarea
              name="desc"
              value={editedDesc || ""}
              onChange={onChange}
              className="border p-2 rounded-md"
              placeholder="Description"
            ></textarea>
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

            <select
              name="status"
              value={editedStatus || ""}
              onChange={onChange}
              className="border p-2 rounded-md"
            >
              <option value="in-progress">in-progress</option>
              <option value="completed">completed</option>
            </select>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => isEditing(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={updateTask}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalEdit;
