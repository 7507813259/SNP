'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Megaphone, Sparkles } from 'lucide-react';

const items = [
  { text: 'मतदान केंद्रांची यादी', href: '#', isNew: true },
  {
    text: 'सार्वजनिक निवडणूक नाटक प्रमाणपत्रासाठी अर्ज करा',
    href: '#'
  },
  { text: 'निवडणूक कार्यक्रम', href: '#' },
  { text: 'मतदार यादीत नाव शोधण्यासाठी क्लिक करा', href: '#' },
  { text: 'उमेदवारांसाठी नामनिर्देशन सूचना', href: '#', isNew: true }
];

export default function AnnouncementMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const position = useRef(0);
  const speed = useRef(0.6);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;

    const animate = () => {
      position.current -= speed.current;

      if (Math.abs(position.current) >= track.scrollWidth / 2) {
        position.current = 0;
      }

      track.style.transform = `translateX(${position.current}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className='relative w-full flex overflow-hidden border-b-2 border-[#b01d4f]/20 bg-gradient-to-r from-white to-gray-50'>
      {/* Static Left Label */}
      <div className='relative z-10 flex items-center gap-2 bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] px-6 py-3.5 text-white font-semibold whitespace-nowrap border-r-2 border-[#b01d4f]/30 shadow-md'>
        <Megaphone className='h-4 w-4' />
        <span>महत्वाची घोषणा</span>
      </div>

      {/* Moving Marquee */}
      <div
        className='flex-1 bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] overflow-hidden'
        onMouseEnter={() => (speed.current = 0)}
        onMouseLeave={() => (speed.current = 0.6)}
      >
        <div ref={trackRef} className='flex whitespace-nowrap py-3.5'>
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className='flex items-center text-white text-sm font-medium px-6'
            >
              <Link
                href={item.href}
                className='group flex items-center gap-2 transition-all duration-300 hover:text-yellow-200'
              >
                {item.isNew && (
                  <Sparkles className='h-3 w-3 text-yellow-300 animate-pulse' />
                )}
                <span className='group-hover:underline'>{item.text}</span>

                {item.isNew && (
                  <span className='bg-yellow-300 text-[#b01d4f] text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm animate-pulse'>
                    NEW
                  </span>
                )}
              </Link>

              <span className='mx-4 text-white/40'>|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
