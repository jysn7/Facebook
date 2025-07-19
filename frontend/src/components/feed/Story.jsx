import React from 'react'
import { RxAvatar } from 'react-icons/rx'

const Story = ({image, profileSrc, title}) => {
  return (
    <div style={{ backgroundImage: `url(${image})`}} className='relative my-1.5 p-1 bg-center bg-cover bg-no-repeat w-[100px] h-[170px] shadow rounded-xl mr-1.5 transition duration-100 ease-in cursor-pointer hover:scale-[1.07]'>
        <img 
         src={profileSrc} 
         alt="Profile" 
         className=' border-4 border-[#2e81f4] rounded-full h-10 w-10 object-cover'
        />
        <h4 className='absolute bottom-2 left-3 leading-5 text-sm flex flex-wrap font-semibold text-white'>{title}</h4>
    </div>
  )
}

export default Story