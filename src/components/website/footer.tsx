'use client';

// components/Footer.tsx
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageSquare, ArrowUp } from 'lucide-react';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
    { icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
    { icon: Youtube, href: '#', color: 'hover:bg-red-600' }
  ];
  
  return (
    <footer className='relative mt-10 rounded-t-[40px] pt-10 overflow-hidden'>
      {/* BACKGROUND IMAGE - ABSOLUTE AND FULL WIDTH */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src='/assets/calligraphy.jpg'
          alt='Decorative background'
          fill
          className='object-cover w-full h-full opacity-20' // Reduced opacity to show background color
          priority={false}
          quality={75}
        />
        {/* Gradient overlay to blend image with background color */}
        {/* <div className='absolute inset-0 bg-gradient-to-t from-amber-50 via-amber-50/90 to-amber-50/70' /> */}
      </div>

      {/* TOP SECTION */}
      <div className='relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-4'>
        {/* LOGO + BADGES */}
        <div>
          <div className='mb-4 flex items-center gap-3'>
            <Image src='/logo.png' alt='SGN' width={60} height={60} />
            <h3 className='text-lg font-bold text-[#7a1e4f]'>
              शेगांव नगर परिषद
            </h3>
          </div>

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
                  <Icon
                    size={14}
                    className='transition-transform duration-300 group-hover:scale-110'
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* सेवा */}
        <div>
          <h4 className='mb-3 font-semibold text-[#7a1e4f]'>सेवा</h4>
          <ul className='space-y-2 text-sm text-gray-700'>
            <li className='cursor-pointer transition-colors hover:text-[#b01d4f]'>
              ऑनलाईन सेवा
            </li>
            <li className='cursor-pointer text-[#b01d4f] transition-colors hover:text-[#7a1e4f]'>
              शेगांव नगर परिषद केअर
            </li>
            <li className='cursor-pointer transition-colors hover:text-[#b01d4f]'>
              शेगांव नगर परिषद अ‍ॅप
            </li>
          </ul>
        </div>

        {/* माहिती */}
        <div>
          <h4 className='mb-3 font-semibold text-[#7a1e4f]'>माहिती</h4>
          <ul className='space-y-2 text-sm text-gray-700'>
            <li className='cursor-pointer transition-colors hover:text-[#b01d4f]'>
              मनपावळ
            </li>
            <li className='cursor-pointer transition-colors hover:text-[#b01d4f]'>
              बातम्या आणि कार्यक्रम
            </li>
            <li className='cursor-pointer transition-colors hover:text-[#b01d4f]'>
              वारंवार विचारले जाणारे प्रश्न
            </li>
          </ul>
        </div>

        {/* उपयुक्त संकेतस्थळे */}
        <div>
          <h4 className='mb-3 font-semibold text-[#7a1e4f]'>
            उपयुक्त संकेतस्थळे
          </h4>
          <ul className='space-y-2 text-sm text-gray-700'>
            <li className='cursor-pointer transition-colors hover:text-[#b01d4f]'>
              साईटमॅप
            </li>
            <li className='cursor-pointer transition-colors hover:text-[#b01d4f]'>
              महाराष्ट्र शासन निर्णय
            </li>
            <li className='cursor-pointer transition-colors hover:text-[#b01d4f]'>
              मदत
            </li>
            <li className='cursor-pointer transition-colors hover:text-[#b01d4f]'>
              संकेतस्थळ धोरण
            </li>
          </ul>
        </div>
      </div>

      {/* CONTACT ROW */}
      <div className='relative mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 px-6 text-sm md:grid-cols-4'>
        <div></div>
        <div></div>
        <div></div>
        <div className='space-y-3 text-gray-700'>
          <div className='flex items-center gap-2'>
            <Phone size={16} className='text-[#b01d4f]' /> १८००३०२३२३
          </div>
          <div className='flex items-center gap-2'>
            <Mail size={16} className='text-[#b01d4f]' /> info@shegaonnp.gov.in
          </div>
          <div className='flex items-start gap-2'>
            <MapPin size={16} className='mt-1 text-[#b01d4f]' />
            <span>
              शेगांव नगर परिषद, मुख्य रस्ता, शेगांव, जिल्हा बुलढाणा, महाराष्ट्र
              - ४४३२०१.
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <MessageSquare size={16} className='text-[#b01d4f]' /> तुमचा
            अभिप्राय नोंदवा
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className='pb-5 relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-gray-700 md:flex-row'>
        <div>कॉपीराइट © २०२५ शेगांव नगर परिषद. सर्व हक्क राखीव.</div>
      </div>

      {/* SCROLL TO TOP */}
      <button
        onClick={scrollToTop}
        className='fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#b01d4f] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#7a1e4f]'
        aria-label='Scroll to top'
      >
        <ArrowUp size={20} />
      </button>

      {/* FLOATING LOGO */}
      {/* <button className='fixed right-20 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow'>
        <Image src='/assets/mhgov.webp' alt='SGN' width={30} height={30} />
      </button> */}
    </footer>
  );
}