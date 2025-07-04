import { Head } from '@inertiajs/react'
import { router, useForm } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react';
import { Fragment } from 'react';
import Select from 'react-select'
import { useState } from 'react';
import Navbar from './Components/Navbar'
import Footer from '@/Components/Footer';
import { toast, ToastContainer } from 'react-toastify';

function CitizensRegistrationScreen({ districts, the_user }) {

  console.log(the_user)
  const { data, setData, post, reset, errors } = useForm({
    name: '',
    nin: '',
    phone: '',
    district: '',
    county: '',
    subcounty: '',
    parish: '',
    village: '',
    user: the_user?.id || null
  });
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
  const isValidNIN = (nin) => {
  const formattedNIN = nin.toUpperCase();
  const ninRegex = /^[A-Z]{2}[A-Z0-9]{11}[A-Z]$/;
  return formattedNIN.length === 14 && ninRegex.test(formattedNIN);
};
  const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^07\d{8}$/;
        return phoneRegex.test(phone);
    };

  const handleSubmit = async (event) => {

    event.preventDefault();
    if (data.district == null) {
      toast.error('District is required')
    }
    else if (data.county == null) {
      toast.error('County is required')
    }
    else if (data.subcounty == null) {
      toast.error('Subcounty is required')
    }
    else if (data.parish == null) {
      toast.error('Parish is required')
    }
    else if (data.village == null) {
      toast.error('Village is required')
    }
    else if (!isValidNIN(data.nin)) {
      toast.error('Invalid NIN format. Please enter a valid NIN in the format XX12345678X12X.');
    }
    else if (!isValidPhoneNumber(data.phone)) {
            toast.error('Invalid phone number. Enter the format 07XXXXXXXX.');
        }
    else {
      try {
        post('/join/post', {
          preserveScroll: true, preserveState: true,
          onSuccess: () => {
            //   toast.success('We have received you request, we shall contact you shortly')
            router.visit('/registration-success')
            reset();
            setData({})
          }
        })
      } catch (error) {
        console.error("Registration error:", error);
        toast.error('An error occurred while registering the member. Please try again later.');
      }
    }
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
                value={data.name ?? ''} onChange={e => setData('name', e.target.value)} error={errors.name}
              />
            </div>
            <div className='w-full my-3' >
              <Input color='deep-orange' label='National Identification Number (NIN)' size='md'
                // value={location} onChange={(event) => setLocation(event.target.value)} 
                value={data.nin ?? ''} onChange={e => setData('nin', e.target.value)} error={errors.nin}
              />
            </div>

            <div className='w-full my-3' >
              <Input color='deep-orange' label='Contact' size='md'
                // value={contact} onChange={(event) => setContact(event.target.value)} 
                value={data.phone ?? ''} onChange={e => setData('phone', e.target.value)} error={errors.phone}
              />
            </div>

            <div className="my-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <Select
                options={districtOptions}
                value={districtOptions.find(opt => opt.value === data.district)} error={errors.district}
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
                value={countyOptions.find(opt => opt.value === data.county)} error={errors.county}
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
                value={subcountiesOptions.find(opt => opt.value === data.subcounty)} error={errors.subcounty}
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
                value={parishOptions.find(opt => opt.value === data.parish)} error={errors.parish}
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
                value={villageOptions.find(opt => opt.value === data.village)} error={errors.village}
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
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default CitizensRegistrationScreen