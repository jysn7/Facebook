import React from 'react'
import Story from './Story'

const StoryReel = () => {
  return (
    <div className='flex overflow-x-auto scrollbar-hide'>
        <Story 
         profileSrc="https://api.dicebear.com/9.x/adventurer/svg?seed=Sara"
         image="https://images.unsplash.com/photo-1751401373796-413fffd7d410?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
         title="Jayson"
        />
        <Story 
         profileSrc="https://api.dicebear.com/9.x/adventurer/svg?seed=Eden"
         image="https://images.unsplash.com/photo-1743856842985-e1d4fc72a255?q=80&w=709&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
         title="Mihle"
        />
        <Story 
         profileSrc="https://api.dicebear.com/9.x/adventurer/svg?seed=Christian"
         image="https://images.unsplash.com/photo-1743300873242-66867adc485b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
         title="Mutsa"
        />
        <Story 
         profileSrc="https://api.dicebear.com/9.x/adventurer/svg?seed=Sawyer"
         image="https://images.unsplash.com/photo-1744144501263-d51045ebec13?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
         title="Karabo"
        />
        <Story 
         profileSrc="https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia"
         image="https://images.unsplash.com/photo-1750265212496-c8c01ee2c1bf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
         title="Andy"
        />
    </div>
  )
}

export default StoryReel