import React from 'react';
import { motion } from 'framer-motion';
import { doc, updateDoc } from 'firebase/firestore';
import db from '../../../firebase';

export default function UpdatePostPopup({
  isOpen,
  setIsOpen,
  updatedMessage,
  setUpdatedMessage,
  updatedImage,
  setUpdatedImage,
  id,
}) {
  if (!isOpen) return null;

  const handleUpdate = async () => {
    if (!updatedMessage.trim()) {
      alert('Message cannot be empty');
      return;
    }
    try {
      await updateDoc(doc(db, 'posts', id), {
        message: updatedMessage.trim(),
        image: updatedImage.trim(),
      });
      setIsOpen(false);
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Failed to update post.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/75 h-[100vh] bg-opacity-90 flex justify-center items-center z-50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-[90vw] max-w-lg"
      >
        <h2 className="text-2xl font-extrabold text-blue-500 mb-6 tracking-wide">
          Update Your Post
        </h2>

        <label htmlFor="updateMessage" className="block mb-1 font-semibold text-gray-400 tracking-wide">
          Message
        </label>
        <textarea
          id="updateMessage"
          value={updatedMessage}
          onChange={(e) => setUpdatedMessage(e.target.value)}
          rows={5}
          className="w-full p-3 border border-indigo-300 rounded-lg resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition duration-200 mb-6 text-gray-800 placeholder-gray-400"
          placeholder="Write your updated message..."
        />

        <label htmlFor="updateImage" className="block mb-1 font-semibold text-gray-400 tracking-wide">
          Image URL
        </label>
        <input
          id="updateImage"
          type="text"
          value={updatedImage}
          onChange={(e) => setUpdatedImage(e.target.value)}
          placeholder="Paste an image URL or leave empty"
          className="w-full p-3 border border-indigo-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition duration-200 mb-8 text-gray-800 placeholder-gray-400"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold
                       hover:bg-gray-300 transition duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold
                       hover:bg-blue-700 transition duration-150 shadow-md"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
