import React, { useRef, useEffect, useState } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import {
  MdAccountCircle,
  MdChatBubbleOutline,
  MdDelete,
  MdNearMe,
  MdOutlineExpandMore,
  MdSettings,
  MdUpdate
} from 'react-icons/md'
import {
  doc,
  updateDoc,
  increment,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  deleteDoc
} from 'firebase/firestore'
import db from '../../firebase'
import { useStateValue } from '../StateProvide'
import { IoLogOutOutline } from 'react-icons/io5'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { CiSettings } from 'react-icons/ci'

const Post = ({ id, profilePic, username, image, timestamp, message }) => {
  const [{ user }, dispatch] = useStateValue()
  const [postData, setPostData] = useState({})
  const [liked, setLiked] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const expandMenuRef = useRef(null)

  // 🔁 Fetch post data and like state
  useEffect(() => {
    if (!id) return

    const postRef = doc(db, 'posts', id)
    const unsubscribe = onSnapshot(postRef, (docSnap) => {
      const data = docSnap.data()
      setPostData(data || {})
      setLiked(data?.likedBy?.includes(user?.uid))
    })

    return () => unsubscribe()
  }, [id, user?.uid])

  // ❌ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        expandMenuRef.current &&
        !expandMenuRef.current.contains(event.target)
      ) {
        setIsAccountOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLike = async () => {
    const postRef = doc(db, 'posts', id)

    if (liked) {
      await updateDoc(postRef, {
        likeCount: increment(-1),
        likedBy: arrayRemove(user.uid)
      })
    } else {
      await updateDoc(postRef, {
        likeCount: increment(1),
        likedBy: arrayUnion(user.uid)
      })
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?')
    if (!confirmDelete) return

    try {
      await deleteDoc(doc(db, 'posts', id))
      alert('Post deleted!')
      setIsAccountOpen(false)
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post.')
    }
  }

  const handleShare = async () => {
    const postRef = doc(db, 'posts', id)
    await updateDoc(postRef, {
      shareCount: increment(1)
    })
    alert('Post shared!')
  }

  const handleLogout = async () => {
    await signOut(auth)
    dispatch({
      type: 'SET_USER',
      user: null
    })
  }

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
              e.target.style.display = 'none'
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
          className={`hover:bg-[#eff2f5] hover:rounded-xl flex items-center justify-center p-1 flex-1 ${
            liked ? 'text-blue-500 font-semibold' : ''
          }`}
        >
          <FaThumbsUp />
          <p className="ml-2.5">Like</p>
        </button>

        <div className="hover:bg-[#eff2f5] hover:rounded-xl flex items-center justify-center p-1 flex-1">
          <MdChatBubbleOutline />
          <p className="ml-2.5">Comment</p>
        </div>

        <button
          onClick={handleShare}
          className="hover:bg-[#eff2f5] hover:rounded-xl flex items-center justify-center p-1 flex-1"
        >
          <MdNearMe />
          <p className="ml-2.5">Share</p>
        </button>

        {/* Expand menu */}
        {user?.uid === postData?.userId && (
          <div className="relative flex-1 flex justify-center items-center">
            <button
              className="hover:bg-[#eff2f5] hover:rounded-xl flex items-center justify-center p-1 w-full"
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              aria-expanded={isAccountOpen}
              aria-haspopup="true"
            >
              <MdAccountCircle />
              <MdOutlineExpandMore 
                className={`transition-transform duration-200 ${isAccountOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>

            {/* Dropdown */}
            {isAccountOpen && (
              <div
                ref={expandMenuRef}
                className={`absolute bottom-full mb-2 right-0 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-all duration-200 ${
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
                      setIsAccountOpen(false)
                    }}
                  >
                    <MdUpdate className="mr-3 h-5 w-5 text-gray-400" />
                    Update Post
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        
      </div>
    </div>
  )
}

export default Post
