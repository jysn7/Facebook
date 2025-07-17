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
    image: "https://images.unsplash.com/photo-1743856842985-e1d4fc72a255?q=80&w=709&auto=format&fit=crop",
    title: "Mihle"
  },
  {
    profileSrc: "https://api.dicebear.com/9.x/adventurer/svg?seed=Christian",
    image: "https://images.unsplash.com/photo-1743300873242-66867adc485b?q=80&w=687&auto=format&fit=crop",
    title: "Mutsa"
  },
  {
    profileSrc: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sawyer",
    image: "https://images.unsplash.com/photo-1744144501263-d51045ebec13?q=80&w=764&auto=format&fit=crop",
    title: "Karabo"
  },
  {
    profileSrc: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia",
    image: "https://images.unsplash.com/photo-1750265212496-c8c01ee2c1bf?q=80&w=687&auto=format&fit=crop",
    title: "Andy"
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
