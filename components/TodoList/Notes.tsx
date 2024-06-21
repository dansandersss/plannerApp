"use client";
import icons from "@/constants/icons";
import useFormatDate from "@/hooks/useFormatDate";
import {
  addNote,
  deleteNoteById,
  getAllNotes,
  updateNoteById,
} from "@/lib/appwrite";
import {
  faClipboard,
  faEllipsis,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import TodoNotesModal from "../Modal/TodoNotesModal";
import useDateForTodoNotes from "@/hooks/useDateForTodoNotes";
import ModalEditForNotes from "../ModalEdit/ModalEditForNotes";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { formatCreatedAt } = useDateForTodoNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descExists, setDescExists] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editedNote, setEditedNote] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchAllNotes = async () => {
    try {
      const notesList = await getAllNotes();
      setNotes(notesList);
      if (notes !== "") {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetching notes", error.message);
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const onSubmit = async (noteData) => {
    try {
      await addNote(noteData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenMenu = (index) => {
    setSelectedIndex(index);
    setMenuOpen(!menuOpen);

    console.log(index);
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
  };

  const handleOutsideClick = () => {
    setMenuOpen(false);
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteNoteById(noteId);
      setIsDeleted(true);
      fetchAllNotes();
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleEditNote = (note) => {
    setEditedNote({
      title: note.title,
      desc: note.desc,
    });
    setSelectedNoteId(note.$id);
    setEditModal(true);
    setMenuOpen(!menuOpen);
  };

  const handleCloseEditModal = () => {
    setEditModal(!editModal);
    setEditedNote(null);
  };

  const handleUpdateNote = async () => {
    const updatedData = {
      title: editedNote.title,
      desc: editedNote.desc,
    };
    try {
      const updateNote = await updateNoteById(selectedNoteId, updatedData);
      const updatedNotes = notes.map((note) =>
        note.$id === selectedNoteId ? updateNote : note
      );
      setNotes(updatedNotes);
      setEditModal(false);
      setEditedNote(null);
    } catch (error) {
      console.error("Error updating note", error.message);
    }
    setEditModal(false);
  };

  return (
    <>
      <section className="h-[50%] px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-black relative text-2xl font-bold  ">
            <span className="mr-2">
              <FontAwesomeIcon
                className="text-newTextColor-7-1"
                icon={icons.notesIcon}
              />
            </span>
            No<span className="text-newTextColor-7-1">tes</span>
          </h1>
          <div
            className="bg-newBgColor-7-1 px-2 py-1 rounded-md cursor-pointer text-newTextColor-7-2 hover:bg-newBgColor-7-2 hover:text-newBgColor-7-1 transition-all ease-in-out duration-200"
            onClick={handleOpenModal}
          >
            <FontAwesomeIcon className="" icon={faPlus} />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[250px]">
          {notes.length ? (
            notes.map((note, index) => (
              <div
                key={note.$id}
                className="mb-4 border p-4 rounded-md bg-slate-100 shadow-md"
              >
                <div className="flex flex-col gap-4">
                  <div
                    className="flex items-center justify-between"
                    onClick={handleOutsideClick}
                  >
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faClipboard} />
                      <p>{formatCreatedAt(note.$createdAt)}</p>
                    </div>
                    <div onClick={handleMenuClick} className="relative">
                      <FontAwesomeIcon
                        className="cursor-pointer"
                        icon={faEllipsis}
                        onClick={() => handleOpenMenu(index)}
                      />

                      {menuOpen && selectedIndex === index && (
                        <div
                          className="absolute right-1 mt-2 w-48 bg-white shadow-lg rounded-md z-10"
                          onClick={handleMenuClick}
                        >
                          <button
                            onClick={() => handleEditNote(note)} // Исправлено на использование замыкания
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left border-b-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(note.$id)} // Исправлено на использование замыкания
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <h2 className="font-bold text-lg">{note.title}</h2>
                  <p className="opacity-80 text-md">{note.desc}</p>
                  <p className="text-newTextColor-7-1">
                    {note.tags.join(", ")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No notes available</p>
          )}
        </div>

        {editedNote && (
          <ModalEditForNotes
            editedTitle={editedNote.title}
            editedDesc={editedNote.desc}
            onChange={(e) => {
              const { name, value } = e.target;
              setEditedNote((prevNote) => ({
                ...prevNote,
                [name]: value,
              }));
            }}
            closeEdit={handleCloseEditModal}
            updateNote={handleUpdateNote}
          />
        )}

        <TodoNotesModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          text={"note"}
          submit={onSubmit}
          desc={descExists}
        />
      </section>
    </>
  );
}

export default Notes;
