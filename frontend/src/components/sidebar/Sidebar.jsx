import React from 'react'
import SidebarRow from './SidebarRow'
import { BsChat, BsHospitalFill, BsPeople } from 'react-icons/bs'
import { MdEmojiFlags, MdOutlineExpandMore, MdVideoLibrary } from 'react-icons/md'
import { IoStorefront } from 'react-icons/io5'
import { useStateValue } from '../StateProvide'

const Sidebar = () => {

  const [{user}, dispatch] = useStateValue();
  return (
    <div className='hidden lg:block lg:flex-[0.33] lg:py-6.25 lg:px-2.5'>
      <SidebarRow 
        title={user.displayName}
        src={user.photoURL}
      />
      <SidebarRow 
        title="COVID-19 Information Center"
        Icon={BsHospitalFill}
      />
      <SidebarRow Icon={MdEmojiFlags} title="Pages" />
      <SidebarRow Icon={BsPeople} title="Friends" />
      <SidebarRow Icon={BsChat} title="Messenger" />
      <SidebarRow Icon={IoStorefront} title="Marketplace" />
      <SidebarRow Icon={MdVideoLibrary} title="Videos" />
      <SidebarRow Icon={MdOutlineExpandMore} />
    </div>
  )
}

export default Sidebar