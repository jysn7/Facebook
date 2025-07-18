import React, { useRef, useEffect, useState } from 'react'
import { FaSearch, FaHome, FaBars, FaTimes } from "react-icons/fa"
import { BsFlag } from "react-icons/bs";
import { motion } from 'framer-motion';
import { 
  MdOutlineSubscriptions, 
  MdSupervisedUserCircle,
  MdForum,
  MdNotificationsActive,
  MdExpandMore,
  MdSettings,
  MdHelp,
  MdNightlight,
  MdLogout
} from "react-icons/md"
import { IoLogOutOutline, IoStorefront } from "react-icons/io5"
import { IoMdAdd } from "react-icons/io"
import { RxAvatar } from "react-icons/rx"
import { useStateValue } from './StateProvide'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { actionTypes } from './reducer'

const Header = () => {
  const [{user}, dispatch] = useStateValue();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isExpandOpen, setIsExpandOpen] = useState(false);
  const expandMenuRef = useRef(null);

  const toggleExpandOptions = () => {
    setIsExpandOpen(!isExpandOpen)
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  };
  

  const handleLogout = () => {
  signOut(auth)
    .then(() => {
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      })
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Sign out error", error);
    });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expandMenuRef.current && !expandMenuRef.current.contains(event.target)) {
        setIsExpandOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='flex py-3.5 px-2 sm:px-5 justify-between sticky bg-white top-0 shadow-md z-50'>
        {/* Left section */}
        <div className='flex items-center'>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
            alt="facebook logo"
            className='h-8 sm:h-10'
          />
          <div className='hidden sm:flex items-center bg-[#eff2f5] p-2 ml-2 rounded-full'>
            <FaSearch className="text-gray-500" />
            <input 
              type="text" 
              placeholder="Search Facebook"
              className='hidden md:block bg-transparent border-none outline-none ml-2 w-40 lg:w-60'
            />
          </div>
        </div>

        {/* Center section */}
        <div className=' flex flex-1 justify-center max-w-2xl'>
          <div className='flex items-center border-b-3 border-b-blue-500 mx-1 sm:mx-2 px-2 sm:px-4 py-2 hover:rounded-lg cursor-pointer hover:bg-[#eff2f5]'>
            <FaHome className='text-[#2e81f4] text-xl sm:text-2xl' />
          </div>
          <div className='flex items-center mx-1 sm:mx-2 px-2 sm:px-4 py-2 rounded-lg cursor-pointer hover:bg-[#eff2f5] text-gray-500 hover:text-[#2e81f4]'>
            <BsFlag className='text-xl sm:text-2xl' />
          </div>
          <div className='flex items-center mx-1 sm:mx-2 px-2 sm:px-4 py-2 rounded-lg cursor-pointer hover:bg-[#eff2f5] text-gray-500 hover:text-[#2e81f4]'>
            <MdOutlineSubscriptions className='text-xl sm:text-2xl' />
          </div>
          <div className='flex items-center mx-1 sm:mx-2 px-2 sm:px-4 py-2 rounded-lg cursor-pointer hover:bg-[#eff2f5] text-gray-500 hover:text-[#2e81f4]'>
            <IoStorefront className='text-xl sm:text-2xl' />
          </div>
          <div className='flex items-center mx-1 sm:mx-2 px-2 sm:px-4 py-2 rounded-lg cursor-pointer hover:bg-[#eff2f5] text-gray-500 hover:text-[#2e81f4]'>
            <MdSupervisedUserCircle className='text-xl sm:text-2xl' />
          </div>
        </div>

        {/* Right section */}
        <div className='flex items-center space-x-1 sm:space-x-2'>
          
          {/* Desktop right menu items */}
          <div className=' sm:flex items-center space-x-1 sm:space-x-2'>
            <div 
             className='flex items-center p-1 rounded-full cursor-pointer hover:bg-gray-100'
            >
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className='mr-2.5  rounded-full h-10 w-10 object-cover'
              />
              <span className='hidden lg:block ml-2 font-medium'>{user.displayName}</span>
            </div>
            <div className='p-1 hidden lg:block sm:p-2 rounded-full text-gray-500 cursor-pointer hover:bg-gray-300'>
              <IoMdAdd className='text-lg sm:text-xl' />
            </div>
            <div className='p-1 sm:p-2 hidden lg:block rounded-full text-gray-500 cursor-pointer hover:bg-gray-300'>
              <MdForum className='text-lg sm:text-xl' />
            </div>
            <div className='p-1 sm:p-2 hidden md:block rounded-full text-gray-500 cursor-pointer hover:bg-gray-300'>
              <MdNotificationsActive className='text-lg sm:text-xl' />
            </div>
            <div className="relative">
              <button 
                className={`hidden sm:block p-1 sm:p-2 rounded-full text-gray-500 cursor-pointer hover:bg-gray-300 text-lg sm:text-xl transition-transform duration-200 ${isExpandOpen ? 'rotate-180' : 'rotate-0'}`}
                onClick={toggleExpandOptions}
                aria-expanded={isExpandOpen}
                aria-haspopup="true"
                aria-label="More options"
              >
                <MdExpandMore className='text-lg sm:text-xl' />
              </button>

              {isExpandOpen && (
                <div 
                  ref={expandMenuRef}
                  className="absolute border-1 border-gray-200 right-0 mt-2 w-50 origin-top-right rounded-md bg-white shadow-lg  ring-opacity-5 focus:outline-none z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="" role="none">
                    <button
                      className="flex w-full items-center px-4 cursor-pointer py-3 border-b-2 border-b-gray-200 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={() => setIsExpandOpen(false)}
                    >
                      <MdSettings className="mr-3 h-5 w-5 text-gray-400" />
                      Settings
                    </button>
                    <button
                      className="flex w-full items-center px-4 py-3 cursor-pointer text-sm text-red-500 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      <IoLogOutOutline className="mr-3 h-5 w-5 text-red-500" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>         
          </div>

          {/* Mobile menu button - only shows on small screens */}
          <div className='sm:hidden p-2 rounded-full text-gray-500 cursor-pointer hover:bg-gray-300'>
            {isMobileMenuOpen ? (
              <FaTimes className='text-xl' onClick={toggleMobileMenu} />
            ) : (
              <FaBars className='text-xl' onClick={toggleMobileMenu} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/75 bg-opacity-90 backdrop-blur-sm flex">
          {/* Transparent overlay that closes the sidebar when clicked */}
          <div
            className="flex-1"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />

          {/* Sidebar drawer fixed on the right */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-72 max-w-full h-full bg-white rounded-l-2xl shadow-2xl overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={toggleMobileMenu}
              className="absolute top-7 right-4 text-gray-500 hover:text-blue-500 transition"
              aria-label="Close sidebar"
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Header */}
            <div className="p-6 bg-blue-900/25 border-b border-gray-200 flex items-center space-x-4">
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className='mr-2.5  rounded-full h-10 w-10 object-cover'
              />
              <span className="font-semibold text-lg text-white">{user?.displayName || 'User Name'}</span>
            </div>

            {/* Sidebar content */}
            <nav className="p-6 space-y-4">
              <div className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition">
                <MdForum className="mr-3 text-xl" />
                <span>Messages</span>
              </div>

              <div className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition">
                <MdNotificationsActive className="mr-3 text-xl" />
                <span>Notifications</span>
              </div>

              <div className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition">
                <MdSettings className="mr-3 text-xl" />
                <span>Settings</span>
              </div>

              <div className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition">
                <MdHelp className="mr-3 text-xl" />
                <span>Help & Support</span>
              </div>

              <div className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition">
                <MdNightlight className="mr-3 text-xl" />
                <span>Dark Mode</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center p-3 rounded-lg cursor-pointer text-red-600 hover:bg-red-100 hover:text-red-700 transition w-full font-semibold"
              >
                <MdLogout className="mr-3 text-xl" />
                Log Out
              </button>
            </nav>

            {/* Footer disclaimer */}
            <div className='px-4 mt-12 mb-4'>
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

          </motion.div>
        </div>
      )}

    </>
  )
}

export default Header