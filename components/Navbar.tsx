"use client";

import SearchInput from "./SearchInput";
import { useState, useEffect } from "react";
import { navItems } from "@/constants/lib";
import Image from "next/image";

const Navbar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (e: string) => void;
}) => {
  const [section, setSection] = useState("donate");
  const navbarHeight = 100;

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: `-${navbarHeight}px 0px 0px 0px`,
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all nav sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.link);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => observer.disconnect();
  }, [navbarHeight]);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full h-fit bg-white px-6 py-4 fixed top-0 z-50 shadow-[0_2px_15px_-3px_rgba(255,0,127,0.07)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-sm">
          <Image src="/logomp.jpg" alt="MP LOGO" width={80} height={80} />
        </div>
        <div className="flex items-center gap-6">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(item.link)}
              className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer
                ${
                  section === item.link
                    ? "text-[#f792c5] border-b-2 border-[#f792c5]"
                    : "text-gray-600 hover:text-[#f792c5]"
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
      </div>
    </div>
  );
};

export default Navbar;
