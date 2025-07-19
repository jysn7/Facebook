import React from 'react'
import { useStateValue } from '../StateProvide';

const SidebarRow = ({src, Icon, title}) => {
  const [{user}, dispatch] = useStateValue();
  return (
    <div className='flex items-center hover:rounded-lg py-3.5 px-2.5  hover:bg-gray-200 cursor-pointer'>
        {src && <img 
                    src={user?.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                    alt="profile" 
                    className='h-8 w-8 -ml-1.5  rounded-full object-cover  flex-shrink-0'
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                    }}
                />}
        {Icon && <Icon className='text-[#2e81f4]' size="1.5rem"/>}

        <h4 className="ml-5 text-gray-900 font-semibold">{title}</h4>
    </div>
  )
}

export default SidebarRow