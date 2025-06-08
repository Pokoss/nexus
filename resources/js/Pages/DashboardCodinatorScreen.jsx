import React from 'react'
import Layout from './Layouts/components/Layout'
import DataTable from 'react-data-table-component';
import { Input } from '@material-tailwind/react';

function DashboardCodinatorScreen({codinators}) {
    console.log(codinators)

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
          name: 'Registered On',
          selector: row => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
      },
      ,
    ]
    
  return (
    <div>
         <DataTable
                title={'Person Bio Data' &&
                    <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
                        <span>{'Codinators'}</span>
                        <div className='flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden'>

                            <Input type='text' label='Search'
                                // value={search}
                                // onChange={handleSearch}
                                className='md:w-full' />
                            
                        </div>
                    </div>
                }
                columns={columns}
                data={codinators.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
                // progressPending={loading}
                highlightOnHover
                pagination
                paginationServer
                 paginationTotalRows={codinators.total}
          paginationPerPage={codinators.per_page}
                // onChangePage={handlePageChange}
                paginationRowsPerPageOptions={[]}


            // expandOnRowClicked={expandOnRowClicked && ExpandableComponent}
            // expandableRows={ExpandableComponent}
            // expandableRowsComponent={ExpandableComponent}
            // expandableRowExpanded={row=>true}
            />

    </div>
  )
}
DashboardCodinatorScreen.layout = page => <Layout children={page} />
export default DashboardCodinatorScreen