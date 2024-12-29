import { TiDelete } from "react-icons/ti";
import { NoteCardProps } from "@/entrypoints/newtab/utils/types/sticky-notes";

const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  return (
    <div
      style={{ backgroundColor: note.color }}
      className="relative pt-1 pb-2 px-3 rounded-lg shadow-md hover:shadow-lg min-h-28 max-h-32 overflow-hidden"
    >
      <h4 className="text-sm lg:text-base font-bold overflow-hidden text-ellipsis py-1">
        {note.title}
      </h4>
      <p className="text-xs lg:text-sm text-slate-100 font-light">
        {note.content}
      </p>
      <button
        onClick={() => onDelete(note.id)}
        className="absolute top-0 right-0 text-white text-xl lg:text-2xl"
      >
        <TiDelete />
      </button>
    </div>
  );
};

export default NoteCard;
