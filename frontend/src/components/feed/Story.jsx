import React from 'react'
import { RxAvatar } from 'react-icons/rx'

const Story = ({image, profileSrc, title}) => {
  return (
    <div style={{ backgroundImage: `url(${image})`}} className='relative bg-center bg-cover bg-no-repeat w-[120px] h-[200px] shadow rounded-xl mr-2.5 transition duration-100 ease-in cursor-pointer hover:scale-[1.07]'>
        <img 
         src={profileSrc} 
         alt="Profile" 
         className='m-2.5 border-4 border-[#2e81f4] rounded-full h-10 w-10 object-cover'
        />
        <h4 className='absolute bottom-5 left-5 font-semibold text-white'>{title}</h4>
    </div>
  )
}

export default Story