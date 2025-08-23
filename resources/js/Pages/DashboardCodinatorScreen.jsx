import React from 'react';
import Layout from './Layouts/components/Layout';
import DataTable from 'react-data-table-component';
import { Input } from '@material-tailwind/react';
import { router } from '@inertiajs/react';

function DashboardCodinatorScreen({ codinators }) {
    const [search, setSearch] = React.useState(codinators?.filters?.search || '');

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearch(term);
        router.get('/dashboard/codinators', {
            search: term,
            page: 1
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handlePageChange = (page) => {
        router.get('/dashboard/codinators', {
            search,
            page
        }, {
            preserveState: true
        });
    };

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
        pagination: { style: { border: 'none' } },
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
            name: 'Registered Persons',
            selector: row => row.persons_count,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
        },
        {
            name: 'Registered On',
            selector: row => new Date(row.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }),
        }
    ];

    return (
        <div>
            <DataTable
                title={
                    <div className="flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2">
                        <span>Codinators</span>
                        <div className="flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden">
                            <Input
                                type="text"
                                label="Search"
                                value={search}
                                onChange={handleSearch}
                                className="md:w-full"
                            />
                        </div>
                    </div>
                }
                columns={columns}
                data={codinators.data}
                customStyles={customStyles}
                pointerOnHover
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={codinators.total}
                paginationPerPage={codinators.per_page}
                onChangePage={handlePageChange}
                paginationRowsPerPageOptions={[]}
            />
        </div>
    );
}

DashboardCodinatorScreen.layout = page => <Layout children={page} />;
export default DashboardCodinatorScreen;