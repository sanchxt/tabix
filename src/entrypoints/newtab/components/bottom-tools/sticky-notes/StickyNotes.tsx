import { SetStateAction, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

import NoteCard from "./NoteCard";
import AddNoteModal from "./AddNoteModal";
import useStickyNotes from "../../../hooks/useStickyNotes";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { Note } from "@/entrypoints/newtab/utils/types/sticky-notes";

const StickyNotes = () => {
  const { notes, addNote, deleteNote } = useStickyNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [newNote, setNewNote] = useState<Partial<Note>>({
    title: "",
    color: "#FFD700",
    content: "",
  });

  return (
    <div className="w-full h-full p-2 overflow-y-auto no-scrollbar">
      <div className="flex px-5 w-full justify-between items-center py-4 text-slate-300">
        <h3 className="text-sm lg:text-base italic font-medium flex-grow">
          Sticky Notes
        </h3>
        <button
          className="text-xl md:text-2xl xl:text-3xl"
          onClick={() => setIsModalOpen(true)}
        >
          <IoAddCircleOutline />
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
        {notes.length === 0 ? (
          <p className="italic text-slate-400 col-span-4 text-xs xl:text-sm">
            Add a note to view it here.
          </p>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={(id: SetStateAction<string | null>) => {
                setIsDeleteModalOpen(true);
                setNoteToDelete(id);
              }}
            />
          ))
        )}
      </div>

      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => addNote(newNote, () => setIsModalOpen(false), alert)}
        newNote={newNote}
        setNewNote={setNewNote}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() =>
          deleteNote(noteToDelete!, () => setIsDeleteModalOpen(false))
        }
      />
    </div>
  );
};

export default StickyNotes;
