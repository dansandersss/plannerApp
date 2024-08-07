"use client";
import icons from "@/constants/icons";
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
import React, { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import TodoNotesModal from "../Modal/TodoNotesModal";
import useDateForTodoNotes from "@/hooks/useDateForTodoNotes";
import ModalEditForNotes from "../ModalEdit/ModalEditForNotes";
import LoaderForPages from "../Loader/LoaderForPages";
import { useSidebar } from "../Sidebar/SidebarContext";
import { useGlobalContext } from "@/context/GlobalProvider";

interface Note {
  $id: string;
  title: string;
  desc: string;
  $createdAt: string;
  tags: string[];
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { formatCreatedAt } = useDateForTodoNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descExists, setDescExists] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editedNote, setEditedNote] = useState<Note | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { isSidebarOpen } = useSidebar();
  const { user } = useGlobalContext();

  const fetchAllNotes = async (userId: string) => {
    try {
      const notesList = await getAllNotes(userId);
      setNotes(notesList);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching notes", error.message);
    }
  };

  useEffect(() => {
    if (user && user.$id) {
      fetchAllNotes(user.$id);
    }
  }, [user]);

  const onSubmit = async (noteData: Note) => {
    try {
      await addNote(noteData);
      fetchAllNotes(user.$id);
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

  const handleOpenMenu = (index: number) => {
    setSelectedIndex(index);
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleOutsideClick = () => {
    setMenuOpen(false);
  };

  const handleDelete = async (noteId: string) => {
    try {
      await deleteNoteById(noteId);
      setIsDeleted(true);
      setMenuOpen(false);
      fetchAllNotes(user.$id);
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditedNote({
      ...note,
    });
    setSelectedNoteId(note.$id);
    setEditModal(true);
    setMenuOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
    setEditedNote(null);
  };

  const handleUpdateNote = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedNoteId || !editedNote) return;

    const updatedData = {
      title: editedNote.title,
      desc: editedNote.desc,
    };

    try {
      const updatedNote = await updateNoteById(selectedNoteId, updatedData);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === selectedNoteId ? updatedNote : note
        )
      );
      setEditModal(false);
      setEditedNote(null);
    } catch (error) {
      console.error("Error updating note", error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoaderForPages loadingTime={5} />
      ) : (
        <section
          className={`h-[50%] px-4 transition-all ease-in-out duration-200 lg:translate-x-0 ${
            isSidebarOpen
              ? "translate-x-20 sm:translate-x-24 md:translate-x-28"
              : "translate-x-8 sm:-translate-x-0 md:-translate-x-2"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-black relative text-2xl font-bold">
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
              <FontAwesomeIcon icon={faPlus} />
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
                              onClick={() => handleEditNote(note)}
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left border-b-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(note.$id)}
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
        </section>
      )}
      {editedNote && (
        <ModalEditForNotes
          isEditing={editModal}
          editedTitle={editedNote.title}
          editedDesc={editedNote.desc}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setEditedNote((prevNote) =>
              prevNote ? { ...prevNote, [name]: value } : null
            );
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
    </>
  );
};

export default Notes;
