import React, { useRef } from 'react'
import Navbar from './Components/Navbar'
import { Avatar } from '@material-tailwind/react'
import { Link } from '@inertiajs/react'
import { QRCodeSVG } from 'qrcode.react';

function MyLinkScreen({ my_data }) {
  const currentUrl = location.hostname;

  const domEl = useRef(null);
  const downloadImage = async ()=>{
      const dataUrl = await htmlToImage.toPng(domEl.current);

      const link = document.createElement('a');
      link.download = `${my_data.slug}.png`; 
      link.href =dataUrl;
      link.click();
  }


  return (
    <div>
      <Navbar />
      <div className="font-oswald w-full  p-5 shadow-sm shadow-primary bg-white ">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="grid-cols-1 lg:col-span-3">
            <div className="mx-auto flex items-center justify-center  ">
            <div className='mt-3 ml-2'>
              <QRCodeSVG ref={domEl} value={'https://' + currentUrl + '/join/' + my_data.slug} />
            </div>
            </div>

          </div>

          <div className="col-span-1 lg:col-span-9">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-zinc-700">{my_data.name} </h2>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-blue-900">Contact</p>
                <p className="font-semibold text-primary">{my_data.phone}</p>
              </div>

              <div>
                <p className="font-semibold text-primary text-blue-900">My Registration Link </p>
                <p className="text-sm text-zinc-700 pr-2">{'https://' + currentUrl + '/join/' + my_data.slug}</p>
              </div>

              {/* <div>
                                <p className=" font-semibold text-primary">{'Electronic Shop'}</p>
                                <p className="text-sm font-semibold text-zinc-700">Type</p>
                            </div>

                            <div>
                                <p className="font-semibold text-primary">{'3'}</p>
                                <p className="text-sm font-semibold text-zinc-700">Page Visits</p>
                            </div> */}

            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Link href={'/join/'+ my_data.slug} className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white" ><p className='w-full text-center'>Register User Myself</p></Link>

              <button
                // onClick={downloadImage}
                className="w-full rounded-xl border-2 border-red-500 bg-white px-3 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white" >Download My QR Code</button>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default MyLinkScreen