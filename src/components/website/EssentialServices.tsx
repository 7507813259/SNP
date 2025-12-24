'use client';

import Link from 'next/link';
import {
  Flame,
  Ambulance,
  Phone,
  Shield,
  Hospital,
  Droplet,
  ArrowRight,
  AlertTriangle,
  Clock,
  Users
} from 'lucide-react';

const essentialServices = [
  {
    id: 1,
    title: 'अग्निशमन दल',
    subtitle: 'Fire Brigade',
    number: '१०१',
    icon: Flame,
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    hoverBg: 'hover:bg-red-100',
    href: '/services/fire-brigade'
  },
  {
    id: 2,
    title: 'रुग्णवाहिका',
    subtitle: 'Ambulance',
    number: '१०८',
    icon: Ambulance,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    hoverBg: 'hover:bg-green-100',
    href: '/services/ambulance'
  },
  {
    id: 3,
    title: 'आपत्कालीन क्रमांक',
    subtitle: 'Emergency',
    number: '११२',
    icon: Phone,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-100',
    href: '/services/emergency'
  },
  {
    id: 4,
    title: 'पोलीस',
    subtitle: 'Police',
    number: '१००',
    icon: Shield,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    hoverBg: 'hover:bg-indigo-100',
    href: '/services/police'
  },
  {
    id: 5,
    title: 'रुग्णालये',
    subtitle: 'Hospitals',
    number: '२४x७',
    icon: Hospital,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
    hoverBg: 'hover:bg-pink-100',
    href: '/services/hospitals'
  },
  {
    id: 6,
    title: 'रक्तपेढी',
    subtitle: 'Blood Bank',
    number: '२४x७',
    icon: Droplet,
    color: 'from-rose-500 to-red-500',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
    hoverBg: 'hover:bg-rose-100',
    href: '/services/blood-bank'
  }
];

const emergencyContacts = [
  {
    id: 1,
    name: 'नगरपालिका नियंत्रण कक्ष',
    number: '०७२६३-२४३३३३',
    type: 'मुख्य'
  },
  {
    id: 2,
    name: 'महिला हेल्पलाइन',
    number: '१०९१',
    type: 'विशेष'
  },
  {
    id: 3,
    name: 'बाल हेल्पलाइन',
    number: '१०९८',
    type: 'विशेष'
  },
  {
    id: 4,
    name: 'मानसिक आरोग्य हेल्पलाइन',
    number: '१४४१६',
    type: 'विशेष'
  }
];

