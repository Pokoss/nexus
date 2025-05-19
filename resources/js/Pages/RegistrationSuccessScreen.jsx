import React from 'react'
import Navbar from './Components/Navbar'
import { Button } from '@material-tailwind/react'
import { Link } from '@inertiajs/react'

function RegistrationSuccessScreen() {
  return (
    <div className=' text-center w-full'>
        <Navbar/>

        <div className='p-10 mt-10 shadow mr-11 w-full items-center justify-center align-middle flex bg-blue-gray-50'>
            <p>You have successfully been registered at Kikumi Kikumi Community</p>
        </div>
            <Link href='/'>
            <Button className='mt-5' >Home</Button>
            </Link>
    </div>
  )
}

export default RegistrationSuccessScreen