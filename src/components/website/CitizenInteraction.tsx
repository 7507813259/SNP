'use client';

import Link from 'next/link';
import {
  AlertCircle,
  MessageSquare,
  Lightbulb,
  ArrowRight,
  FileText,
  ThumbsUp,
  Sparkles
} from 'lucide-react';

const interactionCards = [
  {
    id: 1,
    title: 'समस्या नोंदवा',
    description: 'तुमच्या समस्येची तक्रार नोंदवा',
    icon: AlertCircle,
    gradient: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    hoverBg: 'hover:bg-red-100'
  },
  {
    id: 2,
    title: 'सूचना व प्रश्न शेअर करा',
    description: 'तुमच्या सूचना किंवा प्रश्न आमच्याशी शेअर करा',
    icon: MessageSquare,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-100'
  },
  {
    id: 3,
    title: 'तुमचा अभिप्राय द्या',
    description: 'तुमचा मौल्यवान अभिप्राय आमच्यासाठी महत्त्वाचा आहे',
    icon: Lightbulb,
    gradient: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    hoverBg: 'hover:bg-amber-100'
  }
];

export default function CitizenInteraction() {
  return (
    <section className='bg-gradient-to-b from-gray-50 to-white py-16'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
          {/* Left Title Section */}
          <div className='flex-1 lg:max-w-md'>
            <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#b01d4f]/10 px-4 py-2'>
              <Sparkles className='h-4 w-4 text-[#b01d4f]' />
              <span className='text-sm font-medium text-[#b01d4f]'>
                नागरिक सहभाग
              </span>
            </div>
            <h2 className='mb-4 text-4xl font-bold text-gray-900'>
              <span className='block'>नागरिक</span>
              <span className='block text-[#b01d4f]'>संवाद</span>
            </h2>
            <p className='text-lg text-gray-600'>
              तुमच्या आवाजाला महत्त्व देत, आम्ही तुमच्यासोबत एकत्र काम करतो.
              तुमच्या समस्या, सूचना आणि अभिप्राय आमच्यासाठी महत्त्वाचे आहेत.
            </p>
          </div>

          {/* Right Cards Section */}
          <div className='flex-1 lg:max-w-2xl'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {interactionCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    className={`group relative overflow-hidden rounded-2xl ${card.bgColor} p-6 transition-all duration-300 ${card.hoverBg} hover:-translate-y-1 hover:shadow-xl`}
                  >
                    {/* Gradient Background on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                    />

                    {/* Icon */}
                    <div className='relative mb-4'>
                      <div
                        className={`inline-flex items-center justify-center rounded-xl bg-white p-3 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                      >
                        <Icon
                          className={`h-6 w-6 ${card.iconColor} transition-colors duration-300`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className='relative'>
                      <h3 className='mb-2 text-lg font-semibold text-gray-900'>
                        {card.title}
                      </h3>
                      <p className='mb-4 text-sm text-gray-600'>
                        {card.description}
                      </p>
                    </div>

                    {/* Decorative Element */}
                    <div
                      className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-5 transition-opacity duration-300 group-hover:opacity-10`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className='mt-12 rounded-2xl bg-white p-6 shadow-sm'>
          <div className='flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left'>
            <div className='flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#b01d4f]/10'>
                <ThumbsUp className='h-6 w-6 text-[#b01d4f]' />
              </div>
              <div>
                <h4 className='font-semibold text-gray-900'>त्वरित प्रतिसाद</h4>
                <p className='text-sm text-gray-600'>
                  आम्ही २४ तासांत तुमच्याशी संपर्क साधतो
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
                <FileText className='h-6 w-6 text-blue-600' />
              </div>
              <div>
                <h4 className='font-semibold text-gray-900'>
                  पारदर्शक प्रक्रिया
                </h4>
                <p className='text-sm text-gray-600'>
                  सर्व तक्रारींचा मागोवा ऑनलाईन घ्या
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
