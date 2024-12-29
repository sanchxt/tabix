export interface Note {
  id: string;
  title: string;
  color: string;
  content: string;
}

export interface AddNotePayload {
  title?: string;
  color?: string;
  content?: string;
}

export type AddNoteCallback = (message?: string) => void;

export interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export interface ConfirmDeleteModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  newNote: Partial<Note>;
  setNewNote: (note: Partial<Note>) => void;
}
