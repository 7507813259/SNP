'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import { ArrowRight, MapPin, Camera, Star, Heart } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const darshanPlaces = [
  {
    id: 1,
    name: 'आनंद सागर',
    description: 'कृत्रिम तलाव व उद्यान संकुल',
    image: '/assets/mhgov.webp',
    category: 'उद्यान',
    rating: '४.५',
    href: '/darshan/anand-sagar'
  },
  {
    id: 2,
    name: 'गजानन महाराज मंदिर',
    description: 'प्रसिद्ध आध्यात्मिक केंद्र',
    image: '/assets/mhgov.webp',
    category: 'मंदिर',
    rating: '४.८',
    href: '/darshan/gajanan-maharaj-temple'
  },
  {
    id: 3,
    name: 'शेगाव किल्ला',
    description: 'ऐतिहासिक वारसा',
    image: '/assets/mhgov.webp',
    category: 'ऐतिहासिक',
    rating: '४.३',
    href: '/darshan/fort'
  },
  {
    id: 4,
    name: 'नगर परिषद उद्यान',
    description: 'नागरिक विश्रांती केंद्र',
    image: '/assets/mhgov.webp',
    category: 'उद्यान',
    rating: '४.२',
    href: '/darshan/park'
  }
];

const infoCards = [
  {
    id: 1,
    icon: '🏛️',
    title: 'शहराविषयी',
    description: 'शेगावचा इतिहास व वैशिष्ट्ये',
    href: '/about-shegaon'
  },
  {
    id: 2,
    icon: '🎭',
    title: 'नाट्यगृह आणि कला दालन',
    description: 'सांस्कृतिक कार्यक्रम व प्रदर्शने',
    href: '/culture'
  },
  {
    id: 3,
    icon: '🌳',
    title: 'उद्याने',
    description: 'शहरातील हिरवीगार ठिकाणे',
    href: '/parks'
  },
  {
    id: 4,
    icon: '📍',
    title: 'प्रेक्षणीय ठिकाणे',
    description: 'सर्व लोकप्रिय पर्यटन स्थळे',
    href: '/attractions'
  }
];

export default function ShegaonDarshan() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16'>
      {/* Decorative Elements */}
      <div className='absolute top-0 left-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/20 blur-3xl' />
      <div className='absolute top-0 right-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/20 blur-3xl' />

      <div className='relative mx-auto max-w-7xl px-6'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#b01d4f]/10 px-4 py-2'>
            <MapPin className='h-4 w-4 text-[#b01d4f]' />
            <span className='text-sm font-medium text-[#b01d4f]'>
              पर्यटन व दर्शन
            </span>
          </div>
          <h2 className='mb-4 text-4xl font-bold text-gray-900'>शेगाव दर्शन</h2>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            शेगाव शहराची ऐतिहासिक, सांस्कृतिक आणि प्राकृतिक वैभवाची सफर
          </p>
        </div>

        {/* Main Container */}
        <div className='mb-10 overflow-hidden rounded-2xl bg-white shadow-lg'>
          <div className='flex flex-col lg:flex-row'>
            {/* LEFT: Slider */}
            <div className='relative h-[400px] w-full lg:h-[500px] lg:w-1/2'>
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false
                }}
                loop
                className='h-full w-full'
              >
                {darshanPlaces.map((place) => (
                  <SwiperSlide key={place.id}>
                    <div className='group relative h-full w-full'>
                      <Image
                        src={place.image}
                        alt={place.name}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-110'
                        onError={(e) => {
                          e.currentTarget.src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect fill="%23e5e7eb" width="800" height="500"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="24" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EShegaon%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />

                      {/* Content Overlay */}
                      <div className='absolute right-0 bottom-0 left-0 p-6'>
                        <div className='mb-2 flex items-center gap-2'>
                          <span className='rounded-full bg-[#b01d4f] px-3 py-1 text-xs font-medium text-white'>
                            {place.category}
                          </span>
                          <div className='flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm'>
                            <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                            <span>{place.rating}</span>
                          </div>
                        </div>
                        <h3 className='mb-2 text-2xl font-bold text-white'>
                          {place.name}
                        </h3>
                        <p className='mb-4 text-gray-200'>
                          {place.description}
                        </p>
                        <Link
                          href={place.href}
                          className='group/btn inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#b01d4f]'
                        >
                          <Camera className='h-4 w-4' />
                          <span>अधिक माहिती</span>
                          <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1' />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* RIGHT: Cards Grid */}
            <div className='grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:w-1/2'>
              {infoCards.map((card) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className='group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#b01d4f]/30 hover:shadow-lg'
                >
                  {/* Hover Effect Background */}
                  <div className='absolute inset-0 bg-gradient-to-br from-[#b01d4f]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

                  <div className='relative'>
                    <div className='mb-4 flex items-center justify-center'>
                      <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b01d4f]/10 text-3xl transition-colors duration-300 group-hover:bg-[#b01d4f]/20'>
                        {card.icon}
                      </div>
                    </div>
                    <h3 className='mb-2 text-center text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#b01d4f]'>
                      {card.title}
                    </h3>
                    <p className='text-center text-sm text-gray-600'>
                      {card.description}
                    </p>

                    {/* Hidden Arrow on Hover */}
                    <div className='mt-4 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                      <ArrowRight className='h-5 w-5 text-[#b01d4f]' />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* View All Link */}
        <div className='text-center'>
          <Link
            href='/darshan'
            className='group inline-flex items-center gap-2 text-lg font-semibold text-[#b01d4f] transition-all duration-300 hover:gap-3 hover:text-[#7a1e4f]'
          >
            <Heart className='h-5 w-5' />
            <span>शेगावची सर्व ठिकाणे पहा</span>
            <ArrowRight className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
          </Link>
        </div>
      </div>
    </section>
  );
}
