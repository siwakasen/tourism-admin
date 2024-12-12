import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  handleAccept: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  handleAccept,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">{title || "Modal Title"}</h2>
          <button
            className="absolute top-2 right-2 btn btn-sm bg-slate-700 hover:bg-slate-800 border-none btn-circle text-white "
            onClick={onClose}
          >
            X
          </button>
        </div>

        {/* Body */}
        <div className="py-4">{children}</div>

        {/* Footer */}
        <div className="border-t pt-2 mt-4 flex justify-end gap-2">
          <button
            className="btn btn-md bg-slate-400 hover:bg-slate-500 border-none text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-md bg-emerald-600 hover:bg-emerald-700 border-none text-white"
            onClick={() => {
              handleAccept();
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
