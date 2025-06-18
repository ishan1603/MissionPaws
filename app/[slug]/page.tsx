/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { notFound } from "next/navigation";
import { dummy_campaigns } from "@/constants/lib";
import Navbar from "@/components/Navbar";
import { useState, use } from "react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default function CampaignPage({ params }: Props) {
  const { slug } = use(params);
  const campaign = dummy_campaigns.find(c => c.slug === slug);
  const [searchTerm, setSearchTerm] = useState("");

  if (!campaign) return notFound();

  // Calculate progress percentage
  const progress = (campaign.raised / campaign.required) * 100;

  return (
    <>
      <Navbar
        slug={true}
        setSearchTerm={setSearchTerm}
      />
      <div className="min-h-screen bg-[#FAF9F6] pt-24">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
          <img 
            src={campaign.img} 
            alt={campaign.heading} 
            className="w-full h-[400px] object-cover rounded-lg mb-6" 
          />
          
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {campaign.heading}
          </h1>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {campaign.description}
          </p>

          <div className="bg-[#FAF9F6] p-6 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">
                Raised: ₹{campaign.raised.toLocaleString()}
              </span>
              <span className="font-medium text-gray-700">
                Goal: ₹{campaign.required.toLocaleString()}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button className="w-full py-3 bg-rose-400 hover:bg-rose-500 text-white font-medium rounded-lg transition-colors duration-200">
            Donate Now
          </button>
        </div>
      </div>
    </>
  );
}