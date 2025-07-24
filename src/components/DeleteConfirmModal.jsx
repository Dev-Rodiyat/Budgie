import React from 'react';
import { FiX } from 'react-icons/fi';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 w-full max-w-sm rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>
        <h3 className="text-lg font-semibold mb-2">Delete Confirmation</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete <span className="font-medium">{itemName}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
