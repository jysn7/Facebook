import React from 'react'
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'

const Feed = () => {
  return (
    <div className='md:flex-1 flex px-8 md:px-37.5 py-7.5 w-[100vw] flex-col justify-center items-center'>
      <StoryReel />  
      <MessageSender />
    </div>
  )
}

export default Feed