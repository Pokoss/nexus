import React from 'react'
import { Link } from '@inertiajs/react'
import { Line, Pie } from 'react-chartjs-2'; 
import { Chart, registerables } from 'chart.js';
import { Typography } from '@material-tailwind/react';
import Layout from './Layouts/components/Layout';
Chart.register(...registerables);


function DashboardHomeScreen() {
  return (
    <div>DashboardHomeScreen</div>
  )
}
DashboardHomeScreen.layout = page => <Layout children={page} />
export default DashboardHomeScreen