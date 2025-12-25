'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Eye } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title:
      'उमेदवार थकबाकी ना-हरकत प्रमाणपत्र कक्ष येथे निवडणूक अधिकारी तथा अतिरिक्त आयुक्त मा. श्री. ओमप्रकाश दिवटे यांची भेट',
    image: '/assets/mhgov.webp',
    date: '१५ जानेवारी २०२५',
    category: 'निवडणूक',
    views: '१,२३४',
    href: '/news/1'
  },
  {
    id: 2,
    title:
      'बिबवेवाडी क्षेत्रीय कार्यालयात निवडणूक सुरक्षा व कायदा-सुव्यवस्थेबाबत समन्वय बैठक',
    image: '/assets/mhgov.webp',
    date: '१४ जानेवारी २०२५',
    category: 'बैठक',
    views: '९८७',
    href: '/news/2'
  },
  {
    id: 3,
    title: 'शेगाव नगर परिषद सार्वत्रिक निवडणूक २०२५-२६ अनुषंगाने बैठक संपन्न',
    image: '/assets/mhgov.webp',
    date: '१३ जानेवारी २०२५',
    category: 'निवडणूक',
    views: '२,१५६',
    href: '/news/3'
  }
];

export default function NewsUpdates() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16'>
      {/* Decorative Elements */}
      <div className='absolute top-0 left-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/20 blur-3xl' />
      <div className='absolute top-0 right-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/20 blur-3xl' />

      <div className='relative mx-auto max-w-7xl px-6'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#b01d4f]/10 px-4 py-2'>
            <Calendar className='h-4 w-4 text-[#b01d4f]' />
            <span className='text-sm font-medium text-[#b01d4f]'>
              ताजी बातम्या
            </span>
          </div>
          <h2 className='mb-4 text-4xl font-bold text-gray-900'>
            बातम्या व अद्ययावत माहिती
          </h2>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            शेगाव नगर परिषदेच्या नवीनतम घडामोडी, बैठका आणि महत्त्वाच्या घटनांची
            माहिती
          </p>
        </div>

        {/* News Cards Grid */}
        <div className='mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {newsItems.map((news) => (
            <article
              key={news.id}
              className='group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
            >
              {/* Image Container */}
              <div className='relative h-56 w-full overflow-hidden bg-gray-200'>
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E';
                  }}
                />
                {/* Category Badge */}
                <div className='absolute top-4 left-4'>
                  <span className='rounded-full bg-[#b01d4f] px-3 py-1 text-xs font-medium text-white shadow-lg'>
                    {news.category}
                  </span>
                </div>
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </div>

              {/* Content */}
              <div className='p-6'>
                {/* Date and Views */}
                <div className='mb-3 flex items-center gap-4 text-xs text-gray-500'>
                  <div className='flex items-center gap-1'>
                    <Clock className='h-3 w-3' />
                    <span>{news.date}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Eye className='h-3 w-3' />
                    <span>{news.views} पाहणे</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className='mb-4 line-clamp-3 text-lg leading-tight font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#b01d4f]'>
                  {news.title}
                </h3>

                {/* Read More Button */}
                <Link
                  href={news.href}
                  className='group/btn inline-flex items-center gap-2 rounded-full bg-[#b01d4f] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#7a1e4f] hover:shadow-lg'
                >
                  <span>अधिक वाचा</span>
                  <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1' />
                </Link>
              </div>

              {/* Hover Effect Border */}
              <div className='absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-[#b01d4f]/20' />
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className='text-center'>
          <Link
            href='/news'
            className='group inline-flex items-center gap-2 text-lg font-semibold text-[#b01d4f] transition-all duration-300 hover:gap-3 hover:text-[#7a1e4f]'
          >
            <span>अधिक पहा</span>
            <ArrowRight className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
          </Link>
        </div>
      </div>
    </section>
  );
}
