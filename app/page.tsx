"use client";
import Campaigns from "@/components/Campaigns";
import Contact from "@/components/ContactUs";
import Navbar from "@/components/Navbar";
import Stories from "@/components/Stories";
import Hero from "@/components/Hero";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full min-h-screen bg-[#FAF9F6]">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Hero />
      <div className="bg-[#FAF9F6] pt-24 w-full grid place-items-center">
        <div id="donate" className="h-fit w-full max-w-7xl py-8">
          <Campaigns searched={searchTerm} />
        </div>

        <div id="campaigns" className="h-fit w-full max-w-7xl py-8">
          <Stories />
        </div>

        <div id="contact" className="h-fit w-full max-w-7xl py-8">
          <Contact />
        </div>
        <div id="footer" className="w-full h-fit py-8 bg-rose-400"></div>
      </div>
    </div>
  );
}
