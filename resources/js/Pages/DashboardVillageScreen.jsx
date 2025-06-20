import React, { Fragment, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from '@material-tailwind/react';
import Select from 'react-select';
import Layout from './Layouts/components/Layout';

export default function DashboardVillageScreen({ villages, districts }) {
  const { data, setData, post, reset } = useForm();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Dropdown states
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubcounties] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [loadingCounties, setLoadingCounties] = useState(false);
  const [loadingSubCounties, setLoadingSubCounties] = useState(false);
  const [loadingParishes, setLoadingParishes] = useState(false);

  // Modal states
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  const [sizeEdit, setSizeEdit] = useState(null);
  const handleOpenEdit = (value) => setSizeEdit(value);

  // Edit state
  const [editVillage, setEditVillage] = useState('');
  const [editParish, setEditParish] = useState('');
  const [editSubcounty, setEditSubcounty] = useState('');
  const [editCounty, setEditCounty] = useState('');
  const [editDistrict, setEditDistrict] = useState('');

  // Format options for react-select
  const districtOptions = districts.map((d) => ({
    value: d.id,
    label: d.district,
  }));

  const countyOptions = counties.map((c) => ({
    value: c.id,
    label: c.county,
  }));

  const subcountyOptions = subcounties.map((s) => ({
    value: s.id,
    label: s.subcounty,
  }));

  const parishOptions = parishes.map((p) => ({
    value: p.id,
    label: p.parish,
  }));

  // Fetch data functions
  const fetchData = (newPage) => {
    router.get('/dashboard/village', { search, page: newPage }, { preserveState: true });
  };

  const fetchCounties = async (districtId) => {
    setLoadingCounties(true);
    try {
      const response = await axios.get(`/getcounties?district=${districtId}`);
      setCounties(response.data);
    } catch (error) {
      console.error('Error fetching counties:', error);
      setCounties([]);
    } finally {
      setLoadingCounties(false);
    }
  };

  const fetchSubcounties = async (countyId) => {
    setLoadingSubCounties(true);
    try {
      const response = await axios.get(`/getsubcounties?county=${countyId}`);
      setSubcounties(response.data);
    } catch (error) {
      console.error('Error fetching subcounties:', error);
      setSubcounties([]);
    } finally {
      setLoadingSubCounties(false);
    }
  };

  const fetchParishes = async (subcountyId) => {
    setLoadingParishes(true);
    try {
      const response = await axios.get(`/getparishes?subcounty=${subcountyId}`);
      setParishes(response.data);
    } catch (error) {
      console.error('Error fetching parishes:', error);
      setParishes([]);
    } finally {
      setLoadingParishes(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchData(newPage);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const term = e.target.value;
    setSearch(term);
    setPage(1);
    router.get('/dashboard/village', { search: term, page: 1 }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/dashboard/village/post', {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        reset();
        setData({});
        handleOpen(null);
      },
    });
  };

  const editTheVillage = (village, parish, subcounty, county, district) => {
    setEditVillage(village);
    setEditParish(parish);
    setEditSubcounty(subcounty);
    setEditCounty(county);
    setEditDistrict(district);
    handleOpenEdit('xl');
  };

  const columns = [
    {
      name: 'Village',
      selector: (row) => row.village,
    },
    {
      name: 'Parish',
      selector: (row) => row.parish?.parish || '',
    },
    {
      name: 'Subcounty',
      selector: (row) => row.parish?.subcounty?.subcounty || '',
    },
    {
      name: 'County',
      selector: (row) => row.parish?.subcounty?.county?.county || '',
    },
    {
      name: 'District',
      selector: (row) => row.parish?.subcounty?.county?.district?.district || '',
    },
    {
      name: 'Added On',
      selector: (row) =>
        new Date(row.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }),
    },
    {
      cell: (row) => (
        <button
          onClick={() => editTheVillage(
            row.village,
            row.parish?.parish || '',
            row.parish?.subcounty?.subcounty || '',
            row.parish?.subcounty?.county?.county || '',
            row.parish?.subcounty?.county?.district?.district || ''
          )}
          className="bg-green-600 rounded-md p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      ),
    },
  ];

  const customStyles = {
    headRow: { style: { border: 'none' } },
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
      style: { border: 'none' },
    },
  };

  return (
    <div>
      {/* Data Table */}
      <DataTable
        title={
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2">
            <span>Villages</span>
            <div className="flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden">
              <Input
                type="text"
                label="Search"
                value={search}
                onChange={handleSearch}
                className="md:w-full"
              />
              <Button
                size="sm"
                color="success"
                onClick={() => handleOpen('xl')}
                className="flex h-10 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add
              </Button>
            </div>
          </div>
        }
        columns={columns}
        data={villages.data}
        customStyles={customStyles}
        pointerOnHover
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={villages.total}
        paginationPerPage={villages.per_page}
        onChangePage={handlePageChange}
        paginationRowsPerPageOptions={[]}
      />

      {/* Add Village Modal */}
      <Fragment>
        <Dialog open={size === 'xl'} size={size} handler={handleOpen}>
          <DialogHeader>Add a Village</DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogBody divider className="grid place-items-center gap-4">
              <div className="space-y-4 w-full">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <Select
                    options={districtOptions}
                    onChange={(option) => {
                      setData('district', option?.value || '');
                      if (option) fetchCounties(option.value);
                    }}
                    placeholder="Select district..."
                    className="text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <Select
                    options={countyOptions}
                    onChange={(option) => {
                      setData('county', option?.value || '');
                      if (option) fetchSubcounties(option.value);
                    }}
                    isDisabled={!data.district || loadingCounties}
                    placeholder={loadingCounties ? 'Loading...' : 'Select county...'}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Subcounty</label>
                  <Select
                    options={subcountyOptions}
                    onChange={(option) => {
                      setData('subcounty', option?.value || '');
                      if (option) fetchParishes(option.value);
                    }}
                    isDisabled={!data.county || loadingSubCounties}
                    placeholder={loadingSubCounties ? 'Loading...' : 'Select subcounty...'}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Parish</label>
                  <Select
                    options={parishOptions}
                    onChange={(option) => setData('parish', option?.value || '')}
                    isDisabled={!data.subcounty || loadingParishes}
                    placeholder={loadingParishes ? 'Loading...' : 'Select parish...'}
                    className="text-sm"
                  />
                </div>

                <Input
                  label="Village"
                  value={data.village ?? ''}
                  onChange={(e) => setData('village', e.target.value)}
                  size="sm"
                />
              </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button onClick={() => handleOpen(null)} variant="gradient" color="blue-gray">
                Close
              </Button>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Dialog>
      </Fragment>

      {/* Edit Village Modal */}
      <Fragment>
        <Dialog open={sizeEdit === 'xl'} size={sizeEdit} handler={handleOpenEdit}>
          <DialogHeader>Edit Village</DialogHeader>
          <form>
            <DialogBody divider className="grid place-items-center gap-4">
              <Input label="District" disabled value={editDistrict} size="sm" />
              <Input label="County" disabled value={editCounty} size="sm" />
              <Input label="Subcounty" disabled value={editSubcounty} size="sm" />
              <Input label="Parish" disabled value={editParish} size="sm" />
              <Input label="Village" value={editVillage} onChange={(e) => setEditVillage(e.target.value)} size="sm" />
            </DialogBody>
            <DialogFooter>
              <div className="flex w-full justify-between">
                <Button variant="gradient" color="red">Delete</Button>
                <div className="space-x-2">
                  <Button onClick={() => handleOpenEdit(null)} variant="gradient" color="blue-gray">
                    Close
                  </Button>
                  <Button type="submit" className="bg-black">Save</Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </Dialog>
      </Fragment>
    </div>
  );
}

DashboardVillageScreen.layout = (page) => <Layout children={page} />;