export default function EssentialServices() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16'>
      {/* Decorative Elements */}
      <div className='absolute top-0 left-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/20 blur-3xl' />
      <div className='absolute top-0 right-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/20 blur-3xl' />

      <div className='relative mx-auto max-w-7xl px-6'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#b01d4f]/10 px-4 py-2'>
            <AlertTriangle className='h-4 w-4 text-[#b01d4f]' />
            <span className='text-sm font-medium text-[#b01d4f]'>
              आपत्कालीन सेवा
            </span>
          </div>
          <h2 className='mb-4 text-4xl font-bold text-gray-900'>
            आवश्यक सेवा आणि संपर्क
          </h2>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            आपत्कालीन परिस्थितीत त्वरित मदत मिळवण्यासाठी खालील सेवा वापरा
          </p>
        </div>

        {/* Services Grid */}
        <div className='mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {essentialServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={service.href}
                className={`group relative overflow-hidden rounded-2xl ${service.bgColor} p-6 transition-all duration-300 ${service.hoverBg} hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* Hover Effect Border */}
                <div className='absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-[#b01d4f]/20' />

                {/* Content */}
                <div className='relative'>
                  {/* Icon and Number */}
                  <div className='mb-4 flex items-start justify-between'>
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                    >
                      <Icon className={`h-7 w-7 ${service.iconColor}`} />
                    </div>
                    <div className='text-right'>
                      <div
                        className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br ${service.color} px-4 py-2 text-base font-bold text-white shadow-md`}
                      >
                        {service.number}
                      </div>
                      <div className='mt-1 flex items-center justify-end gap-1 text-xs text-gray-500'>
                        <Clock className='h-3 w-3' />
                        <span>२४x७</span>
                      </div>
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <div className='mb-6'>
                    <h3 className='mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#b01d4f]'>
                      {service.title}
                    </h3>
                    <p className='text-sm text-gray-600'>{service.subtitle}</p>
                  </div>

                  {/* Read More Button */}
                  <div className='flex items-center gap-2 text-sm font-medium text-[#b01d4f] transition-all duration-300 group-hover:gap-3'>
                    <span>अधिक माहिती</span>
                    <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Emergency Contacts */}
          <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
            <div className='mb-4 flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#b01d4f]/10'>
                <Users className='h-5 w-5 text-[#b01d4f]' />
              </div>
              <div>
                <h4 className='text-lg font-semibold text-gray-900'>
                  अतिरिक्त संपर्क क्रमांक
                </h4>
                <p className='text-sm text-gray-600'>
                  विशेष सेवांसाठी संपर्क क्रमांक
                </p>
              </div>
            </div>

            <div className='space-y-3'>
              {emergencyContacts.map((contact) => (
                <div
                  key={contact.id}
                  className='flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 p-3'
                >
                  <div>
                    <div className='text-sm font-medium text-gray-900'>
                      {contact.name}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {contact.type} सेवा
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='font-mono text-lg font-bold text-[#b01d4f]'>
                      {contact.number}
                    </div>
                    <button className='text-xs font-medium text-gray-600 hover:text-[#b01d4f]'>
                      कॉल करा
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Help Info */}
          <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
            <div className='mb-4 flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#b01d4f]/10'>
                <AlertTriangle className='h-5 w-5 text-[#b01d4f]' />
              </div>
              <div>
                <h4 className='text-lg font-semibold text-gray-900'>
                  त्वरित मदत माहिती
                </h4>
                <p className='text-sm text-gray-600'>
                  आपत्कालीन वेळी काय करावे
                </p>
              </div>
            </div>

            <ul className='space-y-3'>
              <li className='flex items-start gap-2'>
                <div className='mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-700'>
                  १
                </div>
                <div className='text-sm text-gray-600'>
                  शांत राहा आणि आपत्कालीन सेवा क्रमांकावर संपर्क साधा
                </div>
              </li>
              <li className='flex items-start gap-2'>
                <div className='mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700'>
                  २
                </div>
                <div className='text-sm text-gray-600'>
                  आपले स्थान व समस्येची माहिती स्पष्टपणे सांगा
                </div>
              </li>
              <li className='flex items-start gap-2'>
                <div className='mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-xs font-medium text-amber-700'>
                  ३
                </div>
                <div className='text-sm text-gray-600'>
                  सहाय्यक कर्मचाऱ्यांच्या सूचनांनुसार वागा
                </div>
              </li>
            </ul>

            {/* Main Helpline */}
            <div className='mt-6 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#b01d4f]/10 to-[#7a1e4f]/10 p-4'>
              <Phone className='h-6 w-6 text-[#b01d4f]' />
              <div>
                <div className='text-sm font-medium text-gray-600'>
                  मुख्य हेल्पलाइन
                </div>
                <div className='text-2xl font-bold text-[#b01d4f]'>
                  १८००३०२३२३
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Link */}
        <div className='mt-12 text-center'>
          <Link
            href='/all-services'
            className='group inline-flex items-center gap-2 rounded-full bg-[#b01d4f] px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#7a1e4f] hover:shadow-lg'
          >
            <Phone className='h-5 w-5' />
            <span>सर्व सेवा पहा</span>
            <ArrowRight className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
          </Link>
        </div>
      </div>
    </section>
  );
}
