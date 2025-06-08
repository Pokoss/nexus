import React, { useRef } from 'react'
import Navbar from './Components/Navbar'
import { Avatar, Button, Input } from '@material-tailwind/react'
import { Link } from '@inertiajs/react'
import { QRCodeSVG } from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import DataTable from 'react-data-table-component';
import Footer from '@/Components/Footer';


function MyLinkScreen({ my_data, my_people }) {
  const currentUrl = location.hostname;

  console.log(my_people)

  const domEl = useRef(null);
  const downloadImage = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current);

    const link = document.createElement('a');
    link.download = `${my_data.slug}.png`;
    link.href = dataUrl;
    link.click();
  }
  const customStyles = {
    headRow: {
      style: {
        border: 'none',
      },
    },
    headCells: {
      style: {
        color: '#997400',
        fontSize: '14px',
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: 'rgb(230, 244, 244)',
        borderBottomColor: '#FFFFFF',
        outline: '1px solid #FFFFFF',
      },
    },
    pagination: {
      style: {
        border: 'none',
      },
    },
  };
  const columns = [
      {
          name: 'Full Name',
          selector: row => row.name,
      },
      {
          name: 'District',
          selector: row => row.village.parish.subcounty.county.district.district,
      },
      {
          name: 'County',
          selector: row => row.village.parish.subcounty.county.county,
      },
      {
          name: 'Subcounty',
          selector: row => row.village.parish.subcounty.subcounty,
      },
      {
          name: 'Parish',
          selector: row => row.village.parish.parish,
      },
      {
          name: 'Village',
          selector: row => row.village.village,
      },
      ,
      {
          name: 'Registered On',
          selector: row => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
      },
      ,]


  return (
    <div>
      <Navbar />
      <div className="font-oswald w-full  p-5 shadow-sm shadow-primary bg-white ">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 mb-6">
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
              <Link href={'/join/' + my_data.slug} className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white" ><p className='w-full text-center'>Register User Myself</p></Link>

              <button
                onClick={downloadImage}
                className="w-full rounded-xl border-2 border-red-500 bg-white px-3 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white" >Download My QR Code</button>
            </div>
          </div>
        </div>
        <DataTable
          title={'Groups' &&
            <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
              <span>{'My People'}</span>
              
            </div>
          }
          columns={columns}
          data={my_people.data}
          customStyles={customStyles}
          pointerOnHover
          onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
          // progressPending={loading}
          highlightOnHover
          pagination
          paginationServer
          paginationTotalRows={my_people.total}
          paginationPerPage={my_people.per_page}
          // onChangePage={handlePageChange}
          paginationRowsPerPageOptions={[]}


        // expandOnRowClicked={expandOnRowClicked && ExpandableComponent}
        // expandableRows={ExpandableComponent}
        // expandableRowsComponent={ExpandableComponent}
        // expandableRowExpanded={row=>true}
        />

      </div>
      {
        my_data.level && my_data.level > 1 ?
        <div>
          
        </div>:<div></div>
      }
      <Footer/>
    </div>
  )
}

export default MyLinkScreen