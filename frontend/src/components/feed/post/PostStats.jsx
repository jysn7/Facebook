import { FaThumbsUp, FaShare } from 'react-icons/fa';

const PostStats = ({ likeCount, shareCount }) => (
  <div className="flex justify-start gap-4 px-4 py-2 border-t border-gray-200 text-gray-600 text-sm select-none">
    <div className="flex items-center space-x-1">
      <FaThumbsUp className="text-blue-500" />
      <span className="font-medium">
        {likeCount > 0 ? likeCount : 0}
      </span>
    </div>
    <div className="flex items-center space-x-1">
      <FaShare className="text-green-500 rotate-12" />
      <span className="font-medium">
        {shareCount > 0 ? shareCount : 0}
      </span>
    </div>
  </div>
);

export default PostStats;
