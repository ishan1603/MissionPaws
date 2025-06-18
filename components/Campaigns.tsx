/* eslint-disable @typescript-eslint/no-explicit-any */
import { dummy_campaigns } from '@/constants/lib';
import React, { useEffect, useState } from 'react'
import { handleDonate } from "../utils/razorpay";
import Image from 'next/image'
import Link from 'next/link';

// Extend the Window interface to include Razorpay
declare global {
  interface Window {
    Razorpay?: any;
  }
}

const Campaigns = ({ searched } : { searched: string; }) => {
    const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>(dummy_campaigns);
    const [showAll, setShowAll] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [donateAmount, setDonateAmount] = useState("");
    const [activeCampaign, setActiveCampaign] = useState<any>(null);

    React.useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    useEffect(() => {  
        const filtered = searched !== "" 
            ? dummy_campaigns.filter(item => 
                item.heading.toLowerCase().includes(searched.toLowerCase())
              )
            : dummy_campaigns;
        setFilteredCampaigns(filtered);
        setShowAll(false); // Reset showAll when search changes
    }, [searched]);

    const visibleCampaigns = showAll ? filteredCampaigns : filteredCampaigns.slice(0, 6);

    return (
        <div className="flex flex-col items-center justify-between gap-4">
            <h1 className='text-4xl text-rose-400'> Our Campaigns </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {visibleCampaigns.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer flex flex-col">
                    <Link href={`/${item.slug}`}>
                        <div className="aspect-video relative">
                            <Image 
                                src={item.img} 
                                alt={item.heading}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className="p-4 space-y-4 flex-1 flex flex-col">
                            <h3 className="font-medium text-gray-800 line-clamp-2">
                                {item.heading}
                            </h3>
                            <div className="space-y-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-[#f792c5] h-2 rounded-full"
                                        style={{ width: `${(item.raised / item.required) * 100}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Raised: ₹{item.raised.toLocaleString()}
                                    </span>
                                    <span className="text-gray-600">
                                        Goal: ₹{item.required.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="p-4">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveCampaign(item);
                                setModalOpen(true);
                            }}
                            className="w-full bg-rose-400 text-white px-4 py-2 rounded hover:bg-rose-600 transition cursor-pointer"
                        >
                            Donate Now
                        </button>
                    </div>
                </div>
            ))}
            </div>
            {/* Modal for donation amount */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xs flex flex-col items-center pointer-events-auto border-2 border-rose-200">
                        <h2 className="text-xl font-bold mb-2 text-rose-400">Donate to {activeCampaign?.heading}</h2>
                        <input
                            type="number"
                            min="1"
                            placeholder="Enter amount (INR)"
                            value={donateAmount}
                            onChange={e => setDonateAmount(e.target.value.replace(/[^0-9]/g, ''))}
                            className="border border-gray-300 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                        <div className="flex gap-2 w-full">
                            <button
                                onClick={() => {
                                    const amount = Number(donateAmount);
                                    if (!isNaN(amount) && amount > 0) {
                                        // Ensure Razorpay script is loaded before calling handleDonate
                                        if (typeof window.Razorpay === 'function') {
                                            handleDonate(amount * 100);
                                            setModalOpen(false);
                                            setDonateAmount("");
                                        } else {
                                            alert("Payment gateway is still loading. Please try again in a moment.");
                                        }
                                    } else {
                                        alert("Please enter a valid amount.");
                                    }
                                }}
                                className="flex-1 bg-rose-400 text-white px-4 py-2 rounded hover:bg-rose-600 transition"
                            >
                                Donate
                            </button>
                            <button
                                onClick={() => {
                                    setModalOpen(false);
                                    setDonateAmount("");
                                }}
                                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {filteredCampaigns.length > 6 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="cursor-pointer px-6 py-2 mb-8 text-white bg-rose-400 rounded-full hover:bg-rose-500 transition-colors"
                >
                    {showAll ? 'Show Less' : 'See More'}
                </button>
            )}
        </div>
    )
}

export default Campaigns
