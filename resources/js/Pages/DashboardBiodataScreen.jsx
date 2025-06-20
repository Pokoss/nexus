import React, { useState, useEffect } from 'react';
import Layout from './Layouts/components/Layout';
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
import { router, useForm } from '@inertiajs/react';
import axios from 'axios';
import Select from 'react-select'; // Using react-select instead of Material Tailwind

function DashboardBiodataScreen({ people, districts }) {
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        district_id: '',
        county_id: '',
        subcounty_id: '',
        parish_id: '',
        village_id: '',
    });

    const [counties, setCounties] = useState([]);
    const [subcounties, setSubcounties] = useState([]);
    const [parishes, setParishes] = useState([]);
    const [villages, setVillages] = useState([]);

    const [loadingCounties, setLoadingCounties] = useState(false);
    const [loadingSubcounties, setLoadingSubcounties] = useState(false);
    const [loadingParishes, setLoadingParishes] = useState(false);
    const [loadingVillages, setLoadingVillages] = useState(false);

    const [page, setPage] = useState(people?.current_page || 1);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchData(newPage);
    };

    const fetchData = (page = 1) => {
        router.get(`/dashboard/biodata`, { ...filters, search, page }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        setPage(1);
        router.get(`/dashboard/biodata`, { ...filters, search: e.target.value, page: 1 }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

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
    const fetchSubcounties = async (countyId) => {
        if (!countyId) {
            setSubcounties([]);
            return;
        }
        setLoadingSubcounties(true);
        try {
            const response = await axios.get(`/getsubcounties?subcounty=${countyId}`);
            setSubcounties(response.data);
        } catch (error) {
            console.error("Error:", error);
            setSubcounties([]);
        } finally {
            setLoadingSubcounties(false);
        }
    };
    // Fetch subcounties when county changes
    const fetchParishes = async (subcountyId) => {
        if (!subcountyId) {
            setParishes([]);
            return;
        }
        setLoadingParishes(true);
        try {
            const response = await axios.get(`/getparishes?parish=${subcountyId}`);
            console.log("API Data:", response.data); // Verify structure
            setParishes(response.data);
        } catch (error) {
            console.error("Error:", error);
            setParishes([]);
        } finally {
            setLoadingParishes(false);
        }
    };
    // Fetch villages when county changes
    const fetchVillages = async (parishId) => {
        if (!parishId) {
            setVillages([]);
            return;
        }
        setLoadingVillages(true);

        try {
            const response = await axios.get(`/getvillages?village=${parishId}`);
            console.log("API Data:", response.data); // Verify structure
            setVillages(response.data);
        } catch (error) {
            console.error("Error:", error);
            setVillages([]);
        } finally {
            setLoadingVillages(false);
        }
    };

    const formatOptions = (data, labelKey, valueKey = 'id') =>
        data.map(item => ({
            value: item[valueKey],
            label: item[labelKey],
        }));

    const handleFilterChange = (selectedOption, actionMeta) => {
        const { name } = actionMeta;
        const value = selectedOption ? selectedOption.value : '';

        // Reset depending on which field was changed
        switch (name) {
            case 'district_id':
                setFilters(prev => ({
                    ...prev,
                    district_id: value,
                    county_id: '',
                    subcounty_id: '',
                    parish_id: '',
                    village_id: '',
                }));
                if (value) fetchCounties(value);
                else {
                    setCounties([]);
                    setSubcounties([]);
                    setParishes([]);
                    setVillages([]);
                }
                break;

            case 'county_id':
                setFilters(prev => ({
                    ...prev,
                    county_id: value,
                    subcounty_id: '',
                    parish_id: '',
                    village_id: '',
                }));
                if (value) fetchSubcounties(value);
                else {
                    setSubcounties([]);
                    setParishes([]);
                    setVillages([]);
                }
                break;

            case 'subcounty_id':
                setFilters(prev => ({
                    ...prev,
                    subcounty_id: value,
                    parish_id: '',
                    village_id: '',
                }));
                if (value) fetchParishes(value);
                else {
                    setParishes([]);
                    setVillages([]);
                }
                break;

            case 'parish_id':
                setFilters(prev => ({
                    ...prev,
                    parish_id: value,
                    village_id: '',
                }));
                if (value) fetchVillages(value);
                else {
                    setVillages([]);
                }
                break;

            case 'village_id':
                setFilters(prev => ({ ...prev, village_id: value }));
                break;

            default:
                break;
        }

        // Trigger filter request
        router.get(`/dashboard/biodata`, { ...filters, [name]: value, page: 1 }, {
            preserveState: true,
            preserveScroll: true,
        });
    };
    const columns = [
        { name: 'Full Name', selector: row => row.name },
        { name: 'NIN', selector: row => row.nin },
        { name: 'Phone', selector: row => row.phone },
        { name: 'District', selector: row => row.village?.parish?.subcounty?.county?.district?.district },
        { name: 'County', selector: row => row.village?.parish?.subcounty?.county?.county },
        { name: 'Subcounty', selector: row => row.village?.parish?.subcounty?.subcounty },
        { name: 'Parish', selector: row => row.village?.parish?.parish },
        { name: 'Village', selector: row => row.village?.village },
        { name: 'Registered On', selector: row => new Date(row.created_at).toLocaleDateString() },
    ];

    return (
        <Layout>
            <div className='p-2'>
                <DataTable
                    title={
                        <div className="p-2 flex flex-col md:flex-row justify-between items-start md:items-center w-full border-b pb-3 mb-4 gap-4">
                            <span>Person Bio Data</span>

                            <div className="w-full md:w-4/3 space-y-2">
                                <Input label="Search Person" value={search} onChange={handleSearch}/>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
                                    <Select
                                        name="district_id"
                                        value={formatOptions(districts, 'district').find(o => o.value === filters.district_id)}
                                        onChange={handleFilterChange}
                                        options={formatOptions(districts, 'district')}
                                        placeholder="District"
                                        isClearable
                                        isLoading={false}
                                        className="text-sm"
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        menuPortalTarget={document.body}

                                    />
                                    <Select
                                        name="county_id"
                                        value={formatOptions(counties, 'county').find(o => o.value === filters.county_id)}
                                        onChange={handleFilterChange}
                                        options={formatOptions(counties, 'county')}
                                        placeholder="County"
                                        isDisabled={!filters.district_id || loadingCounties}
                                        isLoading={loadingCounties}
                                        className="text-sm"
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        menuPortalTarget={document.body}
                                    />
                                    <Select
                                        name="subcounty_id"
                                        value={formatOptions(subcounties, 'subcounty').find(o => o.value === filters.subcounty_id)}
                                        onChange={handleFilterChange}
                                        options={formatOptions(subcounties, 'subcounty')}
                                        placeholder="Subcounty"
                                        isDisabled={!filters.county_id || loadingSubcounties}
                                        isLoading={loadingSubcounties}
                                        className="text-sm"
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        menuPortalTarget={document.body}
                                    />
                                    <Select
                                        name="parish_id"
                                        value={formatOptions(parishes, 'parish').find(o => o.value === filters.parish_id)}
                                        onChange={handleFilterChange}
                                        options={formatOptions(parishes, 'parish')}
                                        placeholder="Parish"
                                        isDisabled={!filters.subcounty_id || loadingParishes}
                                        isLoading={loadingParishes}
                                        className="text-sm"
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        menuPortalTarget={document.body}
                                    />
                                    <Select
                                        name="village_id"
                                        value={formatOptions(villages, 'village').find(o => o.value === filters.village_id)}
                                        onChange={handleFilterChange}
                                        options={formatOptions(villages, 'village')}
                                        placeholder="Village"
                                        isDisabled={!filters.parish_id || loadingVillages}
                                        isLoading={loadingVillages}
                                        className="text-sm"
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        menuPortalTarget={document.body}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    columns={columns}
                    data={people.data}
                    pagination
                    paginationServer
                    paginationTotalRows={people.total}
                    paginationPerPage={people.per_page}
                    onChangePage={handlePageChange}
                    highlightOnHover
                    pointerOnHover
                />
            </div>
        </Layout>
    );
}

export default DashboardBiodataScreen;