/* eslint-disable @typescript-eslint/no-explicit-any */
import { dummy_campaigns } from '@/constants/lib';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Campaigns = ({ searched } : { searched: string; }) => {
    const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>(dummy_campaigns);
    const [showAll, setShowAll] = useState(false);

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
            <h1  className='text-4xl text-rose-400'> Our Campaigns </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {visibleCampaigns.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer">
            <div className="aspect-video relative">
                <Image 
                src={item.img} 
                alt={item.heading}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            
            <div className="p-4 space-y-4">
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
            </div>
        ))}
        </div>
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