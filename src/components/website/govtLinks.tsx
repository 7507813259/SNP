'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ExternalLink, Globe } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const govtLinks = [
  {
    name: 'Smart City Mission',
    href: 'https://smartcities.gov.in',
    img: '/assets/mhgov.webp'
  },
  {
    name: 'Government of Maharashtra',
    href: 'https://www.maharashtra.gov.in',
    img: '/assets/mhgov.webp'
  },
  {
    name: 'MATTRI',
    href: 'https://matri.maharashtra.gov.in',
    img: '/assets/mhgov.webp'
  },
  {
    name: 'DigiLocker',
    href: 'https://www.digilocker.gov.in',
    img: '/assets/mhgov.webp'
  },
  {
    name: 'Right to Information',
    href: 'https://rti.gov.in',
    img: '/assets/mhgov.webp'
  },
  {
    name: 'SGN CARE',
    href: '#',
    img: '/assets/mhgov.webp'
  },
  {
    name: 'MyGov India',
    href: 'https://www.mygov.in',
    img: '/assets/mhgov.webp'
  }
];

export default function GovernmentLinksSlider() {
  return (
    <section className='bg-gradient-to-b from-white to-gray-50 py-16'>
      <div className='relative mx-auto max-w-7xl px-6'>
        {/* Header */}
        <div className='mb-10 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#b01d4f]/10 px-4 py-2'>
            <Globe className='h-4 w-4 text-[#b01d4f]' />
            <span className='text-sm font-medium text-[#b01d4f]'>
              सरकारी संकेतस्थळे
            </span>
          </div>
          <h2 className='mb-2 text-3xl font-bold text-gray-900'>
            इतर संकेतस्थळे
          </h2>
          <p className='text-gray-600'>
            महाराष्ट्र सरकार आणि भारत सरकारच्या महत्त्वाच्या संकेतस्थळांची
            लिंक्स
          </p>
        </div>

        {/* Slider */}
        <div className='relative'>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            loop
            slidesPerView={2}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 }
            }}
          >
            {govtLinks.map((site, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={site.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group relative flex h-[130px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b01d4f] hover:shadow-xl'
                >
                  {/* External Link Icon */}
                  <div className='absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    <ExternalLink className='h-4 w-4 text-[#b01d4f]' />
                  </div>

                  {/* Logo */}
                  <div className='flex h-16 w-full items-center justify-center'>
                    <Image
                      src={site.img}
                      alt={site.name}
                      width={100}
                      height={50}
                      className='object-contain transition-transform duration-300 group-hover:scale-110'
                      onError={(e) => {
                        e.currentTarget.src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="50"%3E%3Crect fill="%23e5e7eb" width="100" height="50"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="12" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ELogo%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>

                  {/* Name */}
                  <p className='text-center text-xs font-medium text-gray-700 transition-colors duration-300 group-hover:text-[#b01d4f]'>
                    {site.name}
                  </p>

                  {/* Hover Effect Border */}
                  <div className='absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-[#b01d4f]/20' />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
