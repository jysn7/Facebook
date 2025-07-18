import React, { useRef } from 'react'
import Story from './Story'
import { CiCircleChevRight, CiCircleChevLeft } from "react-icons/ci";

const stories = [
  {
    profileSrc: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sara",
    image: "https://images.unsplash.com/photo-1751401373796-413fffd7d410?q=80&w=688&auto=format&fit=crop",
    title: "Jayson"
  },
  {
    profileSrc: "https://api.dicebear.com/9.x/adventurer/svg?seed=Eden",
    image: "https://i.pinimg.com/736x/f9/0c/17/f90c1791c26bb12fc4b8d525fa3338fd.jpg",
    title: "Repunzel"
  },
  {
    profileSrc: "https://api.dicebear.com/9.x/adventurer/svg?seed=Christian",
    image: "https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Pinky Pinky"
  },
  {
    profileSrc: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sawyer",
    image: "https://images.unsplash.com/photo-1744144501263-d51045ebec13?q=80&w=764&auto=format&fit=crop",
    title: "A. Hamilton"
  },
  {
    profileSrc: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia",
    image: "https://images.unsplash.com/photo-1750265212496-c8c01ee2c1bf?q=80&w=687&auto=format&fit=crop",
    title: "Andy"
  },
  {
    profileSrc: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia",
    image: "https://images.unsplash.com/photo-1526052902936-2f0e8fa5121a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Barabra B."
  },
  {
    profileSrc: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia",
    image: "https://i.pinimg.com/736x/1b/00/40/1b0040c64af41da706a51d610e7407b5.jpg",
    title: "Spongebob"
  },
  {
    profileSrc: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia",
    image: "https://i.pinimg.com/736x/76/dc/06/76dc060c910071887ae37f1beba3c594.jpg",
    title: "Finn"
  },
  {
    profileSrc: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia",
    image: "https://i.pinimg.com/736x/63/3a/0c/633a0cdb1a5378ee522739bda70c7370.jpg",
    title: "Asta"
  }
]

const StoryReel = () => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    const { current } = scrollRef
    if (current) {
      const scrollAmount = window.innerWidth < 640 ? 100 : 200
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative max-w-screen md:w-full">
      {/* Scroll Buttons (hidden on small devices) */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <CiCircleChevLeft  size={20} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <CiCircleChevRight  size={20} />
      </button>

      {/* Scrollable Story List */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
      >
        <div className="flex space-x-3 pl-3 pr-3">
          {stories.map((story, index) => (
          <div
            key={index}
            className="shrink-0 snap-center w-[112px]  md:w-[117px] lg:w-[120px]"
          >
            <Story {...story} />
          </div>
        ))}
        </div>    
      </div>
    </div>
  )
}

export default StoryReel
