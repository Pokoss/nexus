
import React, { useEffect, useRef } from 'react'
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'

function Sidebar({ sidebarOpen, setSidebarOpen }) {


  // const { auth } = usePage().props

  const trigger = useRef(null);
  const sidebar = useRef(null);


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(true);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  return (
    <div className="lg:w-64">
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        id="sidebar"
        ref={sidebar}
        className={`fixed z-40 left-0 top-0 h-full w-64 flex-shrink-0 transform bg-gradient-to-b from-gray-900 to-black text-white shadow-xl transition-transform duration-300 ease-in-out overflow-y-auto no-scrollbar ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:top-auto lg:left-auto lg:h-screen`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/resources/logo.png" alt="Logo" className="w-10 h-10 rounded-full shadow-md" />
            <span className="text-lg font-bold text-white">KKC Admins</span>
          </Link>

          {/* Close Button (Mobile Only) */}
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none lg:hidden"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <Link
                href="/dashboard/home"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-indigo-600 hover:text-white transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                Home
              </Link>
            </li>

            {/* Coordinators */}
            <li>
              <Link
                href="/dashboard/codinators"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-indigo-600 hover:text-white transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Coordinators
              </Link>
            </li>

            {/* Peoples Data */}
            <li>
              <Link
                href="/dashboard/biodata"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-indigo-600 hover:text-white transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Peoples Data
              </Link>
            </li>

            {/* District */}
            <li>
              <Link
                href="/dashboard/districts"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-indigo-600 hover:text-white transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                District
              </Link>
            </li>

            {/* County */}
            <li>
              <Link
                href="/dashboard/county"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-indigo-600 hover:text-white transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                County
              </Link>
            </li>

            {/* Subcounty */}
            <li>
              <Link
                href="/dashboard/subcounty"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-indigo-600 hover:text-white transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Subcounty
              </Link>
            </li>

            {/* Parish */}
            <li>
              <Link
                href="/dashboard/parish"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-indigo-600 hover:text-white transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Parish
              </Link>
            </li>

            {/* Village */}
            <li>
              <Link
                href="/dashboard/village"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-indigo-600 hover:text-white transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Village
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}

export default Sidebar
