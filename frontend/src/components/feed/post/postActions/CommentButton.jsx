import React from 'react';
import { MdChatBubbleOutline } from 'react-icons/md';

export default function CommentButton() {
  return (
    <div className="hover:bg-[#eff2f5] hover:text-yellow-300 hover:rounded-xl flex items-center justify-center p-1 flex-1 cursor-pointer">
      <MdChatBubbleOutline />
      <p className="ml-2.5">Comment</p>
    </div>
  );
}
