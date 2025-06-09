"use client";
import { IconUserCircle } from '@tabler/icons-react'
import SearchInput from './SearchInput'
import { useState, useEffect } from 'react';
import { navItems } from '@/constants/lib';

const Navbar = ({ searchTerm, setSearchTerm } : { searchTerm: string; setSearchTerm: (e : string) => void; }) => {
  const [section, setSection] = useState("campaigns");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.link));
      const scrollPosition = window.scrollY + 100; // offset for navbar height

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };    

  return (
    <div className="w-full h-fit bg-white px-6 py-4 fixed top-0 z-50 shadow-[0_2px_15px_-3px_rgba(255,0,127,0.07)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-sm">MISSIONPAWS LOGO</div>
        <div className='flex items-center gap-6'>
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(item.link)}
              className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer
                ${section === item.link 
                  ? 'text-[#f792c5] border-b-2 border-[#f792c5]' 
                  : 'text-gray-600 hover:text-[#f792c5]'
                }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="flex-1 max-w-xs border border-gray-200 rounded-2xl">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search campaigns..."
          />
        </div>
        <IconUserCircle stroke={1.5} width={35} height={35} className="cursor-pointer"/>
      </div>
    </div>
  )
}

export default Navbar