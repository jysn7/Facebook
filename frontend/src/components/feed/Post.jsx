import React from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { MdAccountCircle, MdChatBubbleOutline, MdNearMe, MdOutlineExpandMore } from 'react-icons/md'

const Post = ({profilePic, username, image, timestamp, message}) => {
  return (
    <div className='w-full mt-4 rounded-2xl bg-white shadow'>
      <div className='flex relative items-center p-3.75'>
        <img 
         src={profilePic} 
         alt="Profile" 
         className='mr-2.5  rounded-full h-10 w-10 object-cover'
        />
        <div>
            <h3 className='text-sm'>{username}</h3>
            <p className='text-xs text-gray-400'>Timestamp...</p>
        </div>      
      </div>
      <div className='my-2.5 py-3.5 px-6'>
        <p>{message}</p>
      </div>
      <div>
        <img 
         src={image} 
         alt="Image" 
         className='w-full'
        />
      </div>
      <div className='pt-2.5 border-t-1 border-t-gray-200 flex justify-evenly text-md text-gray-500 cursor-pointer p-3.75'>
        <div className="hover:bg-[#eff2f5] hover:rounded-xl flex items-center justify-center p-1 flex-1">
            <FaThumbsUp />
            <p className="ml-2.5">Like</p>
        </div>
        <div className="hover:bg-[#eff2f5] hover:rounded-xl flex items-center justify-center p-1 flex-1">
            <MdChatBubbleOutline />
            <p className="ml-2.5">Comment</p>
        </div>
        <div className="hover:bg-[#eff2f5] hover:rounded-xl flex items-center justify-center p-1 flex-1">
            <MdNearMe />
            <p className="ml-2.5">Share</p>
        </div>
        <div className="hover:bg-[#eff2f5] hover:rounded-xl flex items-center justify-center p-1 flex-1">
            <MdAccountCircle />
            <MdOutlineExpandMore />
        </div>
      </div>
    </div>
  )
}

export default Post
