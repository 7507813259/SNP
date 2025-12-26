'use client';

import { useState } from 'react';
import {
  FileText,
  Calendar,
  Download,
  ArrowRight,
  Info,
  Globe,
  Phone,
  Clock,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

const tabs = [
  { id: 'online-services', label: 'ऑनलाईन सेवा', icon: Globe },
  { id: 'press-note', label: 'प्रेस नोट', icon: FileText },
  { id: 'general-info', label: 'सर्वसाधारण माहिती', icon: Info },
  { id: 'emergency-contact', label: 'आपत्कालीन संपर्क', icon: Phone }
];

const pressNotes = [
  {
    id: 1,
    date: '२४ डिसेंबर २०२५',
    title:
      'शेगाव नगर परिषद निवडणूक २०२५-२६ : प्रभाग क्र. २०, २१ व २६ येथे झोनल अधिकाऱ्यांसाठी मार्गदर्शन बैठक',
    fileSize: '268.35 KB',
    fileType: 'PDF',
    href: '/documents/press-note-1.pdf'
  },
  {
    id: 2,
    date: '२३ डिसेंबर २०२५',
    title: 'पुरवणी मतदार यादीबाबत आदेश',
    fileSize: '547.21 KB',
    fileType: 'PDF',
    href: '/documents/press-note-2.pdf'
  },
  {
    id: 3,
    date: '२३ डिसेंबर २०२५',
    title:
      'आचारसंहिता कालावधीत उमेदवार/राजकीय पक्ष यांना मान्य दराने रस्ता/चौक, मनपा ताब्यातील अमेनिटी स्पेस, मोकळी जागा, इ. मैदाने येथे सभांना परवानगी देणेबाबत',
    fileSize: '13.8 MB',
    fileType: 'PDF',
    href: '/documents/press-note-3.pdf'
  },
  {
    id: 4,
    date: '२४ डिसेंबर २०२५',
    title:
      'शेगाव नगर परिषद सार्वत्रिक निवडणूक २०२५-२६ दि. २४ डिसेंबर २०२५ रोजी नामनिर्देशन फॉर्म विक्रीचा आढावा व आचारसंहिता अंमलबजावणी',
    fileSize: '891.52 KB',
    fileType: 'PDF',
    href: '/documents/press-note-4.pdf'
  },
  {
    id: 5,
    date: '२२ डिसेंबर २०२५',
    title: 'मुख्य रस्त्याच्या दुरुस्तीसाठी एक लेन बंद करणेबाबत',
    fileSize: '60.24 KB',
    fileType: 'PDF',
    href: '/documents/press-note-5.pdf'
  }
];

const electionTimeline = [
  {
    id: 1,
    date: '१५ जानेवारी २०२६',
    event: 'मतदान दिनांक',
    status: 'upcoming'
  },
  {
    id: 2,
    date: '१६ जानेवारी २०२६',
    event: 'मतमोजणी व निकाल जाहीर',
    status: 'upcoming'
  },
  {
    id: 3,
    date: '२० डिसेंबर २०२५',
    event: 'मतदान केंद्र यादी',
    status: 'completed'
  },
  {
    id: 4,
    date: '१९ डिसेंबर २०२५',
    event: 'निवडणूक निर्णय अधिकारी',
    status: 'completed'
  },
  {
    id: 5,
    date: '१८ डिसेंबर २०२५',
    event: 'सार्वत्रिक निवडणूक २०२५ - निवडणूक कार्यक्रम',
    status: 'completed'
  },
  {
    id: 6,
    date: '२३ ते ३० डिसेंबर २०२५',
    event: 'नामनिर्देशन अर्ज सादर करण्याची मुदत',
    status: 'active'
  },
  {
    id: 7,
    date: '३१ डिसेंबर २०२५',
    event: 'निवडणूक चिन्ह वाटप',
    status: 'upcoming'
  }
];

const generalInfo = [
  {
    id: 1,
    title: 'नगर परिषद बद्दल',
    description:
      'शेगाव नगर परिषद ही महाराष्ट्र राज्यातील बुलढाणा जिल्ह्यातील एक महत्त्वाची स्थानिक स्वराज्य संस्था आहे.',
    href: '/about'
  },
  {
    id: 2,
    title: 'अधिकारी व कर्मचारी',
    description:
      'नगर परिषदेच्या विविध विभागांमध्ये कार्यरत असलेल्या अधिकाऱ्यांची संपूर्ण माहिती.',
    href: '/staff'
  },
  {
    id: 3,
    title: 'नगर परिषद क्षेत्र',
    description:
      'शेगाव नगर परिषदेच्या अधिकारक्षेत्रातील सर्व वॉर्ड आणि क्षेत्रांची माहिती.',
    href: '/wards'
  }
];
const onlineServices = [
  {
    id: 1,
    title: 'मालमत्ता कर भरणे',
    href: '/property-tax',
    icon: '₹'
  },
  {
    id: 2,
    title: 'जन्म प्रमाणपत्र',
    href: '/birth-certificate',
    icon: '👶'
  },
  {
    id: 3,
    title: 'मृत्यु प्रमाणपत्र',
    href: '/death-certificate',
    icon: '✝️'
  },
  {
    id: 4,
    title: 'पाणी कर भरणे',
    href: '/water-tax',
    icon: '💧'
  },
  {
    id: 5,
    title: 'घरपट्टी थकबाकी तपासणी',
    href: '/property-tax-check',
    icon: '🏠'
  },
  {
    id: 6,
    title: 'निवासी दाखला',
    href: '/residence-certificate',
    icon: '📄'
  },
  {
    id: 7,
    title: 'विवाह नोंदणी',
    href: '/marriage-registration',
    icon: '💍'
  },
  {
    id: 8,
    title: 'तक्रार नोंदणी',
    href: '/grievance',
    icon: '📝'
  },
  {
    id: 9,
    title: 'नवीन नळ कनेक्शन',
    href: '/new-water-connection',
    icon: '🚰'
  },

  {
    id: 10,
    title: 'जाहिरात परवाना',
    href: '/advertisement-license',
    icon: '📢'
  },
  {
    id: 11,
    title: 'अधिक पहा',
    href: '#',
    icon: '🖥️'
  }
];

const emergencyContacts = [
  { id: 1, name: 'अग्निशमन', number: '१०१', type: 'fire' },
  { id: 2, name: 'रुग्णवाहिका', number: '१०८', type: 'ambulance' },
  { id: 3, name: 'पोलीस', number: '१००', type: 'police' },
  { id: 4, name: 'हेल्पलाइन', number: '१८००३०२३२३', type: 'helpline' }
];

export default function InfoTabs() {
  const [activeTab, setActiveTab] = useState('press-note');

  const renderContent = () => {
    switch (activeTab) {
      case 'press-note':
        return (
          <div className='space-y-4'>
            <h3 className='mb-6 text-2xl font-bold text-gray-900'>प्रेस नोट</h3>
            <div className='max-h-[600px] space-y-3 overflow-y-auto pr-2'>
              {pressNotes.map((note) => (
                <div
                  key={note.id}
                  // href={note.href}
                  className='group block rounded-xl border-2 border-gray-200 bg-white p-5 transition-all duration-300 hover:border-[#b01d4f] hover:shadow-lg'
                >
                  <div className='mb-2 flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-sm text-gray-500'>
                      <Calendar className='h-4 w-4' />
                      <span>{note.date}</span>
                    </div>
                    <ArrowRight className='h-5 w-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#b01d4f]' />
                  </div>
                  <h4 className='mb-3 leading-tight font-semibold text-gray-900 group-hover:text-[#b01d4f]'>
                    {note.title}
                  </h4>
                  <div className='flex items-center gap-4 text-xs text-gray-600'>
                    <span>फाईल आकार: {note.fileSize}</span>
                    <span>फाइलचे स्वरूप: {note.fileType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'general-info':
        return (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {generalInfo.map((info) => (
              <div
                key={info.id}
                // href={info.href}
                className='group rounded-xl border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:border-[#b01d4f] hover:shadow-lg'
              >
                <h4 className='mb-3 text-xl font-semibold text-gray-900 group-hover:text-[#b01d4f]'>
                  {info.title}
                </h4>
                <p className='text-gray-600'>{info.description}</p>
                <div className='mt-4 flex items-center gap-2 text-sm font-medium text-[#b01d4f]'>
                  <span>अधिक जाणून घ्या</span>
                  <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                </div>
              </div>
            ))}
          </div>
        );

      case 'online-services':
        return (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {onlineServices.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className='group rounded-xl border-2 border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:border-[#b01d4f] hover:shadow-lg'
              >
                <div className='mb-4 text-4xl'>{service.icon}</div>
                <h4 className='font-semibold text-gray-900 group-hover:text-[#b01d4f]'>
                  {service.title}
                </h4>
              </Link>
            ))}
          </div>
        );

      case 'emergency-contact':
        return (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className='rounded-xl border-2 border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:border-[#b01d4f] hover:shadow-lg'
              >
                <div className='mb-4 flex justify-center'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-[#b01d4f]/10'>
                    <Phone className='h-8 w-8 text-[#b01d4f]' />
                  </div>
                </div>
                <h4 className='mb-2 font-semibold text-gray-900'>
                  {contact.name}
                </h4>
                <a
                  href={`tel:${contact.number}`}
                  className='text-2xl font-bold text-[#b01d4f] hover:underline'
                >
                  {contact.number}
                </a>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className='bg-white py-8'>
      <div className='mx-auto max-w-7xl px-6'>
        {/* Tabs */}
        <div className='mb-8 border-b border-gray-200'>
          <div className='flex flex-wrap gap-2'>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center gap-2 border-b-2 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'border-[#b01d4f] text-[#b01d4f]'
                      : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors duration-300 ${
                      isActive ? 'text-[#b01d4f]' : 'text-gray-500'
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Flex Layout: Tabs Content (Left) + Marquee (Right) */}
        <div className='flex flex-col gap-8 lg:flex-row'>
          {/* Left: Tabs Content */}
          <div className='min-h-[400px] flex-1'>{renderContent()}</div>

          {/* Right: Vertical Scrolling Marquee - Always Visible */}
          <div className='w-full lg:w-96'>
            <h3 className='mb-6 text-2xl font-bold text-gray-900'>
              सार्वत्रिक निवडणूक २०२५-२६
            </h3>
            <div className='relative h-[600px] overflow-hidden rounded-xl border-2 border-gray-200 bg-white'>
              {/* Scrolling Container */}
              <div className='animate-scroll-up space-y-4 p-4'>
                {/* Duplicate content for seamless loop */}
                {[...electionTimeline, ...electionTimeline].map(
                  (item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className='relative flex items-start gap-4 rounded-xl border-2 border-gray-200 bg-gray-50 p-4'
                    >
                      {/* Status Dot */}
                      <div
                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                          item.status === 'completed'
                            ? 'bg-green-100'
                            : item.status === 'active'
                              ? 'bg-[#b01d4f]'
                              : 'bg-gray-100'
                        }`}
                      >
                        {item.status === 'completed' ? (
                          <CheckCircle className='h-6 w-6 text-green-600' />
                        ) : (
                          <Clock
                            className={`h-6 w-6 ${
                              item.status === 'active'
                                ? 'text-white'
                                : 'text-gray-400'
                            }`}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className='flex-1'>
                        <div className='mb-1 text-sm font-medium text-gray-500'>
                          दि. {item.date}
                        </div>
                        <div
                          className={`font-semibold ${
                            item.status === 'active'
                              ? 'text-[#b01d4f]'
                              : 'text-gray-900'
                          }`}
                        >
                          {item.event}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
