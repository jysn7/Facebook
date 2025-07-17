import React, { useState } from 'react'
import { FaVideo } from 'react-icons/fa'
import { IoImagesOutline } from 'react-icons/io5'
import { VscSmiley } from 'react-icons/vsc'

const MessageSender = () => {
    const [input, setInput] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const handleSubmit = e => {
        e.preventDefault()
        setInput("")
        setImageUrl("")
    }

    return (
        <div className='mt-4 sm:mt-7 bg-white rounded-lg sm:rounded-2xl shadow w-full max-w-full overflow-hidden'>
            {/* Top section - Input area */}
            <div className='flex border-b border-[#eff2f5] p-3 sm:p-4'>
                <img 
                    src="https://api.dicebear.com/9.x/adventurer/svg?seed=Sara" 
                    alt="Profile" 
                    className='h-8 w-8 sm:h-10 sm:w-10 border-2 sm:border-4 border-[#2e81f4] rounded-full object-cover mr-2 sm:mr-3 flex-shrink-0'
                />
                <form className='flex flex-1 flex-col sm:flex-row gap-2 sm:gap-0 w-full min-w-0'>
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        className='flex-1 outline-none border-none px-3 py-2 sm:py-1 mx-1 sm:mx-2 rounded-full bg-[#eff2f5] text-sm sm:text-base min-w-0'
                        placeholder="What's on your mind?" 
                    />
                    <input 
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        type="text"
                        className='outline-none border-none px-3 py-2 sm:py-1 mx-1 sm:mx-2 rounded-full bg-[#eff2f5] text-sm sm:text-base sm:w-1/3 min-w-0'
                        placeholder="Image URL (Optional)"
                    />
                    <button 
                        onClick={handleSubmit} 
                        className='hidden'
                        type='submit'
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Bottom section - Options */}
            <div className='flex justify-evenly p-2 py-4 sm:p-4'>
                <div className='flex items-center justify-center flex-1 p-2 rounded-lg hover:bg-[#eff2f5] cursor-pointer transition-colors text-gray-500 overflow-hidden'>
                    <FaVideo className='text-red-500 text-lg sm:text-xl mr-1 sm:mr-2 flex-shrink-0' />
                    <span className='text-xs sm:text-sm font-medium truncate'>Live Video</span>
                </div>
                <div className='flex items-center justify-center flex-1 p-2 rounded-lg hover:bg-[#eff2f5] cursor-pointer transition-colors text-gray-500 overflow-hidden'>
                    <IoImagesOutline className='text-green-500 text-lg sm:text-xl mr-1 sm:mr-2 flex-shrink-0' />
                    <span className='text-xs sm:text-sm font-medium truncate'>Photo/Video</span>
                </div>
                <div className='flex items-center justify-center flex-1 p-2 rounded-lg hover:bg-[#eff2f5] cursor-pointer transition-colors text-gray-500 overflow-hidden'>
                    <VscSmiley className='text-yellow-500 text-lg sm:text-xl mr-1 sm:mr-2 flex-shrink-0' />
                    <span className='text-xs sm:text-sm font-medium truncate'>Feeling/Activity</span>
                </div>
            </div>
        </div>
    )
}

export default MessageSender