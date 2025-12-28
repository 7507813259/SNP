'use client';

import Image from 'next/image';
import { User, Award, Briefcase } from 'lucide-react';

const officials = [
  {
    id: 1,
    name: 'सौ. जयश्री काटकर / बोराडे',
    designation: 'मुख्याधिकारी',
    subtitle: 'शेगांव नगर परिषद',
    image: '',
    icon: Award
  },
  {
    id: 2,
    name: 'श्री. राजवर्धन पाटील',
    designation: 'उपमुख्याधिकारी',
    subtitle: 'शेगांव नगर परिषद',
    image: '',
    icon: Briefcase
  },
  {
    id: 3,
    name: 'श्री. प्रकाश एकनाथ शेगोकार',
    designation: 'नगराध्यक्ष',
    subtitle: 'शेगांव नगर परिषद',
    image: '',
    icon: User
  }
  // {
  //   id: 4,
  //   name: 'श्री. प्रवीण गायकवाड',
  //   designation: 'अतिरिक्त कार्यकारी अधिकारी',
  //   subtitle: '(विशेष)',
  //   image: '/assets/mhgov.webp',
  //   icon: User
  // }
];

export default function OfficialsBanner() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-12'>
      {/* Decorative Background Elements */}
      <div className='absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-pink-100/20 to-transparent blur-2xl' />
      <div className='absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-purple-100/20 to-transparent blur-2xl' />

      {/* Bottom Decorative Pattern */}
      <div className='absolute right-0 bottom-0 left-0 h-24 overflow-hidden opacity-30'>
        <div
          className='h-full w-full bg-repeat'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className='relative mx-auto max-w-7xl px-6'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h2 className='mb-2 text-3xl font-bold text-gray-900'>
            अधिकारी वर्ग
          </h2>
          <p className='text-gray-600'>
            शेगांव नगर परिषदेच्या वरिष्ठ अधिकाऱ्यांची माहिती
          </p>
        </div>

        {/* Officials Grid */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {officials.map((official) => {
            const Icon = official.icon;
            return (
              <div
                key={official.id}
                className='group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-[#b01d4f] hover:shadow-xl'
              >
                {/* Decorative Corner */}
                <div className='absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gradient-to-br from-[#b01d4f]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

                {/* Profile Image */}
                <div className='relative mb-4 flex justify-center'>
                  <div className='relative'>
                    <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#b01d4f] to-[#7a1e4f] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-20' />
                    <div className='relative h-32 w-32 overflow-hidden rounded-full border-4 border-gray-200 bg-gray-100 transition-all duration-300 group-hover:scale-105 group-hover:border-[#b01d4f]'>
                      <Image
                        src={official.image}
                        alt={official.name}
                        fill
                        className='object-cover'
                        onError={(e) => {
                          // Fallback to placeholder
                          e.currentTarget.src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23e5e7eb" width="200" height="200"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="60" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                    {/* Icon Badge */}
                    <div className='absolute right-0 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg'>
                      <Icon className='h-5 w-5 text-[#b01d4f]' />
                    </div>
                  </div>
                </div>

                {/* Name */}
                <h3 className='mb-1 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#b01d4f]'>
                  {official.name}
                </h3>

                {/* Designation */}
                <div className='mb-1'>
                  <p className='text-sm font-semibold text-[#b01d4f]'>
                    {official.designation}
                  </p>
                  {official.subtitle && (
                    <p className='text-xs text-gray-600 mt-1'>{official.subtitle}</p>
                  )}
                </div>

                {/* Decorative Line */}
                <div className='mx-auto mt-4 h-0.5 w-16 bg-gradient-to-r from-transparent via-[#b01d4f] to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100' />
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className='mt-8 text-center'>
          <div className='text-sm text-gray-600'>
            सर्व अधिकाऱ्यांशी संपर्क साधण्यासाठी{' '}
            <div
              // href='/contact'
              className='font-semibold text-[#b01d4f] hover:underline'
            >
              संपर्क पृष्ठ
            </div>{' '}
          </div>
        </div>
      </div>
    </section>
  );
}
