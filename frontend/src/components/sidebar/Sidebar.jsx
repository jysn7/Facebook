import React from 'react'
import SidebarRow from './SidebarRow'
import { BsCalendar, BsChat, BsClockHistory, BsGraphUp, BsHospitalFill, BsPeople } from 'react-icons/bs'
import { MdEmojiFlags, MdOutlineAmpStories, MdOutlineExpandMore, MdOutlineGroups3, MdPersonalVideo, MdVideoLibrary } from 'react-icons/md'
import { IoStorefront } from 'react-icons/io5'
import { useStateValue } from '../StateProvide'
import { FaStore, FaUserFriends } from 'react-icons/fa'
import { CiSaveDown1 } from 'react-icons/ci'

const Sidebar = () => {

  const [{user}, dispatch] = useStateValue();
  return (
    <div className='hidden lg:block lg:flex-[0.33] lg:py-6.25 lg:px-2.5 fixed h-[calc(100vh-20px)] mt-10 overflow-y-auto top-5'>
      <div className='px-2.5'>
        <SidebarRow 
        title={user.displayName}
        src={user.photoURL}
      />
      <SidebarRow Icon={FaUserFriends} title="Friends" />
      <SidebarRow Icon={BsClockHistory} title="Memories" />
      <SidebarRow Icon={CiSaveDown1} title="Saved" />
      <SidebarRow Icon={MdOutlineGroups3} title="Groups" />
      <SidebarRow Icon={MdPersonalVideo} title="Video" />
      <SidebarRow Icon={FaStore} title="Marketplace" />
      <SidebarRow Icon={BsCalendar} title="Events" />
      <SidebarRow Icon={BsGraphUp} title="Analytics" />
      <SidebarRow Icon={MdOutlineExpandMore} />
      </div> 
    </div>
  )
}

export default Sidebar