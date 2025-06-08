import { Head } from '@inertiajs/react'
import { router, useForm } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react';
import { Fragment } from 'react';
import Select from 'react-select'
import { useState } from 'react';
import Navbar from './Components/Navbar'
import Footer from '@/Components/Footer';

function CitizensRegistrationScreen({ districts, the_user }) {

  console.log(the_user)
  const { data, setData, processing, post, reset, errors } = useForm();
  const [counties, setCounties] = useState([]);
  const [loadingCounties, setLoadingCounties] = useState(false);
  const [loadingSubCounties, setLoadingSubCounties] = useState(false);
  const [loadingParishes, setLoadingParishes] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);

  const [selectedCounty, setSelectedCounty] = useState(null);


  const [subcounties, setSubcounties] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [villages, setVillages] = useState([]);

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
  const parishOptions = parishes.map(p => ({
    value: p.id,
    label: p.parish, // MUST match your API key
  }));

  const villageOptions = villages.map(v => ({
    value: v.id,
    label: v.village, // MUST match your API key
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
  const fetchSubcounties = async (countyId) => {
    setLoadingSubCounties(true);
    try {
      const response = await axios.get(`/getsubcounties?subcounty=${countyId}`);
      console.log("API Data:", response.data); // Verify structure
      setSubcounties(response.data);
    } catch (error) {
      console.error("Error:", error);
      setSubcounties([]);
    } finally {
      setLoadingSubCounties(false);
    }
  };
  // Fetch subcounties when county changes
  const fetchParishes = async (subcountyId) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    

    post('/join/post',{user:the_user}, {
      preserveScroll: true, preserveState: true,
      onSuccess: () => {
        //   toast.success('We have received you request, we shall contact you shortly')
        router.visit('/registation-success')
        reset();
        setData({})


      }
    });

  }

  return (
    <div>
      <Head>
        <title>
          Register Member
        </title>
      </Head>
      <Navbar />
      <section className="max-w-4xl p-6 mx-auto bg-gray-50 rounded-md shadow-md shadow-gray-500 my-10">
        <div className='flex justify-center'>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Register New Kikumi Kikumi Community Member</h1>
        </div>
        <div className='my-6'>
          <form
            onSubmit={handleSubmit}
          >


            <div className='w-full my-3' >
              <Input color='deep-orange' label='Full Name' size='md'
              value={data.name ?? ''} onChange={e => setData('name', e.target.value)} 
              />
            </div>
            <div className='w-full my-3' >
              <Input color='deep-orange' label='National Identification Number (NIN)' size='md'
              // value={location} onChange={(event) => setLocation(event.target.value)} 
              value={data.nin ?? ''} onChange={e => setData('nin', e.target.value)} 
              />
            </div>

            <div className='w-full my-3' >
              <Input color='deep-orange' label='Contact' size='md'
              // value={contact} onChange={(event) => setContact(event.target.value)} 
              value={data.phone ?? ''} onChange={e => setData('phone', e.target.value)} 
              />
            </div>

            <div className="my-3">
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

            <div className="my-3">
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
            <div className='my-3'>
              <label className="block text-sm font-medium mb-1">Subcounty</label>
              <Select
                options={subcountiesOptions}
                value={subcountiesOptions.find(opt => opt.value === data.subcounty)}
                onChange={(option) => {
                  setData('subcounty', option?.value || '');
                  if (option) fetchParishes(option.value);
                }}
                // onChange={(option) =>{ setData('subcounty', option?.value || '');   }}
                isDisabled={!data.county || loadingSubCounties}
                placeholder={loadingSubCounties ? 'Loading...' : 'Select subcounty'}
                className="text-sm"
              />
            </div>
            <div className='my-3'>
              <label className="block text-sm font-medium mb-1">Parish</label>
              <Select
                options={parishOptions}
                value={parishOptions.find(opt => opt.value === data.parish)}
                onChange={(option) => {
                  setData('parish', option?.value || '');
                  if (option) fetchVillages(option.value);
                }}
                // onChange={(option) => { setData('parish', option?.value || ''); }}
                isDisabled={!data.subcounty || loadingParishes}
                placeholder={loadingParishes ? 'Loading...' : 'Select parish'}
                className="text-sm"
              />
            </div>
            <div className='my-3'>
              <label className="block text-sm font-medium mb-1">Village</label>
              <Select
                options={villageOptions}
                value={villageOptions.find(opt => opt.value === data.village)}
                onChange={(option) => { setData('village', option?.value || ''); }}
                isDisabled={!data.parish || loadingVillages}
                placeholder={loadingVillages ? 'Loading...' : 'Select village'}
                className="text-sm"
              />
            </div>

            <Button className='bg-black mt-3' type='submit'>Register Member</Button>
          </form>
        </div>
      </section>
      {/* <ToastContainer /> */}
      <Footer />
    </div>
  )
}

export default CitizensRegistrationScreen