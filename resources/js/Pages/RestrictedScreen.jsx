import React from 'react'
import Navbar from './Components/Navbar'

function RestrictedScreen() {
  return (
    <div className=''>
        <Navbar/>
    <div className='w-full flex justify-center mt-56 text-lg font-bold p-8 bg-blue-gray-500'>Access Denied Contact Admin</div>
    </div>
  )
}

export default RestrictedScreen