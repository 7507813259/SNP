'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';

const slides = [
  {
    id: 1,
    image: '/assets/mhgov.webp',
    alt: 'Shegaon Nagar Parishad Event',
    title: 'आता जगाची वारी,',
    subtitle: 'भारतात पुण्याच्या वारी!',
    description: 'SGN Shegaon Nagar Parishad – Official Initiatives & Events'
  },
  {
    id: 2,
    image: '/assets/mhgov.webp',
    alt: 'Shegaon Development',
    title: 'शेगाव नगर परिषद',
    subtitle: 'सर्वांसाठी विकास',
    description: 'नागरिकांच्या सेवेसाठी समर्पित'
  }
];

export default function HeroSlider() {
  return (
    <section className='relative w-full overflow-hidden'>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        loop
        className='h-[260px] w-full md:h-[480px] lg:h-[520px]'
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className='relative h-full w-full'>
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority
                className='object-cover'
                onError={(e) => {
                  e.currentTarget.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"%3E%3Crect fill="%23b01d4f" width="1200" height="600"/%3E%3Ctext fill="white" font-family="sans-serif" font-size="60" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EShegaon%3C/text%3E%3C/svg%3E';
                }}
              />

              {/* Gradient Overlay */}
              <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30' />

              {/* Content */}
              <div className='absolute inset-0 flex items-center'>
                <div className='mx-auto max-w-7xl px-6'>
                  <div className='max-w-2xl'>
                    <h2 className='mb-4 text-3xl leading-tight font-bold text-white drop-shadow-2xl md:text-5xl lg:text-6xl'>
                      {slide.title}
                      <br />
                      <span className='text-yellow-300'>{slide.subtitle}</span>
                    </h2>

                    <p className='mt-6 text-base text-white/90 drop-shadow-lg md:text-lg'>
                      {slide.description}
                    </p>

                    {/* Decorative Line */}
                    <div className='mt-6 h-1 w-24 bg-gradient-to-r from-yellow-300 to-transparent' />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
