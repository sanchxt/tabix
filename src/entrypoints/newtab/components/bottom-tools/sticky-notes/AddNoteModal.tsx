import { AddNoteModalProps } from "@/entrypoints/newtab/utils/types/sticky-notes";

const AddNoteModal = ({
  isOpen,
  onClose,
  onSave,
  newNote,
  setNewNote,
}: AddNoteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-slate-900/95 rounded-lg p-6 w-96">
        <h2 className="py-2 text-slate-200 font-bold">Add a New Note</h2>
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="w-full mb-2 p-2 border rounded-lg bg-slate-800 border-white/70 text-xs lg:text-sm font-normal"
        />
        <input
          type="color"
          value={newNote.color}
          onChange={(e) => setNewNote({ ...newNote, color: e.target.value })}
          className="w-full mb-2 p-2 border border-white/70 rounded-lg bg-slate-700"
        />
        <textarea
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          className="w-full mb-2 p-2 border border-white/70 rounded-lg bg-slate-800 text-xs lg:text-sm font-normal resize-none"
        ></textarea>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg">
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600/75 text-white rounded-lg text-sm hover:bg-blue-700/40"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
