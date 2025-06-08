import React, { Fragment, useState } from 'react'
import Layout from './Layouts/components/Layout'
import DataTable from 'react-data-table-component'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Select, Typography } from '@material-tailwind/react';
import { router, useForm } from '@inertiajs/react';


function DashboardBiodataScreen({people}) {
    const [search, setSearch] = useState('');
    const { data, setData, processing, post, reset, errors } = useForm();


    const [page, setPage] = useState(1);
    const fetchData = (page) => {
        router.get(`/dashboard/accounting/expenses`, { page, search }, { preserveState: true });
    };
    const handlePageChange = (page) => {
        setPage(page);
        fetchData(page)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        // toast.success(data.name)

        post('/dashboard/district/post', {
            preserveScroll: true, preserveState: true,
            onSuccess: () => {
                //   toast.success('We have received you request, we shall contact you shortly')
                reset();
                setData({})
                handleOpen();
            }
        });

    }

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
          name: 'Full Name',
          selector: row => row.name,
      },
      {
          name: 'NIN',
          selector: row => row.nin,
      },
      {
          name: 'Phone',
          selector: row => row.phone,
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
      ,
    ]
    


    return (
        <Layout>
            <DataTable
                title={'Person Bio Data' &&
                    <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
                        <span>{'Person Bio Data'}</span>
                        <div className='flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden'>

                            <Input type='text' label='Search'
                                value={search}
                                onChange={handleSearch}
                                className='md:w-full' />
                            
                            
                        </div>
                    </div>
                }
                columns={columns}
                data={people.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
                // progressPending={loading}
                highlightOnHover
                pagination
                paginationServer
                 paginationTotalRows={people.total}
          paginationPerPage={people.per_page}
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
                            Add a Person
                        </Typography>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-16 w-16 text-primary">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                   </svg> */}

                            <Input label='Name'
                                value={data.subcounty ?? ''} onChange={e => setData('subcounty', e.target.value)} size='sm'
                            />
                            <Input label='Phone'
                                value={data.subcounty ?? ''} onChange={e => setData('subcounty', e.target.value)} size='sm'
                            />
                            <Input label='District'
                                value={data.subcounty ?? ''} onChange={e => setData('subcounty', e.target.value)} size='sm'
                            />
                            <Input label='Subcounty'
                                value={data.subcounty ?? ''} onChange={e => setData('subcounty', e.target.value)} size='sm'
                            />
                            <Input label='Parish'
                                value={data.subcounty ?? ''} onChange={e => setData('subcounty', e.target.value)} size='sm'
                            />
                            <Input label='Village'
                                value={data.subcounty ?? ''} onChange={e => setData('subcounty', e.target.value)} size='sm'
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
        </Layout>

    )
}

export default DashboardBiodataScreen