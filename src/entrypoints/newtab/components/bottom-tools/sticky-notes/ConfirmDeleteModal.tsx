import { ConfirmDeleteModal } from "@/entrypoints/newtab/utils/types/sticky-notes";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDeleteModal) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-slate-900/95 rounded-xl p-4 w-96 xl:w-[30rem]">
        <h3 className="py-2 text-slate-200 font-bold text-lg">Delete?</h3>
        <p className="font-thin text-base">
          Are you sure you want to delete this note?
        </p>
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600/75 text-white rounded-lg hover:bg-red-700/40 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
