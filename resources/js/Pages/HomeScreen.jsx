import React from "react";
import Navbar from "./Components/Navbar";
import { Link } from "@inertiajs/react";
import { Carousel, Typography } from "@material-tailwind/react";
import Footer from "@/Components/Footer";

function HomeScreen() {
    const team = [
        {
            name: "Brig Gen. Mbaine Julius",
            role: "God Father",
            image: "/images/team/julius.jpg",
        },
        {
            name: "Col. Allan Kitanda",
            role: "God Father",
            image: "/images/team/allan.jpg",
        },
        {
            name: "Col. Yusuf Magero Buha",
            role: "God Father",
            image: "/images/team/buha.jpg",
        },
        {
            name: "Col. Nelson Ahebwa",
            role: "God Father",
            image: "/images/team/nelson.jpg",
        },
    ];
     const slides = [
    {
      image: "/images/resources/hero1.jpg",
      title: "KIKUMI KIKUMI COMMUNITY",
      description:
        "A community of opportunities for Ugandans aimed at building self-sufficient, modern, healthy, and progressive societies using resources available to them.",
      link: "/join/opoka-daniel-se0ll1urgmhavv6g",
    },
    {
      image: "/images/resources/hero6.jpg",
      title: "Empowering Communities",
      description:
        "Join hands with us to create sustainable solutions and empower communities for a brighter future.",
      link: "/join/opoka-daniel-se0ll1urgmhavv6g",
    },
    {
      image: "/images/resources/hero5.jpg",
      title: "Be Part of the Change",
      description:
        "Your participation matters. Together, we can transform lives and build a better Uganda.",
      link: "/join/opoka-daniel-se0ll1urgmhavv6g",
    },
  ];

    return (
        <div>
            <Navbar />
            <section className="relative">
                <Carousel
                    autoplay
                    loop
                    transition={{ duration: 2 }}
                    className="h-[80vh] rounded-none"
                    prevArrow={({ handlePrev }) => (
                        <button
                            onClick={handlePrev}
                            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                        >
                            ‹
                        </button>
                    )}
                    nextArrow={({ handleNext }) => (
                        <button
                            onClick={handleNext}
                            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                        >
                            ›
                        </button>
                    )}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="relative w-full h-full flex items-center justify-center"
                        >
                            {/* Background Image */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                            {/* Content */}
                            <div className="relative z-10 text-center text-white px-6 max-w-3xl">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                                    {slide.title}
                                </h1>
                                <p className="mb-6 text-lg md:text-xl drop-shadow-md">
                                    {slide.description}
                                </p>
                                <Link
                                    href={slide.link}
                                    className="px-8 py-3 text-lg bg-black rounded shadow-lg hover:bg-primary/90 transition"
                                >
                                    Join Us
                                </Link>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </section>
            
            <section className="p-6 dark:bg-gray-800 dark:text-gray-100">
                <div className="container grid justify-center grid-cols-2 mx-auto text-center lg:grid-cols-3">
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leadi lg:text-6xl">
                            12K
                        </p>
                        <p className="text-sm sm:text-base">Groups</p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leadi lg:text-6xl">
                            7M
                        </p>
                        <p className="text-sm sm:text-base">People</p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leadi lg:text-6xl">
                            135
                        </p>
                        <p className="text-sm sm:text-base">Districts</p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leadi lg:text-6xl">
                            74K
                        </p>
                        <p className="text-sm sm:text-base">Villages</p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leadi lg:text-6xl">
                            1
                        </p>
                        <p className="text-sm sm:text-base">
                            Year of exsitance
                        </p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leadi lg:text-6xl">
                            12
                        </p>
                        <p className="text-sm sm:text-base">Team Members</p>
                    </div>

                    {/* <p className='text-black font-bold text-lg'>latitude: {location.latitude}</p><br /><br />
                    <p className='text-black font-bold text-lg'>longtitude: {location.longitude}</p>
                    <p className='text-black font-bold text-lg'>longtitude: {location.longitude}</p>
                    <p className='text-black font-bold text-lg'>error: {error}</p> */}
                </div>
            </section>
            {/* <section className="py-8">
        <div className="container mx-auto">
          <div className="p-4 mx-auto text-center md:px-10 lg:px-32 xl:max-w-3xl">
            <h2 className="text-2xl font-bold leadi sm:text-4xl">Why Join Kikumi Kikumi Community</h2>
            <p className="px-8 my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eveniet facilis est saepe odio porro reiciendis, mollitia sint maxime, laudantium doloribus voluptatem commodi nobis dignissimos non quia earum, numquam amet. Lo
            </p>
          </div>

        </div>
      </section> */}

            {/* <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        Kikumi Kikumi Community is possible because of
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 items-center">
                        {team.map((member, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-100 rounded-lg shadow hover:shadow-lg transition p-4"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-60 object-cover rounded-lg mb-4"
                                />
                                <h4 className="text-xl font-semibold">
                                    {member.name}
                                </h4>
                                <p className="text-orange-600 font-medium">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            <section class="bg-white ">
                <div class="container px-6 py-8 mx-auto">
                    <h2 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
                        Our <span className="text-primary">Team</span>
                    </h2>

                    <div class="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center w-full">
                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-cover w-full h-48 mx-auto rounded-lg"
                                src="/images/team/hood.jpg"
                                alt="avatar"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Hood Sentale K
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    Chief Coordinator
                                </span>
                            </div>
                        </div>

                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-cover w-full h-48 mx-auto rounded-lg"
                                src="/images/team/dan.jpg"
                                alt="opoka"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Opoka Daniel
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    C.T.O
                                </span>
                            </div>
                        </div>
                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-cover w-full h-48 mx-auto rounded-lg"
                                src="/images/team/clare.jpg"
                                alt="clare"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Claire Selina Nangajja
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    Head of Partnerships
                                </span>
                            </div>
                        </div>
                        {/* <div class="w-full max-w-xs text-center">
              <img class="object-contain w-full h-48 mx-auto rounded-lg" src="/images/team/timothy.jpg" alt="avatar" />

              <div class="mt-2">
                <h3 class="text-lg font-medium text-gray-700 ">Ocheng Timothy</h3>
                <span class="mt-1 font-medium text-gray-600 ">Coordinator</span>
              </div>
            </div> */}
                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-cover object-top w-full h-48 mx-auto rounded-lg"
                                src="/images/team/roy.jpg"
                                alt="Joseph"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Rugumayo Roy
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    Coordinator
                                </span>
                            </div>
                        </div>

                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-cover object-top w-full h-48 mx-auto rounded-lg"
                                src="/images/team/shafiq.jpg"
                                alt="Shafiq"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Kiyimba Shafiq
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    Coordinator
                                </span>
                            </div>
                        </div>
                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-contain object-top w-full h-48 mx-auto rounded-lg"
                                src="/images/team/joseph.jpg"
                                alt="Joseph"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Kunikina Joseph Napututaliu
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    Coordinator
                                </span>
                            </div>
                        </div>

                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-cover object-top w-full h-48 mx-auto rounded-lg"
                                src="/images/team/mary.jpg"
                                alt="Joseph"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Nakeyune Mary
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    Coordinator
                                </span>
                            </div>
                        </div>
                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-cover object-top w-full h-48 mx-auto rounded-lg"
                                src="/images/team/rasta.jpg"
                                alt="Joseph"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Kaweesi Roy Keith
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    Coordinator
                                </span>
                            </div>
                        </div>
                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-cover w-full h-48 mx-auto rounded-lg"
                                src="/images/team/angel.jpg"
                                alt="Joseph"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Nakake Angel
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    Coordinator/Admin
                                </span>
                            </div>
                        </div>
                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-cover w-full h-48 mx-auto rounded-lg"
                                src="/images/team/marylin.jpg"
                                alt="Joseph"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Amtuheire Maryline
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    Coordinator
                                </span>
                            </div>
                        </div>
                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-cover w-full h-48 mx-auto rounded-lg"
                                src="/images/team/timo.jpg"
                                alt="Joseph"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Ocheng Timothy
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    Coordinator
                                </span>
                            </div>
                        </div>
                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-cover w-full h-48 mx-auto rounded-lg"
                                src="/images/team/wamakota.jpg"
                                alt="Joseph"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Wamakota Alex
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    Coordinator
                                </span>
                            </div>
                        </div>
                        <div class="w-full max-w-xs text-center">
                            <img
                                class="object-cover w-full h-48 mx-auto rounded-lg"
                                src="/images/team/mable.jpg"
                                alt="Joseph"
                            />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">
                                    Beinomugisha Mable
                                </h3>
                                <span class="mt-1 font-medium text-gray-600 ">
                                    Coordinator
                                </span>
                            </div>
                        </div>

                        {/* <div class="w-full max-w-xs text-center">
              <img class="object-cover object-top w-full h-48 mx-auto rounded-lg" src="/images/team/mary.jpg" alt="Joseph" />

              <div class="mt-2">
                <h3 class="text-lg font-medium text-gray-700 ">Mary s</h3>
           
              </div>
            </div> */}

                        {/* <div class="w-full max-w-xs text-center">
                <img class="object-cover object-center w-full h-48 mx-auto rounded-lg" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" />

                <div class="mt-2">
                    <h3 class="text-lg font-medium text-gray-700 ">Kigundu Allan</h3>
                    <span class="mt-1 font-medium text-gray-600 ">Digital / Social Media</span>
                </div>
            </div> */}

                        {/* <div class="w-full max-w-xs text-center">
                <img class="object-cover object-center w-full h-48 mx-auto rounded-lg" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" />

                <div class="mt-2">
                    <h3 class="text-lg font-medium text-gray-700 ">Aleni Feni Joseph</h3>
                    <span class="mt-1 font-medium text-gray-600 ">Marketing Manager</span>
                </div>
            </div> */}
                    </div>
                </div>
            </section>

            <div className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
                            Location
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Our Offices
                        </p>
                        {/* <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magnam voluptatum cupiditate veritatis
                            in, accusamus quisquam.
                        </p> */}
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        {/* <!-- Heroicon name: globe-alt --> */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">
                                        Addresses
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        Kati House Level 3 Kampala, Uganda
                                        <br />
                                    </dd>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        {/* <!-- Heroicon name: phone --> */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">
                                        Phone number
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        +256 752 553 236
                                    </dd>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        {/* <!-- Heroicon name: mail --> */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">
                                        Email
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        info@kikumikikumi.com
                                    </dd>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        {/* <!-- Heroicon name: clock --> */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">
                                        Working Hours
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        Monday - Friday: 9am to 5pm
                                        <br />
                                    </dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default HomeScreen;
