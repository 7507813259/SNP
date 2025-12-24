'use client';

import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Phone,
  LogIn,
  Languages,
  ArrowDown
} from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
  { icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
  { icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
  { icon: Youtube, href: '#', color: 'hover:bg-red-600' }
];

export default function TopUtilityBar() {
  return (
    <div className='w-full border-b-2 border-[#b01d4f]/20 bg-gradient-to-r from-[#f9f2ec] via-white to-[#f9f2ec] text-sm shadow-sm'>
      <div className='mx-auto max-w-7xl px-4 md:px-6'>
        <div className='flex flex-col items-center justify-between gap-3 py-2.5 md:flex-row md:gap-4'>
          {/* Left Social Icons */}
          <div className='flex items-center gap-2'>
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <Link
                  key={index}
                  href={social.href}
                  className={`group flex h-8 w-8 items-center justify-center rounded-full bg-[#b01d4f] text-white shadow-sm transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-md`}
                  aria-label={`Social media link ${index + 1}`}
                >
                  <Icon size={14} className='transition-transform duration-300 group-hover:scale-110' />
                </Link>
              );
            })}
          </div>

          {/* Center Buttons */}
          <div className='flex flex-wrap items-center justify-center gap-2'>
            <div className='group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] px-4 py-1.5 text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105'>
              <Phone size={14} className='transition-transform duration-300 group-hover:scale-110' />
              <span className='font-medium'>टोल फ्री : १८००३०२३२३</span>
            </div>
            <div className='rounded-full bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] px-4 py-1.5 text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105'>
              <span className='font-medium'>सार्वजनिक निवडणूक २०२५-२६</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className='flex items-center gap-3'>
            <span className='hidden font-medium text-gray-700 md:inline-block'>
              मुख्य मजकूराकडे जा
            </span>

            <button className='group flex items-center gap-1.5 rounded-full border-2 border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-[#b01d4f] hover:bg-gray-50 hover:text-[#b01d4f]'>
              <Languages size={14} />
              <span>English</span>
              <ArrowDown size={12} className='transition-transform duration-300 group-hover:rotate-180' />
            </button>

            <Link
              href='/auth/sign-in'
              className='group flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] px-4 py-1.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105'
            >
              <LogIn size={14} className='transition-transform duration-300 group-hover:translate-x-0.5' />
              <span>विभाग लॉगिन</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
