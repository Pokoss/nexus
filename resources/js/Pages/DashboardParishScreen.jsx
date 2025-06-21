import React from 'react'
import Layout from './Layouts/components/Layout'
import { router, useForm } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Spinner, Typography } from '@material-tailwind/react';
import { Fragment } from 'react';
import Select from 'react-select'
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DashboardParishScreen({ parishes, districts }) {
    const { data, setData, processing, post, reset, errors } = useForm();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    console.log(parishes)
    const fetchData = (page) => {
        router.get(`/dashboard/parish`, { page, search }, { preserveState: true });
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
        router.get(`/dashboard/parish`, {
            search, page: 1
        }, {
            preserveState: true, preserveScroll: true, onSuccess: () => {
            }
        });
    }

    const [counties, setCounties] = useState([]);
    const [loadingCounties, setLoadingCounties] = useState(false);
    const [loadingSubCounties, setLoadingSubCounties] = useState(false);

    const [selectedCounty, setSelectedCounty] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [subcounties, setSubcounties] = useState([]);

    // Format options for react-select
    const districtOptions = districts.map(d => ({
        value: d.id,
        label: d.district
    }));

    const countyOptions = counties.map(c => ({
        value: c.id,
        label: c.county, // MUST match your API key
    }));

    const subcountiesOptions = subcounties.map(s => ({
        value: s.id,
        label: s.subcounty, // MUST match your API key
    }));

    const fetchCounties = async (districtId) => {
        setLoadingCounties(true);
        try {
            const response = await axios.get(`/getcounties?district=${districtId}`);
            console.log("API Data:", response.data); // Verify structure
            setCounties(response.data);
        } catch (error) {
            console.error("Error:", error);
            setCounties([]);
        } finally {
            setLoadingCounties(false);
        }
    };
    // Fetch subcounties when county changes
    const fetchSubcounties = async (subcountyId) => {
        setLoadingSubCounties(true);
        try {
            const response = await axios.get(`/getsubcounties?subcounty=${subcountyId}`);
            console.log("API Data:", response.data); // Verify structure
            setSubcounties(response.data);
        } catch (error) {
            console.error("Error:", error);
            setSubcounties([]);
        } finally {
            setLoadingSubCounties(false);
        }
    };

    const postDelete = (event) => {
        event.preventDefault();

        try {
            router.post('/dashboard/parish/delete', { parish_id: editId },
                {
                    onSuccess: () => {
                        toast.success('Parish deleted');
                        handleOpenEdit()
                        // setSelectedOption(useState(null));

                    }
                },
            )
        } catch (error) {
            toast.dismiss()
            toast.error(error);
        }


    }

    const postEdit = (event) => {
        event.preventDefault();

        toast.loading();
        if (editParish == '') {
            toast.dismiss()
        }
        else {
            try {

                router.post('/dashboard/parish/edit', { parish: editParish, id: editId },
                    {
                        onSuccess: () => {
                            toast.success('Parish edited successfully');
                            handleOpenEdit();
                        }
                    }
                )
            } catch (error) {
                toast.dismiss()
                toast.error(error);
            }
        }

    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true);

        // toast.success(data.name)

        post('/dashboard/parish/post', {
            preserveScroll: true, preserveState: true,
            onSuccess: () => {
                setIsSubmitting(false);
                toast.success('Parish added successfully');
                //   toast.success('We have received you request, we shall contact you shortly')
                reset();
                setData({})
                handleOpen();
            }
        });

    }

    // Format options for react-select
    const formatOptions = (items) =>
        items.map(item => ({ value: item.id, label: item.name }));


    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);
    const [sizeEdit, setSizeEdit] = useState(null);
    const handleOpenEdit = (value) => setSizeEdit(value);


    const [editParish, setEditParish] = useState('');
    const [editSubcounty, setEditSubcounty] = useState('');
    const [editCounty, setEditCounty] = useState('');
    const [editDistrict, setEditDistrict] = useState('');
    const [editId, setEditId] = useState('');

    function editTheParish(parish, subcounty, county, district, id) {
        handleOpenEdit("xl")

        setEditParish(parish);
        setEditSubcounty(subcounty);
        setEditCounty(county);
        setEditDistrict(district);
        setEditId(id);
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
            name: 'Parish',
            selector: row => row.parish,
        },
        {
            name: 'Subcounty',
            selector: row => row.subcounty.subcounty,
        },
        {
            name: 'County',
            selector: row => row.subcounty.county.county,
        },
        {
            name: 'District',
            selector: row => row.subcounty.county.district.district,
        },

        ,
        {
            name: 'Added On',
            selector: row => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        },
        {
            selector: row => <button onClick={() => editTheParish(row.parish, row.subcounty.subcounty, row.subcounty.county.county, row.subcounty.county.district.district, row.id)} className='bg-green-600 rounded-md p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>
        },]

    return (

        <div>
            <DataTable
                title={'Parishes' &&
                    <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
                        <span>{'Parishes'}</span>
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
                data={parishes.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
                // progressPending={loading}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={parishes.total}
                paginationPerPage={parishes.per_page}
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
                            Add a Subcounty
                        </Typography>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-16 w-16 text-primary">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                   </svg> */}

                            <div className="space-y-4 w-full">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                    <Select
                                        options={districtOptions}
                                        value={districtOptions.find(opt => opt.value === data.district)}
                                        onChange={(option) => {
                                            setData('district', option?.value || '');
                                            if (option) fetchCounties(option.value);
                                        }}
                                        placeholder="Select district..."
                                        className="text-sm"
                                    />
                                </div>

                                {/* County Dropdown */}
                                {/* <div>
                                    <label className="block text-sm font-medium mb-1">County</label>
                                    <Select
                                        options={formatOptions(counties)}
                                        value={data.county}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                county: e.value,
                                                subcounty: ''
                                            });
                                            fetchSubcounties(e.value);
                                        }}
                                        isDisabled={!data.district || loading.counties}
                                        placeholder={loading.counties ? 'Loading...' : 'Select county'}
                                        className="text-sm"
                                    />
                                </div> */}


                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                                    <Select
                                        options={countyOptions}
                                        value={countyOptions.find(opt => opt.value === data.county)}
                                        onChange={(option) => {
                                            setData('county', option?.value || '');
                                            if (option) fetchSubcounties(option.value);
                                        }}
                                        // onChange={(option) => { setData('county', option?.value || ''); fetchSubcounties(e.value); }}
                                        isDisabled={!data.district || loadingCounties}
                                        placeholder={loadingCounties ? 'Loading...' : 'Select county...'}
                                        className="text-sm"
                                    />
                                </div>

                                {/* Subcounty Dropdown */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Subcounty</label>
                                    <Select
                                        options={subcountiesOptions}
                                        value={subcountiesOptions.find(opt => opt.value === data.subcounty)}
                                        onChange={(option) => { setData('subcounty', option?.value || ''); }}
                                        isDisabled={!data.county || loadingSubCounties}
                                        placeholder={loadingSubCounties ? 'Loading...' : 'Select subcounty'}
                                        className="text-sm"
                                    />
                                </div>

                                <Input label='Parish'
                                    value={data.parish ?? ''} onChange={e => setData('parish', e.target.value)} size='sm'
                                />
                            </div>
                        </DialogBody>
                        <DialogFooter className="space-x-2">
                            <Button onClick={handleOpen} variant="gradient" color="blue-gray">
                                Close
                            </Button>


                            <Button
                                type="submit"
                                className="bg-black"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Spinner size="sm" /> : 'Save'}
                            </Button>


                        </DialogFooter>
                    </form>
                </Dialog>

            </Fragment>
            <Fragment>
                <Dialog
                    open={
                        sizeEdit === "xl"
                    }
                    size={sizeEdit}
                    handler={handleOpenEdit}
                >
                    <DialogHeader>
                        <Typography variant="h5" color="blue-gray">
                            Edit Parish
                        </Typography>
                    </DialogHeader>
                    <form
                        onSubmit={postEdit}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">


                            <Input color='deep-orange' label='District' disabled
                                value={editDistrict} onChange={(event) => setEditDistrict(event.target.value)} size='sm'
                            />
                            <Input color='deep-orange' label='County' disabled
                                value={editCounty} onChange={(event) => setEditCounty(event.target.value)} size='sm'
                            />
                            <Input color='deep-orange' label='Subcounty' disabled
                                value={editSubcounty} onChange={(event) => setEditSubcounty(event.target.value)} size='sm'
                            />
                            <Input color='deep-orange' label='Parish'
                                value={editParish} onChange={(event) => setEditParish(event.target.value)} size='sm'
                            />


                        </DialogBody>
                        <DialogFooter>
                            <div className='flex w-full justify-between'>
                                <Button
                                    onClick={postDelete}
                                    variant="gradient" color="red">
                                    Delete
                                </Button>
                                <div className="space-x-2">
                                    <Button onClick={handleOpenEdit} variant="gradient" color="blue-gray">
                                        Close
                                    </Button>
                                    <Button type='submit' className='bg-black'>
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </DialogFooter>
                    </form>
                </Dialog>
            </Fragment>
            <ToastContainer />
        </div>
    )
}
DashboardParishScreen.layout = page => <Layout children={page} />
export default DashboardParishScreen