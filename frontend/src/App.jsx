import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Feed from "./components/feed/Feed";
import Widgets from "./components/widgets/Widgets";
import Login from "./components/Login";
import { useStateValue } from "./components/StateProvide";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f1f2f5]">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f2f5] min-h-screen">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className="flex h-[100vh]"> {/* Subtract header height */}
            {/* Sidebar - fixed width and sticky */}
            <div className="hidden lg:block w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
              <Sidebar />
            </div>
            
            {/* Main content area */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Feed - takes remaining space */}
              <div className="flex-1 scrollbar-hide overflow-y-auto ">
                <Feed />
              </div>
              
              {/* Widgets - fixed width on larger screens */}
              <div className="lg:w-80 flex-shrink-0 overflow-y-auto">
                <Widgets />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;