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
import { FaFacebookMessenger, FaGift, FaStore, FaUserFriends } from 'react-icons/fa'
import { TfiVideoClapper } from "react-icons/tfi";
import { CiSaveDown1 } from 'react-icons/ci'
import { useStateValue } from '../StateProvide'

const Sidebar = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className='flex flex-col  justify-between px-2.5 py-4 h-full'>

      {/* Top Section */}
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
        <SidebarRow Icon={FaGift} title="Birthdays" />
        <SidebarRow Icon={FaFacebookMessenger} title="Mesenger" />
        <SidebarRow Icon={TfiVideoClapper} title="Mesenger" />
        <SidebarRow Icon={MdOutlineExpandMore} />
      </div>

      {/* Bottom Section: Disclaimer + Footer */}
      <div className='px-4 mt-6 mb-4'>
        {/* Disclaimer */}
        <div className='text-[11px] text-gray-500 leading-snug text-center mb-3'>
          <p>
            <strong>Disclaimer:</strong> This is a student-built portfolio project inspired by Facebook’s UI. Not affiliated with Meta Platforms, Inc.
          </p>
        </div>

        {/* Footer */}
        <div className='text-center text-xs text-gray-400 font-semibold'>
          By <span className='text-blue-500 tracking-wider'>JYSN</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
