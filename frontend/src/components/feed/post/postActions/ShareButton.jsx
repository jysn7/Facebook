import React from 'react';
import { motion } from 'framer-motion';
import { MdNearMe } from 'react-icons/md';

export default function ShareButton({
  shareButtonRef,
  handleShare,
  showCopied,
  fireworks,
  Particle,
}) {
  return (
    <div className="relative flex-1">
      <button
        ref={shareButtonRef}
        onClick={handleShare}
        className="relative w-full cursor-pointer hover:bg-[#eff2f5] hover:text-green-300 hover:rounded-xl flex items-center justify-center p-1"
      >
        <MdNearMe />
        <p className="ml-2.5">Share</p>

        {showCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
          >
            Copied to clipboard!
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-800 rotate-45"></div>
          </motion.div>
        )}
      </button>

      {/* Fireworks particles */}
      {fireworks.length > 0 && (
        <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
          {fireworks.map((particle) => (
            <Particle
              key={particle.id}
              angle={particle.angle}
              distance={particle.distance}
              color={particle.color}
            />
          ))}
        </div>
      )}
    </div>
  );
}
