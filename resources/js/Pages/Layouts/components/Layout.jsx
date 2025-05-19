import React, {useState} from 'react'
import Sidebar from './Sidebar';
import Header from './header/Header';



function Layout({children}) {
    
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
    <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">

          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main content */}
            <main>
                <div className="w-full">
                    {children}
                </div>
            </main>
        </div>
    </div>
    )
}

export default Layout
