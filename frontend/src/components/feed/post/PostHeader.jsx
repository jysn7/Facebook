import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const PostHeader = ({ profilePic, username, timestamp }) => {
  const timeAgo = timestamp?.toDate
    ? dayjs(timestamp.toDate()).fromNow()
    : '';

  return (
    <div className="flex items-center gap-3 px-4 pt-3">
      <img
        src={profilePic}
        alt="Profile"
        className="h-11 w-11 rounded-full object-cover border border-gray-200 shadow-sm"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-800 tracking-wide">{username}</span>
        <span className="text-xs text-gray-500">{timeAgo}</span>
      </div>
    </div>
  );
};

export default PostHeader;
