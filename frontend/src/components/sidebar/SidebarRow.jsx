import React from 'react'
import { RxAvatar } from 'react-icons/rx'

const SidebarRow = ({src, Icon, title}) => {
  return (
    <div className='flex items-center p-2.5 hover:bg-gray-200 cursor-pointer'>
        {src && <RxAvatar  src={src} size="1.5rem" />}
        {Icon && <Icon className='text-[#2e81f4]' size="1.5rem"/>}

        <h4 className="ml-5 font-semibold">{title}</h4>
    </div>
  )
}

export default SidebarRow