"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative bg-black h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          className="w-full h-full object-cover opacity-70"
          src="/hero-dog.jpg"
          alt="Happy dog"
          layout="fill"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="pt-10 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
            <div className="sm:text-center lg:text-left">
              <h1
                className={`text-4xl tracking-tight font-extrabold text-rose-400 sm:text-5xl md:text-6xl transition-all duration-1000 ${
                  loaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10"
                }`}
              >
                <span className="block">MissionPaws</span>
                <span className="block text-white">Lucknow</span>
              </h1>
              <p
                className={`mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 transition-all duration-1000 delay-200 ${
                  loaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10"
                }`}
              >
                Helping stray dogs in Lucknow find shelter, care, and loving
                homes.
              </p>
              <div
                className={`mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start transition-all duration-1000 delay-400 ${
                  loaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10"
                }`}
              >
                <div className="rounded-md shadow">
                  <a
                    href="#donate"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-400 hover:bg-rose-600 md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    Donate Now
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
