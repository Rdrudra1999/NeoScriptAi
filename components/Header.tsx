'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollThreshold = 100; // Adjust this value as needed

      setIsScrolled(scrollTop > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logoGradient = 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent';
  const secondaryGradient = 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent';
  const tertiaryGradient = 'bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 bg-clip-text text-transparent';

  return (
    <header
      className={`sticky top-0 z-10 flex justify-between items-center w-full py-4 px-6 border-b-2  transition-all mx-auto max-w-5xl ${
        isScrolled ? 'backdrop-filter backdrop-blur-lg' : ''
      }`}
    >
      <Link href="/" className="flex space-x-3 items-center">
        <h1 className="sm:text-4xl text-2xl font-bold tracking-tight">
          <span className={tertiaryGradient}>NeoScriptAi</span>
        </h1>
      </Link>
      <a
        href="https://vercel.com/templates/next.js/twitter-bio"
        target="_blank"
        rel="noreferrer"
        className="rounded-full p-1 w-10 h-10 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500"
      >
        {/* Add an icon or image here */}
      </a>
    </header>
  );
};

export default Header;
