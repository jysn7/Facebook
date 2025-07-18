import React, { useRef, useEffect, useState } from 'react'
import { FaSearch, FaHome, FaBars, FaTimes } from "react-icons/fa"
import { BsFlag } from "react-icons/bs"
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
          {/* Mobile menu button - only shows on small screens */}
          <div className='sm:hidden p-2 rounded-full text-gray-500 cursor-pointer hover:bg-gray-300'>
            {isMobileMenuOpen ? (
              <FaTimes className='text-xl' onClick={toggleMobileMenu} />
            ) : (
              <FaBars className='text-xl' onClick={toggleMobileMenu} />
            )}
          </div>
          
          {/* Desktop right menu items */}
          <div className=' sm:flex items-center space-x-1 sm:space-x-2'>
            <a 
             className='flex items-center p-1 rounded-full cursor-pointer hover:bg-gray-100'
             href='/profile'
            >
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className='mr-2.5  rounded-full h-10 w-10 object-cover'
              />
              <span className='hidden lg:block ml-2 font-medium'>{user.displayName}</span>
            </a>
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
                  className="absolute right-0 mt-2 w-50 origin-top-right rounded-md bg-white shadow-lg  ring-opacity-5 focus:outline-none z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="" role="none">
                    <button
                      className="flex w-full items-center px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={() => setIsExpandOpen(false)}
                    >
                      <MdSettings className="mr-3 h-5 w-5 text-gray-400" />
                      Settings
                    </button>
                    <button
                      className="flex w-full items-center px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      <IoLogOutOutline className="mr-3 h-5 w-5 text-gray-400" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-40'>
          {/* Overlay */}
          <div 
            className='absolute inset-0 bg-black bg-opacity-50'
            onClick={toggleMobileMenu}
          ></div>
          
          {/* Sidebar Content */}
          <div className='absolute right-0 top-0 h-full w-64 bg-white shadow-lg overflow-y-auto'>
            <div className='p-4 border-b border-gray-200 flex items-center justify-between'>
              <div className='flex items-center'>
                <RxAvatar size="2rem" className='text-gray-500 mr-3' />
                <span className='font-medium'>User Name</span>
              </div>
              <FaTimes 
                className='text-gray-500 text-xl cursor-pointer' 
                onClick={toggleMobileMenu}
              />
            </div>
            
            <div className='p-2'>
              <div className='flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer'>
                <RxAvatar className='text-gray-500 mr-3 text-xl' />
                <span>Your Profile</span>
              </div>
              <div className='flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer'>
                <MdForum className='text-gray-500 mr-3 text-xl' />
                <span>Messages</span>
              </div>
              <div className='flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer'>
                <MdNotificationsActive className='text-gray-500 mr-3 text-xl' />
                <span>Notifications</span>
              </div>
              <div className='flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer'>
                <MdSettings className='text-gray-500 mr-3 text-xl' />
                <span>Settings</span>
              </div>
              <div className='flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer'>
                <MdHelp className='text-gray-500 mr-3 text-xl' />
                <span>Help & Support</span>
              </div>
              <div className='flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer'>
                <MdNightlight className='text-gray-500 mr-3 text-xl' />
                <span>Dark Mode</span>
              </div>
              <button 
               className='flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer'
               onClick={handleLogout}
              >
                <MdLogout className='text-gray-500 mr-3 text-xl' />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header