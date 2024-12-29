import { useState, useEffect } from "react";
import {
  AddNoteCallback,
  AddNotePayload,
  Note,
} from "../utils/types/sticky-notes";

const useStickyNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = () => {
      chrome.runtime.sendMessage(
        { action: "fetchNotes" },
        (response: Note[]) => {
          setNotes(response || []);
        }
      );
    };
    fetchNotes();

    const handleStorageChange = () => fetchNotes();
    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const addNote = (
    note: AddNotePayload,
    onSuccess: AddNoteCallback,
    onError: AddNoteCallback
  ) => {
    if (notes.length >= 4) {
      onError("Maximum of 4 notes allowed");
      return;
    }
    chrome.runtime.sendMessage(
      { action: "createNote", payload: note },
      (response) => {
        if (response.success) {
          setNotes(response.notes);
          onSuccess();
        } else {
          onError(response.message);
        }
      }
    );
  };

  const deleteNote = (id: string, onSuccess: AddNoteCallback) => {
    chrome.runtime.sendMessage(
      { action: "deleteNote", payload: { id } },
      (response) => {
        if (response.success) {
          setNotes(response.notes);
          onSuccess();
        }
      }
    );
  };

  return { notes, addNote, deleteNote };
};

export default useStickyNotes;
