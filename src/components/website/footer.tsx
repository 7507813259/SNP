'use client';

// components/Footer.tsx
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageSquare, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <footer className='relative mt-10 rounded-t-[40px] bg-[#f7f7f7] pt-10'>
      {/* TOP SECTION */}
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-4'>
        {/* LOGO + BADGES */}
        <div>
          <div className='mb-4 flex items-center gap-3'>
            <Image src='/logo.png' alt='SGN' width={60} height={60} />
            <h3 className='text-lg font-bold text-[#7a1e4f]'>
              शेगाव नगर परिषद
            </h3>
          </div>

          <div className='mb-4 flex flex-wrap gap-2'>
            <Image src='/assets/mhgov.webp' alt='' width={40} height={40} />
            <Image src='/assets/mhgov.webp' alt='' width={40} height={40} />
            <Image src='/assets/mhgov.webp' alt='' width={40} height={40} />
            <Image src='/assets/mhgov.webp' alt='' width={40} height={40} />
            <Image src='/assets/mhgov.webp' alt='' width={40} height={40} />
          </div>

          {/* <div className='w-fit rounded-xl bg-white px-4 py-3 text-sm text-gray-700 shadow'>
            भेट संख्या (मागील ३० दिवसांत):{' '}
            <span className='font-bold text-[#b01d4f]'>6,49,912</span>
          </div> */}
        </div>

        {/* सेवा */}
        <div>
          <h4 className='mb-3 font-semibold text-[#7a1e4f]'>सेवा</h4>
          <ul className='space-y-2 text-sm text-gray-700'>
            <li className='cursor-pointer transition-colors hover:text-[#b01d4f]'>
              ऑनलाईन सेवा
            </li>
            <li className='cursor-pointer text-[#b01d4f] transition-colors hover:text-[#7a1e4f]'>
              शेगाव नगर परिषद केअर
            </li>
            <li className='cursor-pointer transition-colors hover:text-[#b01d4f]'>
              शेगाव नगर परिषद अ‍ॅप
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
      <div className='mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 px-6 text-sm md:grid-cols-4'>
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
              शेगाव नगर परिषद, मुख्य रस्ता, शेगाव, जिल्हा बुलढाणा, महाराष्ट्र -
              ४४३२०१.
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <MessageSquare size={16} className='text-[#b01d4f]' /> तुमचा
            अभिप्राय नोंदवा
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className='mx-auto my-8 max-w-7xl border-t' />

      {/* BOTTOM BAR */}
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 pb-6 text-xs text-gray-700 md:flex-row'>
        <div>कॉपीराइट © २०२५ शेगाव नगर परिषद. सर्व हक्क राखीव.</div>

        <div className='flex flex-col items-center gap-2'>
          <div className='flex gap-3'>
            <Image src='/assets/mhgov.webp' alt='' width={32} height={32} />
            <Image src='/assets/mhgov.webp' alt='' width={32} height={32} />
            <Image src='/assets/mhgov.webp' alt='' width={32} height={32} />
            <Image src='/assets/mhgov.webp' alt='' width={32} height={32} />
            <Image src='/assets/mhgov.webp' alt='' width={32} height={32} />
          </div>
          <div>२९/०३/२०२५ रोजी अद्ययावत केले</div>
        </div>

        {/* <div>
          डिझाईन व विकसित – स्टॅक डिजिटल मीडिया सोल्युशन्स प्रा. लि. द्वारे
        </div> */}
      </div>

      {/* CITY ILLUSTRATION STRIP */}
      <div className="h-24 bg-[url('/footer-city.png')] bg-bottom bg-repeat-x opacity-30" />

      {/* SCROLL TO TOP */}
      <button
        onClick={scrollToTop}
        className='fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#b01d4f] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#7a1e4f]'
        aria-label='Scroll to top'
      >
        <ArrowUp size={20} />
      </button>

      {/* FLOATING LOGO */}
      <button className='fixed right-20 bottom-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow'>
        <Image src='/assets/mhgov.webp' alt='SGN' width={30} height={30} />
      </button>
    </footer>
  );
}
