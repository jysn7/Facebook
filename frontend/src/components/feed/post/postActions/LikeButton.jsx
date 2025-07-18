import React from 'react';
import { motion } from 'framer-motion';
import { FaThumbsUp } from 'react-icons/fa';

export default function LikeButton({ liked, animateLike, setAnimateLike, handleLike }) {
  return (
    <button
      onClick={handleLike}
      className={`relative hover:bg-[#eff2f5] cursor-pointer hover:rounded-xl flex items-center justify-center p-1 flex-1 ${
        liked ? 'text-blue-500 font-semibold' : 'text-gray-600'
      }`}
    >
      <motion.div
        animate={
          animateLike
            ? {
                scale: [1, 1.4, 1],
                rotate: [0, 20, -20, 0],
                y: [0, -15, 0],
              }
            : {}
        }
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
          times: [0, 0.2, 0.5, 0.8, 1],
        }}
        onAnimationComplete={() => setAnimateLike(false)}
        className="relative"
      >
        <FaThumbsUp className="z-10 relative" />
        {animateLike && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-blue-300 rounded-full"
          />
        )}
      </motion.div>
      <p className="ml-2.5">{liked ? 'Liked' : 'Like'}</p>
    </button>
  );
}
