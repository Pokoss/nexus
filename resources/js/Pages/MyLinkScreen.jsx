import React, { useRef } from "react";
import Navbar from "./Components/Navbar";
import { Avatar, Button, Input } from "@material-tailwind/react";
import { Link } from "@inertiajs/react";
import { QRCodeSVG } from "qrcode.react";
import * as htmlToImage from "html-to-image";
import DataTable from "react-data-table-component";
import Footer from "@/Components/Footer";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MyLinkScreen({ my_data, my_people }) {
    const currentUrl = window.location.hostname;
    const linkText = `https://${currentUrl}/join/${my_data.slug}`;
    const domEl = useRef(null);

    // Copy link to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(linkText).then(
            () => {
              toast.info("Link copied to clipboard!");
            },
            (err) => {
                console.error("Failed to copy: ", err);
                alert("Failed to copy. Please try again.");
            }
        );
    };

    // Use Web Share API if available (great on mobile)
    const shareLink = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: `Join ${my_data.name}`,
                    text: `Register through my link:`,
                    url: linkText,
                })
                .catch((error) => console.log("Error sharing:", error));
        } else {
            // Fallback: copy to clipboard if share not supported
            copyToClipboard();
        }
    };

    const downloadImage = async () => {
        const dataUrl = await htmlToImage.toPng(domEl.current);
        const link = document.createElement("a");
        link.download = `${my_data.slug}.png`;
        link.href = dataUrl;
        link.click();
    };

    const customStyles = {
        headRow: { style: { border: "none" } },
        headCells: {
            style: { color: "#997400", fontSize: "14px" },
        },
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: "rgb(230, 244, 244)",
                borderBottomColor: "#FFFFFF",
                outline: "1px solid #FFFFFF",
            },
        },
        pagination: { style: { border: "none" } },
    };

    const columns = [
        {
            name: "Full Name",
            selector: (row) => row.name,
        },
        {
            name: "District",
            selector: (row) =>
                row.village.parish.subcounty.county.district.district,
        },
        {
            name: "County",
            selector: (row) => row.village.parish.subcounty.county.county,
        },
        {
            name: "Subcounty",
            selector: (row) => row.village.parish.subcounty.subcounty,
        },
        {
            name: "Parish",
            selector: (row) => row.village.parish.parish,
        },
        {
            name: "Village",
            selector: (row) => row.village.village,
        },
        {
            name: "Registered On",
            selector: (row) =>
                new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                }),
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="font-oswald w-full p-5 shadow-sm shadow-primary bg-white">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 mb-6">
                    <div className="grid-cols-1 lg:col-span-3">
                        <div className="mx-auto flex items-center justify-center">
                            <div className="mt-3 ml-2">
                                <QRCodeSVG ref={domEl} value={linkText} />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-9">
                        <div className="text-center lg:text-left">
                            <h2 className="text-2xl font-bold text-zinc-700">
                                {my_data.name}
                            </h2>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-0 text-center lg:text-left sm:grid-cols-2">
                            <div>
                                <p className="text-sm font-semibold text-blue-900">
                                    Contact
                                </p>
                                <p className="font-semibold text-primary">
                                    {my_data.phone}
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold text-blue-900">
                                    My Registration Link
                                </p>
                                {/* Display link with Copy & Share buttons */}
                                <div className="mt-1 flex flex-col space-y-2">
                                    <input
                                        value={linkText}
                                        readOnly
                                        className="text-sm text-zinc-700 max-w-44 rounded-md"
                                        crossOrigin={undefined}
                                        onCopy={(e) => {
                                            e.preventDefault();
                                            copyToClipboard();
                                        }}
                                    />
                                    <div className="mt-2 flex items-center gap-2">
                                        {/* Copy Link Button */}
                                        <button
                                            onClick={copyToClipboard}
                                            className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                />
                                            </svg>
                                            Copy
                                        </button>

                                        {/* Share Button */}
                                        <button
                                            onClick={shareLink}
                                            className="flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                                />
                                            </svg>
                                            {navigator.share ? "Share" : "Copy"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Link
                                href={"/join/" + my_data.slug}
                                className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white text-center"
                            >
                                Register User Myself
                            </Link>

                            <button
                                onClick={downloadImage}
                                className="w-full rounded-xl border-2 border-red-500 bg-white px-3 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white"
                            >
                                Download My QR Code
                            </button>
                        </div>
                    </div>
                </div>

                <DataTable
                    title={
                        <div className="flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2">
                            <span>My People</span>
                        </div>
                    }
                    columns={columns}
                    data={my_people.data}
                    customStyles={customStyles}
                    pointerOnHover
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={my_people.total}
                    paginationPerPage={my_people.per_page}
                />
            </div>

            {my_data.level && my_data.level > 1 ? <div></div> : <div></div>}
            <ToastContainer/>
            <Footer />
        </div>
    );
}

export default MyLinkScreen;
