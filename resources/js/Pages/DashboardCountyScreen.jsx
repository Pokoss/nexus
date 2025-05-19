import React, { Fragment, useState } from 'react'
import Layout from './Layouts/components/Layout'
import DataTable from 'react-data-table-component'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select, Typography } from '@material-tailwind/react'
import { router, useForm } from '@inertiajs/react'

function DashboardCountyScreen({districts,counties}) {
    console.log(counties)
 

    const [district, setDistrict] = useState('');


    const { data, setData, processing, post, reset, errors } = useForm();
        const [search, setSearch] = useState('');
        const [page, setPage] = useState(1);
    
        const fetchData = (page) => {
            router.get(`/dashboard/county`, { page, search }, { preserveState: true });
        };
        const handlePageChange = (page) => {
            setPage(page);
            fetchData(page)
        };
    
        const handleSearch = e => {
            e.preventDefault();
            setSearch(e.target.value)
            setPage(1)
            var search = e.target.value
            router.get(`/dashboard//hr/employee`, {
                search, page: 1
            }, {
                preserveState: true, preserveScroll: true, onSuccess: () => {
                }
            });
        }
    
        const handleSubmit = async (event) => {
            event.preventDefault();
   
            post('/dashboard/county/post', {
                preserveScroll: true, preserveState: true,
                onSuccess: () => {
                    //   toast.success('We have received you request, we shall contact you shortly')
                    reset();
                    setData({})
                    handleOpen();
                }
            });
    
        }
    
        const [size, setSize] = useState(null);
        const handleOpen = (value) => setSize(value);
        const [sizeEdit, setSizeEdit] = useState(null);
        const handleOpenEdit = (value) => setSizeEdit(value);
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
                name: 'County',
                selector: row => row.county,
            },
            {
                name: 'District',
                selector: row => row.district.district,
            },
    
            ,
            {
                name: 'Added On',
                selector: row => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
            },
            {
                selector: row => <button onClick={() => editEmployee(row.user.name, row.user.email, row.position, row.id)} className='bg-green-600 rounded-md p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                </button>
            },]

            
  return (
    <div>
        
        <DataTable
                title={'Counties' &&
                    <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
                        <span>{'Counties'}</span>
                        <div className='flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden'>

                            <Input type='text' label='Search'
                                value={search}
                                onChange={handleSearch}
                                className='md:w-full' />
                            <span>
                                <Button size='sm' color='success' type='submit' className='flex h-10 items-center'
                                    onClick={() => handleOpen("xl")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Add
                                </Button>
                            </span>
                        </div>
                    </div>
                }
                columns={columns}
                data={counties.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
                // progressPending={loading}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={''}
                paginationPerPage={''}
                onChangePage={handlePageChange}
                paginationRowsPerPageOptions={[]}


            // expandOnRowClicked={expandOnRowClicked && ExpandableComponent}
            // expandableRows={ExpandableComponent}
            // expandableRowsComponent={ExpandableComponent}
            // expandableRowExpanded={row=>true}
            />
    
    <Fragment>
                <Dialog
                    open={
                        size === "xl"
                    }
                    size={size}
                    handler={handleOpen}
                >
                    <DialogHeader>
                        <Typography variant="h5" color="blue-gray">
                            Add a County
                        </Typography>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-16 w-16 text-primary">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                   </svg> */}




                            <Select label='District' value={data.district} onChange={ e=> setData('district',e)} className='w-full' title='District'>

                             
                                {districts.map((district)=>
                                <Option value={district.id}>{district.district}</Option>
                                )}
                               
                            </Select>
                            <Input label='County'
                                value={data.county ?? ''} onChange={e => setData('county', e.target.value)} size='sm'
                            />

                        </DialogBody>
                        <DialogFooter className="space-x-2">
                            <Button onClick={handleOpen} variant="gradient" color="blue-gray">
                                Close
                            </Button>


                            <Button type='submit' className='bg-black'>
                                Add
                            </Button>


                        </DialogFooter>
                    </form>
                </Dialog>

            </Fragment>
    </div>

    
  )
}
DashboardCountyScreen.layout = page => <Layout children={page} />
export default DashboardCountyScreen