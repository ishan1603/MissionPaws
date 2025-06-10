/* eslint-disable @typescript-eslint/no-explicit-any */
import { dummy_campaigns } from '@/constants/lib';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Campaigns = ({ searched } : { searched: string; }) => {
    const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>(dummy_campaigns);

    useEffect(() => {  
        const filtered = searched !== "" 
            ? dummy_campaigns.filter(item => 
                item.heading.toLowerCase().includes(searched.toLowerCase())
              )
            : dummy_campaigns;
        setFilteredCampaigns(filtered);
    }, [searched]);

    return (
        <div className="flex flex-col items-center justify-between gap-4">
            <h1 className='text-4xl text-rose-400'> Our Campaigns </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredCampaigns.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
    </div>
  )
}

export default Campaigns