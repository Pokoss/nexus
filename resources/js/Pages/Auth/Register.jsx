import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '@/Components/Footer';
import { toast, ToastContainer } from 'react-toastify';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        nin: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const isValidNIN = (nin) => {
        const formattedNIN = nin.toUpperCase();
        const ninRegex = /^[A-Z]{2}[A-Z0-9]{11}[A-Z]$/;
        return formattedNIN.length === 14 && ninRegex.test(formattedNIN);
    };
    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^07\d{8}$/;
        return phoneRegex.test(phone);
    };
    const submit = (e) => {
        e.preventDefault();
        if (!isValidNIN(data.nin)) {

            toast.error('Invalid NIN format. Please enter a valid NIN.');
        }
        else if (!isValidPhoneNumber(data.phone)) {

            toast.error('Invalid phone number. Enter the format 07XXXXXXXX.');
        }
        else {
            post(route('register'));
        }
    };


    return (
        <div>


            <Navbar />
            <GuestLayout>
                <Head title="Register" />

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full uppercase"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="nin" value="National Identification Number (NIN)" />

                        <TextInput
                            id="nin"
                            name="nin"
                            value={data.nin}
                            className="mt-1 block w-full uppercase"
                            autoComplete="nin"
                            isFocused={true}
                            onChange={(e) => setData('nin', e.target.value)}
                            required
                        />

                        <InputError message={errors.nin} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="phone" value="Phone" />

                        <TextInput
                            id="phone"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            autoComplete="phone"
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />

                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route('login')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
            <Footer />
            <ToastContainer />
        </div>
    );
}
