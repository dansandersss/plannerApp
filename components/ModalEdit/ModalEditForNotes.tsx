import React from "react";

function ModalEditForNotes({
  editedTitle,
  onChange,
  editedDesc,
  closeEdit,
  updateNote,
}) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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

            <div className="flex justify-end gap-4">
              <button
                onClick={closeEdit}
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={updateNote}
                className="bg-newBgColor-7-1 hover:bg-newBgColor-7-2 transition-all duration-200 ease-in-out text-white py-2 px-4 rounded-md"
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

export default ModalEditForNotes;
