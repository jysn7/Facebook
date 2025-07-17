import React from "react"
import Header from "./components/Header"
import Sidebar from "./components/sidebar/Sidebar"
import Feed from "./components/feed/Feed"

function App() {

  return (
    <div className="bg-[#f1f2f5] ">
    <Header />
    <div className="appbody flex flex-1 overflow-hidden">
      <Sidebar /> 
      <Feed />
    </div>
    
    </div>
  )
}

export default App
