import React from 'react'
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'
import Post from './Post'

const Feed = () => {
  return (
    <div className='flex-1 w-full px-4 md:px-8 py-4 md:py-6'>
      <div className='max-w-[600px] w-full mx-auto flex flex-col space-y-4 md:space-y-6'>
        {/* StoryReel with proper overflow containment */}
        <div className='w-full overflow-x-hidden'>
          <StoryReel />  
        </div>
        
        <MessageSender />
        <Post 
         
         profilePic="https://api.dicebear.com/9.x/adventurer/svg?seed=Sawyer"
         message="Wow this works"
         timestamp="this is a timestamp"
         username="jysnbly7"
         image="https://images.unsplash.com/photo-1682685796852-aa311b46f50d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>
  )
}

export default Feed