import React, { useRef, useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import {
  MdAccountCircle,
  MdChatBubbleOutline,
  MdDelete,
  MdNearMe,
  MdOutlineExpandMore,
  MdSettings,
  MdUpdate,
  MdContentCopy
} from 'react-icons/md';
import {
  doc,
  updateDoc,
  increment,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  deleteDoc
} from 'firebase/firestore';
import db from '../../firebase';
import { useStateValue } from '../StateProvide';
import { IoLogOutOutline } from 'react-icons/io5';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { CiSettings } from 'react-icons/ci';
import { motion } from 'framer-motion';

// Firework particle component
const Particle = ({ angle, distance, color }) => {
  const duration = 0.8 + Math.random() * 0.5;
  
  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full ${color}`}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0
      }}
      transition={{
        duration: duration,
        ease: "easeOut"
      }}
      style={{
        originX: 0,
        originY: 0
      }}
    />
  );
};

const Post = ({ id, profilePic, username, image, timestamp, message }) => {
  const [{ user }, dispatch] = useStateValue();
  const [postData, setPostData] = useState({});
  const [liked, setLiked] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const expandMenuRef = useRef(null);
  const shareButtonRef = useRef(null);

  // 🔁 Fetch post data and like state
  useEffect(() => {
    if (!id) return;

    const postRef = doc(db, 'posts', id);
    const unsubscribe = onSnapshot(postRef, (docSnap) => {
      const data = docSnap.data();
      setPostData(data || {});
      setLiked(data?.likedBy?.includes(user?.uid));
    });

    return () => unsubscribe();
  }, [id, user?.uid]);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        expandMenuRef.current &&
        !expandMenuRef.current.contains(event.target)
      ) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLike = async () => {
    const postRef = doc(db, 'posts', id);

    if (liked) {
      await updateDoc(postRef, {
        likeCount: increment(-1),
        likedBy: arrayRemove(user.uid)
      });
    } else {
      await updateDoc(postRef, {
        likeCount: increment(1),
        likedBy: arrayUnion(user.uid)
      });
      // Trigger animation only when liking (not unliking)
      setAnimateLike(true);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'posts', id));
      alert('Post deleted!');
      setIsAccountOpen(false);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post.');
    }
  };

  const createFireworks = () => {
    const particles = [];
    const colors = [
      'bg-yellow-400', 
      'bg-orange-500', 
      'bg-red-500', 
      'bg-pink-500', 
      'bg-purple-500'
    ];
    
    for (let i = 0; i < 20; i++) {
      particles.push({
        id: Math.random().toString(36).substr(2, 9),
        angle: Math.random() * Math.PI * 2,
        distance: 30 + Math.random() * 50,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setFireworks(particles);
    setTimeout(() => setFireworks([]), 1000);
  };

  const handleShare = async () => {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, {
      shareCount: increment(1)
    });
    
    // Create firework effect
    createFireworks();
    
    // Copy post URL to clipboard
    const postUrl = `${window.location.origin}/post/${id}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy link to clipboard');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch({
      type: 'SET_USER',
      user: null
    });
  };

  return (
    <div className="w-full mt-4 rounded-2xl bg-white shadow">
      {/* Header */}
      <div className="flex relative pt-2 items-center px-3.5">
        <img
          src={profilePic}
          alt="Profile"
          className="mr-2.5 rounded-full h-10 w-10 object-cover"
        />
        <div>
          <h3 className="text-sm font-semibold">{username}</h3>
          <p className="text-xs text-gray-400">
            {timestamp?.toDate
              ? new Date(timestamp.toDate()).toUTCString()
              : ''}
          </p>
        </div>
      </div>

      {/* Message */}
      <div className="my-2.5 py-3.5 px-6">
        <p>{message}</p>
      </div>

      {/* Image */}
      {image && image.trim() !== '' && (
        <div className="mb-3.5 bg-black">
          <img
            src={image}
            alt="Post content"
            className="w-full max-h-[500px] object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Like/Share count */}
      <div className="flex justify-between px-3.5">
        <p className="text-sm font-semibold text-gray-400">
          {postData.likeCount > 0 ? `${postData.likeCount} Likes` : '0 Likes'}
        </p>
        <p className="text-sm font-semibold text-gray-400">
          {postData.shareCount > 0 ? `${postData.shareCount} Shares` : '0 Shares'}
        </p>
      </div>

      {/* Actions */}
      <div className="pt-2.5 border-t border-gray-200 flex justify-evenly text-md text-gray-500 cursor-pointer px-3.5 pb-3.5">
        <button
          onClick={handleLike}
          className={`relative hover:bg-[#eff2f5] cursor-pointer hover:rounded-xl hover:text-blue-500 flex items-center justify-center p-1 flex-1 ${
            liked ? 'text-blue-500 font-semibold' : ''
          }`}
        >
          <motion.div
            animate={animateLike ? {
              scale: [1, 1.4, 1],
              rotate: [0, 20, -20, 0],
              y: [0, -15, 0],
            } : {}}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
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
                className="absolute inset-0 bg-blue-500 rounded-full"
              />
            )}
          </motion.div>
          <p className="ml-2.5">Like</p>
        </button>

        <div className="hover:bg-[#eff2f5] hover:text-green-500 hover:rounded-xl flex items-center justify-center p-1 flex-1">
          <MdChatBubbleOutline />
          <p className="ml-2.5">Comment</p>
        </div>

        <div className="relative flex-1">
          <button
            ref={shareButtonRef}
            onClick={handleShare}
            className="relative w-full cursor-pointer hover:bg-[#eff2f5] hover:text-yellow-500 hover:rounded-xl flex items-center justify-center p-1"
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

        {/* Expand menu */}
        {user?.uid === postData?.userId && (
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
                className={`transition-transform duration-200 ${isAccountOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>

            {/* Dropdown */}
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
                      // Add update functionality here
                      setIsAccountOpen(false);
                    }}
                  >
                    <MdUpdate className="mr-3 h-5 w-5 text-gray-400" />
                    Update Post
                  </button>
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => {
                      navigator.clipboard.writeText(message);
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
        )}
      </div>
    </div>
  );
};

export default Post;