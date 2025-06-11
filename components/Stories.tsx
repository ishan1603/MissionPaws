import { dummy_campaigns } from '@/constants/lib'
import Image from 'next/image'
import React, { useState } from 'react'

const Stories = () => {

    // const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>(dummy_campaigns);
    const [showAll, setShowAll] = useState(false);

    const visibleCampaigns = showAll ? dummy_campaigns : dummy_campaigns.slice(0, 3);

  return (
     <div className="flex flex-col items-center justify-between gap-4">
                <h1  className='text-4xl text-rose-400'> Feel Good </h1>
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
                                
                <div className="p-4 space-y-4 flex flex-col items-center justify-between">
                    <h1 className='text-xl font-bold' >ABCXYZ is HEALED!!!</h1>
                    <h3 className="font-medium text-gray-800 line-clamp-2">
                    {item.heading}
                    </h3>
                    </div>
                </div>
            ))}
            </div>
            {dummy_campaigns.length > 3 && (
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

export default Stories