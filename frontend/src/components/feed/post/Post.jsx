import React, { useRef, useEffect, useState } from 'react';
import {
  doc,
  updateDoc,
  increment,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  deleteDoc
} from 'firebase/firestore';
import db from '../../../firebase';
import { useStateValue } from '../../StateProvide';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { motion } from 'framer-motion';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostStats from './PostStats';
import PostActions from './postActions/PostActions';
import UpdatePostPopup from './UpdatePostPopup';

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

  // New states for update popup
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState('');
  const [updatedImage, setUpdatedImage] = useState('');

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
    <>
      <div className="w-full mt-4 rounded-2xl bg-white shadow">
        {/* Header */}
        <PostHeader
         profilePic={postData.profilePic}
         username={postData.username}
         timestamp={postData.timestamp}
        />

        {/* Message */}
        <div className="my-1 py-3 px-6">
          <p>{postData.message}</p>
        </div>

        {/* Image */}
        <PostImage image={postData.image} />

        {/* Like/Share count */}
        <PostStats
         likeCount={postData.likeCount}
         shareCount={postData.shareCount}
        />

        {/* Actions */}
        <PostActions
          liked={liked}
          animateLike={animateLike}
          setAnimateLike={setAnimateLike}
          handleLike={handleLike}
          handleShare={handleShare}
          shareButtonRef={shareButtonRef}
          showCopied={showCopied}
          fireworks={fireworks}
          Particle={Particle}
          user={user}
          postData={postData}
          profilePic={profilePic}
          isAccountOpen={isAccountOpen}
          setIsAccountOpen={setIsAccountOpen}
          expandMenuRef={expandMenuRef}
          handleDelete={handleDelete}
          setUpdatedMessage={setUpdatedMessage}
          setUpdatedImage={setUpdatedImage}
          setIsUpdateOpen={setIsUpdateOpen}
        />
      </div>

      {/* Update Post */}
      <UpdatePostPopup
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        updatedMessage={updatedMessage}
        setUpdatedMessage={setUpdatedMessage}
        updatedImage={updatedImage}
        setUpdatedImage={setUpdatedImage}
        id={id}
      />
    </>
  );
};

export default Post;
