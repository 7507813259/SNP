'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const wasScrolledRef = useRef(false);
  const ticking = useRef(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = 100;
    const HYSTERESIS = 20; // Add hysteresis to prevent rapid toggling

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const wasScrolled = wasScrolledRef.current;

          // Use hysteresis: different thresholds for scrolling up vs down
          let nowScrolled;
          if (wasScrolled) {
            // If already scrolled, only change to false when scrolling back up past threshold - hysteresis
            nowScrolled = scrollY > SCROLL_THRESHOLD - HYSTERESIS;
          } else {
            // If not scrolled, change to true when scrolling down past threshold
            nowScrolled = scrollY > SCROLL_THRESHOLD;
          }

          // Only update state if it actually changed
          if (wasScrolled !== nowScrolled) {
            setIsScrolled(nowScrolled);
            wasScrolledRef.current = nowScrolled;

            // Only animate when transitioning from relative to fixed
            if (!wasScrolled && nowScrolled) {
              setShouldAnimate(true);
              // Reset animation flag after animation completes
              setTimeout(() => setShouldAnimate(false), 300);
            }
          }

          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    // Check initial scroll position
    const initialScrollY = window.scrollY;
    const initialScrolled = initialScrollY > SCROLL_THRESHOLD;
    setIsScrolled(initialScrolled);
    wasScrolledRef.current = initialScrolled;

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full border-b bg-white transition-all duration-300 ease-in-out ${
        isScrolled
          ? `fixed top-0 right-0 left-0 z-50 shadow-md ${
              shouldAnimate ? 'animate-slideDown' : ''
            }`
          : 'relative'
      }`}
    >
      <div className='mx-auto max-w-7xl px-4'>
        <div className='flex h-30 items-center justify-between'>
          {/* Left Logo + Title */}
          <div className='flex items-center gap-3'>
            <Image
              src='/logo.png'
              alt='Shegaon Nagar Parishad Logo'
              width={100}
              height={100}
              priority
            />
            <h1 className='lg:text-xl md:text-xl text-2xl font-semibold whitespace-nowrap text-red-700'>
              शेगांव नगर परिषद
            </h1>
          </div>

          {/* Navigation */}
          <nav className='hidden items-center gap-8 text-md font-medium md:flex'>
            <Link
              href='#'
              className='border-b-2 border-red-600 pb-1 text-red-600'
            >
              मुख्यपृष्ठ
            </Link>
            <Link href='#' className='text-black hover:text-red-600'>
              नगर परिषद
            </Link>
            <Link href='#' className='text-black hover:text-red-600'>
              नागरिक सेवा
            </Link>
            <Link href='#' className='text-black hover:text-red-600'>
              शेगांव दर्शन
            </Link>
            <Link href='#' className='text-black hover:text-red-600'>
              सूचना / प्रसिद्धी
            </Link>
            <Link href='#' className='text-black hover:text-red-600'>
              संपर्क
            </Link>
          </nav>

          {/* Right Logos */}
          <div className='hidden lg:flex md:flex items-center gap-3'>
            <Image
              src='/assets/mhgov.webp'
              alt='Government of Maharashtra'
              width={60}
              height={60}
            />
            <Image
              src='/assets/ingov.webp'
              alt='Government of India'
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
