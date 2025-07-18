import React from 'react';
import {
  MdOutlineExpandMore,
  MdDelete,
  MdUpdate,
  MdContentCopy,
} from 'react-icons/md';

export default function ExpandMenu({
  user,
  postData,
  profilePic,
  isAccountOpen,
  setIsAccountOpen,
  expandMenuRef,
  handleDelete,
  setUpdatedMessage,
  setUpdatedImage,
  setIsUpdateOpen,
}) {
  if (user?.uid !== postData?.userId) return null;

  return (
    <div className="relative flex-1 flex justify-center items-center">
      <button
        className="hover:bg-[#eff2f5] hover:rounded-xl flex items-center justify-center p-1 w-full"
        onClick={() => setIsAccountOpen(!isAccountOpen)}
        aria-expanded={isAccountOpen}
        aria-haspopup="true"
      >
        <img
          src={profilePic}
          alt="Profile"
          className="mr-2.5 rounded-full h-6 w-6 object-cover"
        />
        <MdOutlineExpandMore
          className={`transition-transform duration-200 ${
            isAccountOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {isAccountOpen && (
        <div
          ref={expandMenuRef}
          className={`absolute bottom-full mb-2 right-0 w-48 rounded-md bg-white shadow-lg ring-1 ring-gray-200 ring-opacity-5 focus:outline-none z-50 transition-all duration-200 ${
            isAccountOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={handleDelete}
            >
              <MdDelete className="mr-3 h-5 w-5 text-gray-400" />
              Delete Post
            </button>
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => {
                setUpdatedMessage(postData.message || '');
                setUpdatedImage(postData.image || '');
                setIsAccountOpen(false);
                setIsUpdateOpen(true);
              }}
            >
              <MdUpdate className="mr-3 h-5 w-5 text-gray-400" />
              Update Post
            </button>
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => {
                navigator.clipboard.writeText(postData.message);
                setIsAccountOpen(false);
              }}
            >
              <MdContentCopy className="mr-3 h-5 w-5 text-gray-400" />
              Copy Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
