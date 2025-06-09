"use client"
import Campaigns from "@/components/Campaigns";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home() {

  const [searchTerm, setSearchTerm] = useState(''); 

  return (
  <div className="w-full h-screen bg-[#FAF9F6] ">
    <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <div className="bg-[#FAF9F6] pt-24 w-full grid place-items-center">
      <div id="campaigns" className="min-h-screen max-w-7xl ">
        <Campaigns searched={searchTerm} />
      </div>
      
      <div id="donate" className="min-h-screen max-w-7xl">
        {/* Donate content */}
      </div>
      
      <div id="contact" className="min-h-screen max-w-7xl">
        {/* Contact content */}
      </div>
    </div>
  </div>
  );
}
