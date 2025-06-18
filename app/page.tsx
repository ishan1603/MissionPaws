"use client";
import Campaigns from "@/components/Campaigns";
import Contact from "@/components/ContactUs";
import Navbar from "@/components/Navbar";
import Stories from "@/components/Stories";
import Hero from "@/components/Hero";
import { useState, useEffect } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      threshold: 0.6,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => sectionObserver.observe(section));

    return () => sectionObserver.disconnect();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FAF9F6]">
      <Navbar 
        slug = {false}
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        activeSection={activeSection} 
      />
      <section id="home" className="min-h-screen">
        <Hero />
      </section>
      <div className="bg-[#FAF9F6] pt-24 w-full grid place-items-center">
        <section id="donate" className="h-fit w-full max-w-7xl py-8">
          <Campaigns searched={searchTerm} />
        </section>

        <section id="campaigns" className="h-fit w-full max-w-7xl py-8">
          <Stories />
        </section>

        <section id="contact" className="h-fit w-full max-w-7xl py-8">
          <Contact />
        </section>
        <footer id="footer" className="w-full h-fit py-8 bg-rose-400">
        </footer>
      </div>
    </div>
  );
}
