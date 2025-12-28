'use client';

import Image from 'next/image';

const leaders = [
  {
    name: 'श्री. देवेंद्र फडणवीस',
    designation: 'माननीय मुख्यमंत्री',
    image: '/assets/CM.jpg' // replace with real path
  },
  {
    name: 'श्री. एकनाथ शिंदे',
    designation: 'माननीय उपमुख्यमंत्री',
    image: '/assets/DCM.jpg'
  },
  {
    name: 'श्री. अजित पवार',
    designation: 'माननीय उपमुख्यमंत्री',
    image: '/assets/ajitpawar.png'
  }
];

export default function LeadersStrip() {
  return (
    <div className="w-full bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-[#b01d4f] rounded-xl px-6 py-4"
          >
            {/* Image */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white shrink-0">
              <Image
                src={leader.image}
                alt={leader.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="text-white">
              <p className="font-semibold text-base leading-tight">
                {leader.name}
              </p>
              <p className="text-sm text-purple-200">
                {leader.designation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
