import React from 'react'
import SidebarRow from './SidebarRow'
import {
  BsCalendar,
  BsClockHistory,
  BsGraphUp
} from 'react-icons/bs'
import {
  MdOutlineExpandMore,
  MdOutlineGroups3,
  MdPersonalVideo
} from 'react-icons/md'
import { FaStore, FaUserFriends } from 'react-icons/fa'
import { CiSaveDown1 } from 'react-icons/ci'
import { useStateValue } from '../StateProvide'

const Sidebar = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className='hidden lg:block lg:flex-[0.33] lg:py-6.25 lg:px-2.5 fixed h-[calc(100vh-20px)] mt-10 top-5 overflow-y-auto md:flex-col justify-between'>
      {/* Content */}
      <div className='px-2.5'>
        <SidebarRow title={user.displayName} src={user.photoURL} />
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

      {/* Footer */}
      <footer className='flex justify-center gap-1 font-semibold bottom-0 fixed left-30 text-center text-xs text-gray-400 py-4'>
         By <span className='text-blue-500 tracking-wider'>{" "}JYSN</span>
      </footer>
    </div>
  )
}

export default Sidebar;
